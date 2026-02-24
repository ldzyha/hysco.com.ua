import { describe, it, expect } from 'vitest';
import {
  getAllProducts,
  getProductBySlug,
  getAllProductSlugs,
  getSimilarProducts,
  getSeriesInOrder,
  productToTileData,
  searchProducts,
} from './products';

describe('products data integrity', () => {
  const products = getAllProducts();
  const slugs = getAllProductSlugs();

  it('has products loaded', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('all products have required fields', () => {
    for (const p of products) {
      expect(p.id, `${p.slug} missing id`).toBeTruthy();
      expect(p.slug, `${p.id} missing slug`).toBeTruthy();
      expect(p.name, `${p.slug} missing name`).toBeTruthy();
      expect(p.brand, `${p.slug} missing brand`).toBeTruthy();
      expect(p.priceUsdCents, `${p.slug} missing price`).toBeGreaterThan(0);
      expect(p.images.length, `${p.slug} has no images`).toBeGreaterThan(0);
    }
  });

  it('all slugs are unique', () => {
    const unique = new Set(slugs);
    expect(slugs.length).toBe(unique.size);
  });

  it('all slugs are URL-safe', () => {
    for (const slug of slugs) {
      expect(slug, `Invalid slug: ${slug}`).toMatch(/^[a-z0-9-]+$/);
      expect(slug).not.toMatch(/--/);
      expect(slug).not.toMatch(/^-|-$/);
    }
  });

  it('all product IDs are unique', () => {
    const ids = products.map((p) => p.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
});

describe('getProductBySlug', () => {
  it('finds existing product', () => {
    const slugs = getAllProductSlugs();
    const product = getProductBySlug(slugs[0]);
    expect(product).toBeDefined();
    expect(product!.slug).toBe(slugs[0]);
  });

  it('returns undefined for unknown slug', () => {
    expect(getProductBySlug('nonexistent-product-xyz')).toBeUndefined();
  });
});

describe('getSimilarProducts', () => {
  it('returns similar products', () => {
    const slugs = getAllProductSlugs();
    const similar = getSimilarProducts(slugs[0]);
    // Should return other products (not the same one)
    expect(similar.every((p) => p.slug !== slugs[0])).toBe(true);
  });

  it('respects limit', () => {
    const slugs = getAllProductSlugs();
    const similar = getSimilarProducts(slugs[0], 2);
    expect(similar.length).toBeLessThanOrEqual(2);
  });
});

describe('productToTileData', () => {
  it('creates valid tile data', () => {
    const products = getAllProducts();
    for (const p of products) {
      const tile = productToTileData(p);
      expect(tile.id, `${p.slug} tile missing id`).toBeTruthy();
      expect(tile.name, `${p.slug} tile missing name`).toBeTruthy();
      expect(tile.slug, `${p.slug} tile missing slug`).toBeTruthy();
      expect(tile.priceUsdCents, `${p.slug} tile missing price`).toBeGreaterThan(0);
      expect(tile.thumbnail, `${p.slug} tile missing thumbnail`).toBeTruthy();
    }
  });
});

describe('searchProducts', () => {
  it('finds by name', () => {
    const products = getAllProducts();
    if (products.length > 0) {
      // Search by first word of first product name
      const firstWord = products[0].name.split(' ')[0];
      const results = searchProducts(firstWord);
      expect(results.length).toBeGreaterThan(0);
    }
  });

  it('returns empty for empty query', () => {
    expect(searchProducts('')).toEqual([]);
  });
});

describe('getSeriesInOrder', () => {
  it('returns series configs', () => {
    const series = getSeriesInOrder();
    expect(series.length).toBeGreaterThan(0);
    for (const s of series) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
    }
  });
});
