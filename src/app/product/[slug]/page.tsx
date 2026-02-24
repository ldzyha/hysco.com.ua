import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MetallicText,
  Price,
  ProductTile,
  SpecsTable,
  ProductTerms,
  BreadcrumbNav,
  KeySpecsBadges,
  GuaranteeBadges,
  DescriptionRenderer,
  VideoSection,
  SimilarProductsGrid,
} from '@/components/ui';
import { ProductConsultationCTA } from '@/components/ui';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { getAllProductSlugsAsync, getProductBySlugAsync, getSimilarProducts, productToTileData } from '@/lib/products';
import { generateProductSchema } from '@/lib/jsonld';
import { productVideos } from '@/types/product';
import { initExchangeRate, usdToUah } from '@scootify/shared/lib/currency';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return { title: 'Товар не знайдено' };

  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  return {
    title: `${product.name} | Купити`,
    description: product.shortDescription || product.description,
    openGraph: {
      locale: 'uk_UA',
      url: `/product/${slug}/`,
      siteName: 'HYSCO',
      title: `${product.name} | HYSCO`,
      description: product.shortDescription || '',
      images: mainImage ? [{ url: mainImage.url, alt: product.name, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | HYSCO`,
      description: product.shortDescription || '',
      images: mainImage ? [mainImage.url] : [],
    },
    alternates: { canonical: `/product/${slug}/` },
    other: {
      'og:type': 'product',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await initExchangeRate();
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);

  if (!product) {
    notFound();
  }

  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  const similar = getSimilarProducts(slug, 4);
  const videos = productVideos[slug];
  const productJsonLd = generateProductSchema(product);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Каталог', item: 'https://hysco.com.ua/' },
      { '@type': 'ListItem', position: 2, name: product.name, item: `https://hysco.com.ua/product/${slug}/` },
    ],
  };

  const galleryImages = product.images.length > 0 ? product.images : (mainImage ? [mainImage] : []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className={styles.page}>
        {/* Breadcrumb */}
        <BreadcrumbNav
          items={[{ label: 'Каталог', href: '/' }, { label: product.name }]}
          renderLink={(href, children) => <Link href={href}>{children}</Link>}
          className={styles.breadcrumb}
        />

        {/* Product Main */}
        <div className={styles.productMain}>
          {/* Image Gallery */}
          <div className={styles.imageSection}>
            {galleryImages.length > 1 ? (
              <ProductGallery
                images={galleryImages}
                productName={product.name}
                imageClassName={styles.productImage}
                thumbClassName={styles.thumbImage}
              />
            ) : mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt || product.name}
                width={600}
                height={450}
                className={styles.productImage}
                priority
              />
            ) : null}
          </div>

          {/* Info */}
          <div className={styles.infoSection}>
            <div className={styles.brand}>{product.brand}</div>
            <h1 className={styles.productName}>
              <MetallicText variant="silver">{product.name}</MetallicText>
            </h1>

            {product.shortDescription && (
              <p className={styles.shortDesc}>{product.shortDescription}</p>
            )}

            <Price
              primaryCents={usdToUah(product.priceUsdCents)}
              secondaryCents={product.priceUsdCents}
              originalPrimaryCents={product.originalPriceUsdCents ? usdToUah(product.originalPriceUsdCents) : undefined}
              originalSecondaryCents={product.originalPriceUsdCents}
              size="lg"
              approximate={true}
            />

            <KeySpecsBadges specs={product.specs} />

            <ProductConsultationCTA productName={product.name} productSlug={slug} />

            <GuaranteeBadges
              warrantyMonths={product.warranty?.months || 6}
              showShipping
              preorderDays={product.preorder ? product.shippingDays : undefined}
            />
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <section className={styles.descriptionSection}>
            <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>Опис</MetallicText>
            <DescriptionRenderer text={product.description} mode="plain" />
          </section>
        )}

        {/* Full Specs Table */}
        {product.specs && (
          <section className={styles.specsSection}>
            <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>Характеристики</MetallicText>
            <SpecsTable specs={product.specs} showInfoButtons />
          </section>
        )}

        {/* Product Terms */}
        <section className={styles.termsSection}>
          <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>Умови</MetallicText>
          <ProductTerms siteConfig={siteConfig} purchaseModel="consultation" />
        </section>

        {/* Videos */}
        {videos && <VideoSection videos={videos} productName={product.name} />}

        {/* Similar Products */}
        <SimilarProductsGrid count={similar.length}>
          {similar.map((p) => (
            <ProductTile key={p.id} product={productToTileData(p)} purchaseModel="consultation" />
          ))}
        </SimilarProductsGrid>
      </div>
    </>
  );
}
