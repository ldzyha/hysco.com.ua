import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MetallicText, MetallicButton, Icon, Price, ProductTile } from '@/components/ui';
import { getAllProductSlugsAsync, getProductBySlugAsync, getSimilarProducts, productToTileData } from '@/lib/products';
import { generateProductSchema } from '@/lib/jsonld';
import { productVideos } from '@/types/product';
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
      title: `${product.name} | HYSCO`,
      description: product.shortDescription || '',
      images: mainImage ? [{ url: mainImage.url, alt: product.name }] : [],
    },
    alternates: { canonical: `/product/${slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);

  if (!product) {
    notFound();
  }

  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  const similar = getSimilarProducts(slug, 4);
  const videos = productVideos[slug];
  const totalPower = product.specs?.motor?.count && product.specs?.motor?.powerPerMotor
    ? product.specs.motor.count * product.specs.motor.powerPerMotor
    : product.specs?.motor?.totalPower;
  const productJsonLd = generateProductSchema(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className={styles.page}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Каталог</Link>
          <Icon name="chevronRight" size="xs" color="var(--foreground-muted)" />
          <span>{product.name}</span>
        </nav>

        {/* Product Main */}
        <div className={styles.productMain}>
          {/* Image */}
          <div className={styles.imageSection}>
            {mainImage && (
              <Image
                src={mainImage.url}
                alt={mainImage.alt || product.name}
                width={600}
                height={450}
                className={styles.productImage}
                priority
              />
            )}
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

            <Price usdCents={product.priceUsdCents} size="lg" />

            {/* Key Specs */}
            <div className={styles.keySpecs}>
              {product.specs?.performance?.maxSpeed && (
                <div className={styles.specItem}>
                  <Icon name="lightning" size="md" metallic="gold" />
                  <div>
                    <span className={styles.specValue}>{product.specs.performance.maxSpeed} км/год</span>
                    <span className={styles.specLabel}>Макс. швидкість</span>
                  </div>
                </div>
              )}
              {product.specs?.performance?.range && (
                <div className={styles.specItem}>
                  <Icon name="mapPin" size="md" metallic="blue" />
                  <div>
                    <span className={styles.specValue}>{product.specs.performance.range} км</span>
                    <span className={styles.specLabel}>Запас ходу</span>
                  </div>
                </div>
              )}
              {totalPower && (
                <div className={styles.specItem}>
                  <Icon name="lightning" size="md" metallic="gold" />
                  <div>
                    <span className={styles.specValue}>{totalPower}W</span>
                    <span className={styles.specLabel}>Потужність</span>
                  </div>
                </div>
              )}
              {product.specs?.battery?.voltage && (
                <div className={styles.specItem}>
                  <Icon name="lightning" size="md" metallic="blue" />
                  <div>
                    <span className={styles.specValue}>
                      {product.specs.battery.voltage}V
                      {product.specs.battery.capacity ? ` ${product.specs.battery.capacity}Ah` : ''}
                    </span>
                    <span className={styles.specLabel}>Батарея</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer">
                <MetallicButton variant="brandText" size="lg">
                  <Icon name="telegram" size="sm" />
                  Замовити в Telegram
                </MetallicButton>
              </a>
              <a href="tel:+380772770006">
                <MetallicButton variant="blue" size="lg">
                  <Icon name="phone" size="sm" />
                  Зателефонувати
                </MetallicButton>
              </a>
            </div>

            {/* Warranty & Shipping */}
            <div className={styles.guarantees}>
              <div className={styles.guarantee}>
                <Icon name="shieldCheck" size="sm" metallic="blue" />
                <span>Гарантія {product.warranty?.months || 6} місяців</span>
              </div>
              <div className={styles.guarantee}>
                <Icon name="truck" size="sm" metallic="blue" />
                <span>Доставка по всій Україні</span>
              </div>
              {product.preorder && (
                <div className={styles.guarantee}>
                  <Icon name="clock" size="sm" metallic="gold" />
                  <span>Передзамовлення ~{product.shippingDays} днів</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <section className={styles.descriptionSection}>
            <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>
              Опис
            </MetallicText>
            <p className={styles.description}>{product.description}</p>
          </section>
        )}

        {/* Video */}
        {videos && videos.length > 0 && (
          <section className={styles.videoSection}>
            <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>
              Відео
            </MetallicText>
            <div className={styles.videoGrid}>
              {videos.map((video) => (
                <div key={video.id} className={styles.videoEmbed}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={`${product.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className={styles.similarSection}>
            <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>
              Схожі моделі
            </MetallicText>
            <div className={styles.similarGrid}>
              {similar.map((p) => (
                <ProductTile key={p.id} product={productToTileData(p)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
