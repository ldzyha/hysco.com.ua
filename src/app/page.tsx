import { Metadata } from 'next';
import { MetallicText, ProductTile } from '@/components/ui';
import { getAllProductsAsync, productToTileData, getProductsBySeries, getSeriesInOrder } from '@/lib/products';
import {
  generateWebPageSchema,
  generateItemListSchema,
  combineSchemas,
} from '@/lib/jsonld';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HYSCO | Hyper електросамокати - найпотужніші в Україні',
  description: 'Hyper електросамокати від $1600 до $4300. Потужність до 15000W, швидкість до 120 км/год. Teverun, Inmotion, Nami, Kaabo, Mars. Доставка по Україні.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const allProducts = await getAllProductsAsync();
  const productsBySeries = getProductsBySeries();
  const seriesInOrder = getSeriesInOrder();

  const homePageJsonLd = combineSchemas(
    generateWebPageSchema({
      title: 'HYSCO | Hyper електросамокати',
      description: 'Hyper електросамокати від $1600 до $4300. Потужність до 15000W, швидкість до 120 км/год.',
      path: '/',
    }),
    generateItemListSchema(
      allProducts.map((p) => ({
        name: p.name,
        slug: p.slug,
        thumbnail: p.images.find((img) => img.isMain)?.url || p.images[0]?.url || '/placeholder.webp',
        priceUsdCents: p.priceUsdCents,
      })),
      'Hyper електросамокати',
      '/'
    )
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>HYPER E-SCOOTERS 2025</div>
            <h1 className={styles.heroTitle}>
              <MetallicText variant="silver" as="span">ПОТУЖНІСТЬ.</MetallicText>
              <br />
              <MetallicText variant="silver" as="span">ШВИДКІСТЬ.</MetallicText>
              <br />
              <MetallicText variant="brandText" as="span">СВОБОДА.</MetallicText>
            </h1>
            <p className={styles.heroSubtitle}>
              Найпотужніші серійні електросамокати у світі. Від 2000W до 15000W.
              Швидкість до 120 км/год. Запас ходу до 200 км. Доставка по всій Україні.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>15 000W</span>
                <span className={styles.statLabel}>Потужність</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>120 км/год</span>
                <span className={styles.statLabel}>Швидкість</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>200 км</span>
                <span className={styles.statLabel}>Запас ходу</span>
              </div>
            </div>
            <div className={styles.heroCTA}>
              <a href="#catalog" className="btn-primary">Переглянути каталог</a>
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.heroSecondary}>
                Консультація в Telegram
              </a>
            </div>
          </div>
        </section>

        {/* Catalog by Series */}
        <section id="catalog" className={styles.catalog}>
          {seriesInOrder.map((series) => {
            const seriesProducts = productsBySeries.get(series.id) || [];
            if (seriesProducts.length === 0) return null;

            return (
              <div key={series.id} id={series.id} className={styles.seriesSection}>
                <div className={styles.seriesHeader}>
                  {series.badge && <span className={styles.seriesBadge}>{series.badge}</span>}
                  <MetallicText variant="silver" as="h2" className={styles.seriesTitle}>
                    {series.name}
                  </MetallicText>
                  <p className={styles.seriesDescription}>{series.description}</p>
                </div>
                <div className={styles.productGrid}>
                  {seriesProducts.map((product, i) => (
                    <ProductTile
                      key={product.id}
                      product={productToTileData(product)}
                      priority={i === 0}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
