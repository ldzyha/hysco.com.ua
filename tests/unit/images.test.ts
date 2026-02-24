/**
 * Image Integrity Tests — verifies all product image paths resolve to files on disk.
 * This test would have caught the broken image issue we fixed.
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getAllProducts } from '@/lib/products';

const PUBLIC_DIR = resolve(__dirname, '../../public');

describe('product images exist on disk', () => {
  const products = getAllProducts();

  it('has products to check', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  for (const product of getAllProducts()) {
    describe(product.slug, () => {
      for (const image of product.images) {
        it(`image ${image.url} exists`, () => {
          const filePath = resolve(PUBLIC_DIR, image.url.replace(/^\//, ''));
          expect(existsSync(filePath), `Missing image file: ${filePath}`).toBe(true);
        });
      }

      it('has at least one main image', () => {
        const mainImage = product.images.find((img) => img.isMain);
        expect(mainImage, `${product.slug} has no main image`).toBeDefined();
      });
    });
  }
});
