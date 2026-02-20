/**
 * JSON-LD Schema generators for SEO
 */

import type { Product } from '@/types/product';
// Currency formatting used for schema.org

const SITE_URL = 'https://hysco.com.ua';
const SITE_NAME = 'HYSCO';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    description: 'Hyper електросамокати - найпотужніші серійні самокати у світі',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380772770006',
      contactType: 'sales',
      areaServed: 'UA',
      availableLanguage: 'Ukrainian',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: '+380772770006',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
    },
    priceRange: '$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  };
}

export function generateProductSchema(product: Product) {
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.shortDescription,
    image: mainImage ? `${SITE_URL}${mainImage.url}` : undefined,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'USD',
      price: (product.priceUsdCents / 100).toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    ...(product.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.average,
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };
}

export function generateWebPageSchema(opts: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateItemListSchema(
  items: Array<{ name: string; slug: string; thumbnail: string; priceUsdCents: number }>,
  listName: string,
  path: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: `${SITE_URL}${path}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        url: `${SITE_URL}/product/${item.slug}`,
        image: `${SITE_URL}${item.thumbnail}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: (item.priceUsdCents / 100).toFixed(2),
        },
      },
    })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function combineSchemas(...schemas: any[]) {
  return schemas;
}
