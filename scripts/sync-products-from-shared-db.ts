#!/usr/bin/env tsx
/**
 * Sync products from shared database to local JSON file
 * 
 * This script pulls products from @scootify/shared/db and writes them
 * to a local JSON file that can be imported by the site.
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Import from shared using node resolution
const { getScootersByDomain, toComponentProducts } = require('../../shared/src/db/index.ts');

console.log('🔄 Syncing products from shared database...\n');

// Get products for hysco.com.ua domain
const dbProducts = getScootersByDomain('hysco.com.ua');
const products = toComponentProducts(dbProducts);

console.log(`✓ Found ${products.length} products for hysco.com.ua`);

// Write to JSON file
const outputPath = join(__dirname, '../docs/hyper-products.json');
const output = {
  products,
  metadata: {
    syncedAt: new Date().toISOString(),
    source: '@scootify/shared/db',
    domain: 'hysco.com.ua',
  },
};

writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`✓ Wrote products to: ${outputPath}`);
console.log(`\n✅ Sync complete! Products are ready for build.`);
