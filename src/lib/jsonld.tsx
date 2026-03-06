/**
 * JSON-LD Schema generators for SEO
 * Aligned with hiley.com.ua reference implementation.
 */

import type { Product } from '@/types/product';
import { getExchangeRates } from '@scootify/shared/lib/currency';

const SITE_URL = 'https://hysco.com.ua';
const SITE_NAME = 'HYSCO';
const SITE_ALTERNATE_NAME = 'Hysco';
const SITE_LANGUAGE = 'uk-UA';
const SITE_PHONE = '+380772770006';
const SITE_EMAIL = 'leonid@dzyha.com';
const SITE_LOGO = `${SITE_URL}/og-image.jpg`;
const SITE_LOGO_WIDTH = 1200;
const SITE_LOGO_HEIGHT = 630;
const SITE_DESCRIPTION = "HYSCO — хаб для підбору флагманських електросамокатів. Характеристики, огляди та з'єднання з офіційними дистриб'юторами.";
const PRICE_VALID_UNTIL = '2026-12-31';

const SITE_ADDRESS = {
  streetAddress: 'вул. Набережна, 70',
  addressLocality: 'Стрижавка',
  addressRegion: 'Вінницька область',
  postalCode: '23210',
  addressCountry: 'UA',
};

// ============================================
// Organization Schema
// ============================================

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO,
      width: SITE_LOGO_WIDTH,
      height: SITE_LOGO_HEIGHT,
    },
    description: SITE_DESCRIPTION,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      postalCode: SITE_ADDRESS.postalCode,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_PHONE,
      contactType: 'customer service',
      availableLanguage: ['Ukrainian'],
    },
  };
}

// ============================================
// WebSite Schema (with SearchAction for sitelinks)
// ============================================

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ============================================
// LocalBusiness / Store Schema
// ============================================

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${SITE_URL}/#store`,
    name: SITE_NAME,
    url: SITE_URL,
    image: SITE_LOGO,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      postalCode: SITE_ADDRESS.postalCode,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    priceRange: '₴₴₴',
    currenciesAccepted: 'UAH',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };
}

// ============================================
// WebPage Schema
// ============================================

export function generateWebPageSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${opts.path}#webpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.title,
    description: opts.description,
    inLanguage: SITE_LANGUAGE,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    ...(opts.image && {
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: opts.image,
      },
    }),
  };
}

// ============================================
// Breadcrumb Schema
// ============================================

export function generateBreadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ============================================
// Product Schema
// ============================================

export function generateProductSchema(product: Product) {
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  const priceUAH = Math.round((product.priceUsdCents / 100) * getExchangeRates().UAH);

  const productImages = product.images.map((img) =>
    img.url.startsWith('http') ? img.url : `${SITE_URL}${img.url}`
  );

  const shippingDetails = {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'UAH' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
    },
  };

  const hasMerchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'UA',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 14,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/product/${product.slug}/#product`,
    name: product.name,
    description: product.description || product.shortDescription || `${product.name} — електросамокат від ${product.brand}`,
    sku: product.sku,
    mpn: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    manufacturer: { '@type': 'Organization', name: product.brand },
    image: productImages.length > 0 ? productImages : undefined,
    url: `${SITE_URL}/product/${product.slug}`,
    category: 'Електросамокати',
    offers: {
      '@type': 'Offer',
      '@id': `${SITE_URL}/product/${product.slug}/#offer`,
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'UAH',
      price: priceUAH,
      priceValidUntil: PRICE_VALID_UNTIL,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
      shippingDetails,
      hasMerchantReturnPolicy,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating?.average || 5,
      reviewCount: product.rating?.count || 1,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
      author: { '@type': 'Organization', name: SITE_NAME },
      reviewBody: (product.shortDescription || product.description || `${product.name} — електросамокат ${product.brand}.`).slice(0, 500),
    },
  };

  if (mainImage) {
    (schema as Record<string, unknown>).image = mainImage.url.startsWith('http')
      ? mainImage.url
      : `${SITE_URL}${mainImage.url}`;
  }

  return schema;
}

// ============================================
// ItemList Schema
// ============================================

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
      url: `${SITE_URL}/product/${item.slug}`,
      name: item.name,
      image: item.thumbnail.startsWith('http')
        ? item.thumbnail
        : `${SITE_URL}${item.thumbnail}`,
    })),
  };
}

// ============================================
// FAQ Schema
// ============================================

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

// ============================================
// Combine schemas into @graph
// ============================================

export function combineSchemas(...schemas: Array<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _, ...rest } = schema;
      return rest;
    }),
  };
}
