import type { Product, ProductTileData } from '@/types/product';
import productsData from '@/../docs/hyper-products.json';

const allProducts = productsData.products as Product[];
const products = allProducts.filter((p) => !p.hidden);

export async function getAllProductsAsync(): Promise<Product[]> {
  return products;
}

export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export async function getAllProductSlugsAsync(): Promise<string[]> {
  const allProducts = await getAllProductsAsync();
  return allProducts.map((p) => p.slug);
}

export function getSimilarProducts(currentSlug: string, limit = 4): Product[] {
  const currentProduct = getProductBySlug(currentSlug);
  if (!currentProduct) return [];

  const similar = products
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aDiff = Math.abs(a.priceUsdCents - currentProduct.priceUsdCents);
      const bDiff = Math.abs(b.priceUsdCents - currentProduct.priceUsdCents);
      return aDiff - bDiff;
    })
    .slice(0, limit);

  return similar;
}

/**
 * Convert Product to ProductTileData
 */
export function productToTileData(product: Product): ProductTileData {
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];

  const totalPower = product.specs?.motor?.count && product.specs?.motor?.powerPerMotor
    ? product.specs.motor.count * product.specs.motor.powerPerMotor
    : product.specs?.motor?.totalPower;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.shortDescription,
    priceUsdCents: product.priceUsdCents,
    originalPriceUsdCents: product.originalPriceUsdCents,
    thumbnail: mainImage?.url || '/placeholder.webp',
    inStock: product.inStock,
    specs: {
      maxSpeed: product.specs?.performance?.maxSpeed,
      range: product.specs?.performance?.range,
      voltage: product.specs?.battery?.voltage,
      capacity: product.specs?.battery?.capacity,
      totalPower: totalPower,
    },
  };
}

/**
 * Search products by query
 */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return products.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q)
    );
  });
}

/**
 * Map raw product series values to seriesConfig IDs
 */
function normalizeSeriesId(product: Product): string {
  const series = product.series || '';
  const brand = product.brand?.toLowerCase() || '';

  // Teverun brand products → teverun section
  if (brand === 'teverun' || ['Fighter', 'Blade', 'Supreme'].includes(series)) {
    return 'teverun';
  }

  // Tiger brand (case-insensitive match)
  if (brand === 'tiger' || series.toLowerCase() === 'tiger') {
    return 'tiger';
  }

  // Nami products → premium section
  if (brand === 'nami' || series.toLowerCase().includes('burn-e')) {
    return 'premium';
  }

  // Kaabo, Nanrobot → extreme section
  if (brand === 'kaabo' || brand === 'nanrobot' || ['Kaabo', 'LS'].includes(series)) {
    return 'extreme';
  }

  // Direct matches (premium, extreme, offroad)
  const directMatch = seriesConfigs.find((s) => s.id === series.toLowerCase());
  if (directMatch) return directMatch.id;

  return 'other';
}

/**
 * Get products grouped by series
 */
export function getProductsBySeries(): Map<string, Product[]> {
  const seriesMap = new Map<string, Product[]>();

  for (const product of products) {
    const seriesId = normalizeSeriesId(product);
    if (!seriesMap.has(seriesId)) {
      seriesMap.set(seriesId, []);
    }
    seriesMap.get(seriesId)!.push(product);
  }

  return seriesMap;
}

/**
 * Series display config
 */
export interface SeriesConfig {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

const seriesConfigs: SeriesConfig[] = [
  {
    id: 'teverun',
    name: 'Teverun',
    description: 'Найпотужніші серійні самокати у світі — Supreme 7260R V4 та Supreme Ultra',
    badge: 'TEVERUN',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Inmotion та Nami Burn-E — еталони якості, комфорту та інженерії',
    badge: 'PREMIUM',
  },
  {
    id: 'extreme',
    name: 'Extreme',
    description: 'Мотоциклетні вилки та максимальна потужність — Mars, Kaabo, Nanrobot',
    badge: 'EXTREME',
  },
  {
    id: 'tiger',
    name: 'Tiger',
    description: 'IPX7 захист, безкамерні шини, преміум інженерія',
    badge: 'TIGER',
  },
  {
    id: 'offroad',
    name: 'Off-Road',
    description: 'Електробайки для бездоріжжя',
    badge: 'OFFROAD',
  },
];

export function getSeriesInOrder(): SeriesConfig[] {
  return seriesConfigs;
}

export function getSeriesConfig(seriesId: string): SeriesConfig | undefined {
  return seriesConfigs.find((s) => s.id === seriesId);
}
