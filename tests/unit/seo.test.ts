/**
 * SEO validation tests for HYSCO
 */
import { describe, it, expect } from 'vitest';
import { getAllProducts, getAllProductSlugs } from '@/lib/products';

const BASE_URL = 'https://hysco.com.ua';

describe('SEO — product data', () => {
  const products = getAllProducts();

  it('all products have SEO-friendly slugs', () => {
    for (const p of products) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.slug.length).toBeLessThanOrEqual(60);
    }
  });

  it('all products have descriptions for meta tags', () => {
    for (const p of products) {
      expect(p.shortDescription || p.description, `${p.slug} missing description`).toBeTruthy();
    }
  });

  it('all products have a main image for OG tags', () => {
    for (const p of products) {
      const mainImage = p.images.find((img) => img.isMain) || p.images[0];
      expect(mainImage, `${p.slug} has no image for OG tag`).toBeDefined();
      expect(mainImage!.url).toBeTruthy();
    }
  });

  it('all slugs produce valid URLs', () => {
    const slugs = getAllProductSlugs();
    for (const slug of slugs) {
      const url = `${BASE_URL}/product/${slug}/`;
      expect(() => new URL(url)).not.toThrow();
    }
  });
});

describe('SEO — sitemap coverage', () => {
  it('product slugs are unique', () => {
    const slugs = getAllProductSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('no slugs contain uppercase', () => {
    const slugs = getAllProductSlugs();
    for (const slug of slugs) {
      expect(slug).toBe(slug.toLowerCase());
    }
  });
});
