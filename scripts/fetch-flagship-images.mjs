#!/usr/bin/env node
/**
 * fetch-flagship-images.mjs
 *
 * Downloads flagship product images from source sites (hiley.eu, nami-electric.com),
 * converts them to WebP, and generates responsive sizes (1200, 800, 400 px).
 * Also re-processes any existing .webp files that lack -md / -sm variants.
 */

import sharp from 'sharp';
import { readdir, readFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import { existsSync } from 'node:fs';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const OUTPUT_DIR = new URL('../public/products/hyper/', import.meta.url).pathname;
const SIZES = { lg: 1200, md: 800, sm: 400 };
const WEBP_QUALITY = 85;

// Retry / timeout settings for downloads
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const FETCH_TIMEOUT_MS = 30000;

// ---------------------------------------------------------------------------
// Source definitions
// ---------------------------------------------------------------------------
const tigerProducts = [
  {
    slug: 'tiger-king-rs',
    sources: [
      { url: 'https://hiley.eu/wp-content/uploads/2025/03/TKRS_main.jpg', name: 'tiger-king-rs' },
      { url: 'https://hiley.eu/wp-content/uploads/2025/03/TKRS_front.jpg', name: 'tiger-king-rs-front' },
      { url: 'https://hiley.eu/wp-content/uploads/2025/03/TKRS_rear.jpg', name: 'tiger-king-rs-rear' },
    ],
  },
  {
    slug: 'tiger-supra-pro',
    sources: [
      { url: 'https://hiley.eu/wp-content/uploads/2025/03/T_SUPRA-1.png', name: 'tiger-supra-pro' },
      { url: 'https://hiley.eu/wp-content/uploads/2025/03/SUPRA_display.png', name: 'tiger-supra-pro-display' },
      { url: 'https://hiley.eu/wp-content/uploads/2025/03/T_SUPRA_front.png', name: 'tiger-supra-pro-front' },
    ],
  },
];

const namiProducts = [
  {
    slug: 'nami-burn-e-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-6.png', name: 'nami-burn-e-max' },
    ],
  },
];

const allNewProducts = [...tigerProducts, ...namiProducts];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Download a URL with retries, returning a Buffer */
async function downloadImage(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`  [download] attempt ${attempt}/${retries}: ${url}`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HyscoImageBot/1.0)',
          'Accept': 'image/*,*/*;q=0.8',
        },
        redirect: 'follow',
      });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const arrayBuf = await res.arrayBuffer();
      const buf = Buffer.from(arrayBuf);
      console.log(`  [download] OK  ${(buf.length / 1024).toFixed(1)} KB`);
      return buf;
    } catch (err) {
      console.warn(`  [download] FAIL attempt ${attempt}: ${err.message}`);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  return null; // all retries exhausted
}

/** Process a buffer into responsive WebP sizes */
async function processImage(buffer, outputDir, baseName) {
  const results = [];
  for (const [sizeName, maxWidth] of Object.entries(SIZES)) {
    const suffix = sizeName === 'lg' ? '' : `-${sizeName}`;
    const filename = `${baseName}${suffix}.webp`;
    const outputPath = join(outputDir, filename);

    let pipeline = sharp(buffer);
    const metadata = await sharp(buffer).metadata();
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true, fit: 'inside' });
    }
    const info = await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);
    results.push({ filename, width: info.width, height: info.height, size: info.size });
  }
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('=== Flagship Image Fetcher ===\n');
  const summary = [];

  // ---- A. Download & process new product images ----
  for (const product of allNewProducts) {
    console.log(`\n--- Product: ${product.slug} ---`);
    for (const src of product.sources) {
      // Check if the main (lg) file already exists
      const mainFile = join(OUTPUT_DIR, `${src.name}.webp`);
      const mdFile = join(OUTPUT_DIR, `${src.name}-md.webp`);
      const smFile = join(OUTPUT_DIR, `${src.name}-sm.webp`);

      if (existsSync(mainFile) && existsSync(mdFile) && existsSync(smFile)) {
        console.log(`  [skip] All 3 sizes already exist for ${src.name}`);
        continue;
      }

      const buffer = await downloadImage(src.url);
      if (!buffer) {
        console.error(`  [ERROR] Could not download ${src.url} after ${MAX_RETRIES} attempts`);
        summary.push({ name: src.name, status: 'FAILED', error: 'download failed' });
        continue;
      }

      try {
        const results = await processImage(buffer, OUTPUT_DIR, src.name);
        for (const r of results) {
          console.log(`  [saved] ${r.filename}  ${r.width}x${r.height}  ${(r.size / 1024).toFixed(1)} KB`);
          summary.push({ name: r.filename, width: r.width, height: r.height, sizeKB: +(r.size / 1024).toFixed(1), status: 'OK' });
        }
      } catch (err) {
        console.error(`  [ERROR] Processing ${src.name}: ${err.message}`);
        summary.push({ name: src.name, status: 'FAILED', error: err.message });
      }
    }
  }

  // ---- B. Re-process existing images that lack responsive variants ----
  console.log('\n--- Checking existing images for missing responsive variants ---');
  const existingFiles = await readdir(OUTPUT_DIR);
  // Get base names: files that are .webp and don't have -md or -sm suffix
  const baseFiles = existingFiles.filter((f) => {
    if (!f.endsWith('.webp')) return false;
    const name = f.replace('.webp', '');
    // Skip if it IS a responsive variant
    if (name.endsWith('-md') || name.endsWith('-sm')) return false;
    // Skip if it's a contextual sub-image (e.g. tiger-king-rs-front) that already belongs to a new product
    // We still want to process it if it lacks -md/-sm
    return true;
  });

  for (const file of baseFiles) {
    const baseName = file.replace('.webp', '');
    const mdFile = `${baseName}-md.webp`;
    const smFile = `${baseName}-sm.webp`;

    if (existingFiles.includes(mdFile) && existingFiles.includes(smFile)) {
      console.log(`  [skip] ${baseName} already has -md and -sm`);
      continue;
    }

    console.log(`  [reprocess] ${baseName} -> creating missing responsive variants`);
    try {
      const buffer = await readFile(join(OUTPUT_DIR, file));
      const results = await processImage(buffer, OUTPUT_DIR, baseName);
      for (const r of results) {
        console.log(`  [saved] ${r.filename}  ${r.width}x${r.height}  ${(r.size / 1024).toFixed(1)} KB`);
        summary.push({ name: r.filename, width: r.width, height: r.height, sizeKB: +(r.size / 1024).toFixed(1), status: 'OK (reprocess)' });
      }
    } catch (err) {
      console.error(`  [ERROR] Reprocessing ${baseName}: ${err.message}`);
      summary.push({ name: baseName, status: 'FAILED', error: err.message });
    }
  }

  // ---- Summary ----
  console.log('\n========== SUMMARY ==========');
  console.log(`Total operations: ${summary.length}`);
  const ok = summary.filter((s) => s.status.startsWith('OK'));
  const failed = summary.filter((s) => s.status === 'FAILED');
  console.log(`  Success: ${ok.length}`);
  console.log(`  Failed:  ${failed.length}`);
  console.log('');
  console.table(summary);

  if (failed.length > 0) {
    console.log('\nFailed items:');
    for (const f of failed) {
      console.log(`  - ${f.name}: ${f.error}`);
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
