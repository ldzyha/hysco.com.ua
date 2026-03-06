import { Metadata } from 'next';
import { MetallicText, MetallicButton, MetallicCard, ProductTile } from '@/components/ui';
import { CallbackSection } from '@/components/ui/CallbackSection';
import { getAllProductsAsync, productToTileData, getProductsBySeries, getSeriesInOrder } from '@/lib/products';
import { initExchangeRate } from '@scootify/shared/lib/currency';
import {
  generateWebPageSchema,
  generateItemListSchema,
  combineSchemas,
} from '@/lib/jsonld';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'HYSCO | Флагманські електросамокати — лише топ-конфігурації',
  description: 'Лише флагмани: Teverun, Inmotion, Nami, Kaabo, Tiger, Mars. Потужність до 15000W, швидкість до 120 км/год. Характеристики та огляди.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  await initExchangeRate();
  const allProducts = await getAllProductsAsync();
  const productsBySeries = getProductsBySeries();
  const seriesInOrder = getSeriesInOrder();

  const homePageJsonLd = combineSchemas(
    generateWebPageSchema({
      title: 'HYSCO | Флагманські електросамокати',
      description: 'Лише флагмани: Teverun, Inmotion, Nami, Kaabo, Tiger, Mars, Surron. Потужність до 15000W, швидкість до 120 км/год.',
      path: '/',
    }),
    generateItemListSchema(
      allProducts.map((p) => ({
        name: p.name,
        slug: p.slug,
        thumbnail: p.images.find((img) => img.isMain)?.url || p.images[0]?.url || '/placeholder.webp',
        priceUsdCents: p.priceUsdCents,
      })),
      'Флагманські електросамокати',
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

        {/* ===== Hero ===== */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>HYPER E-SCOOTERS 2026</div>
              <h1 className={styles.heroTitle}>
                <MetallicText variant="silver" as="span">ПОТУЖНІСТЬ.</MetallicText>
                <br />
                <MetallicText variant="silver" as="span">ШВИДКІСТЬ.</MetallicText>
                <br />
                <MetallicText variant="brandText" as="span">СВОБОДА.</MetallicText>
              </h1>
              <p className={styles.heroSubtitle}>
                Лише флагмани — топова конфігурація кожного бренду. Teverun, Inmotion, Nami, Kaabo, Tiger, Mars, Surron.
                Детальні характеристики та порівняння моделей.
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
                <a href="#catalog" className={styles.ctaLink}>
                  <MetallicButton variant="brandBg" size="lg">
                    Переглянути каталог
                  </MetallicButton>
                </a>
                <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                  <MetallicButton variant="silver" size="lg">
                    Написати в Telegram
                  </MetallicButton>
                </a>
              </div>
            </div>

            {/* Contact card */}
            <div className={styles.heroSide}>
              <div className={styles.contactCard}>
                <div className={styles.contactCardHeader}>
                  <span className={styles.contactCardHeaderDot} />
                  <span className={styles.contactCardTitle}>Безкоштовна консультація</span>
                </div>
                <div className={styles.contactCardBody}>
                  <p className={styles.contactCardText}>
                    Підберемо оптимальну модель під ваш запит та бюджет. З&apos;єднаємо з офіційним дистриб&apos;ютором.
                  </p>
                  <div className={styles.contactCardLinks}>
                    <a
                      href="https://t.me/scootify_eco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      <span className={styles.contactLinkIcon}>✈</span>
                      <div>
                        <div className={styles.contactLinkTitle}>Telegram</div>
                        <div className={styles.contactLinkSub}>@scootify_eco</div>
                      </div>
                    </a>
                    <a href="tel:+380772770006" className={styles.contactLink}>
                      <span className={styles.contactLinkIcon}>📞</span>
                      <div>
                        <div className={styles.contactLinkTitle}>Телефон</div>
                        <div className={styles.contactLinkSub}>+38 077 277 00 06</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Why Choose Us ===== */}
        <section className={styles.whySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>
                Чому HYSCO?
              </MetallicText>
              <p className={styles.sectionSubtitle}>
                Ми не просто показуємо характеристики — ми допомагаємо зробити правильний вибір
              </p>
            </div>
            <div className={styles.featuresGrid}>
              <MetallicCard variant="blue">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🏆</div>
                  <h3 className={styles.featureTitle}>Лише топ-конфігурації</h3>
                  <p className={styles.featureText}>
                    Ретельно відібрані флагмани кожного бренду — без компромісів у якості та потужності.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="silver">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🎯</div>
                  <h3 className={styles.featureTitle}>Детальне порівняння</h3>
                  <p className={styles.featureText}>
                    Повні технічні характеристики, реальні тести та об&apos;єктивне порівняння моделей.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="gold">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🤝</div>
                  <h3 className={styles.featureTitle}>З&apos;єднуємо з дистриб&apos;ютором</h3>
                  <p className={styles.featureText}>
                    Безкоштовна консультація та пряме з&apos;єднання з офіційними дистриб&apos;юторами.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="silver">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>💰</div>
                  <h3 className={styles.featureTitle}>Орієнтовні ціни</h3>
                  <p className={styles.featureText}>
                    Ціни зібрані з публічних джерел для зручного порівняння — фінальна вартість у дистриб&apos;ютора.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="blue">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🛡️</div>
                  <h3 className={styles.featureTitle}>Офіційна гарантія</h3>
                  <p className={styles.featureText}>
                    Гарантія від офіційного дистриб&apos;ютора відповідно до умов виробника.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="gold">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🚚</div>
                  <h3 className={styles.featureTitle}>Доставка Nova Poshta</h3>
                  <p className={styles.featureText}>
                    Доставка по всій Україні через офіційного дистриб&apos;ютора. 1–3 робочих дні.
                  </p>
                </div>
              </MetallicCard>
            </div>
          </div>
        </section>

        {/* ===== Catalog by Series ===== */}
        <section id="catalog" className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <MetallicText variant="silver" as="h2" className={styles.catalogTitle}>
              Каталог
            </MetallicText>
            <p className={styles.catalogSubtitle}>
              Флагманські електросамокати від провідних брендів
            </p>
          </div>
          {seriesInOrder.map((series) => {
            const seriesProducts = productsBySeries.get(series.id) || [];
            if (seriesProducts.length === 0) return null;

            return (
              <div key={series.id} id={series.id} className={styles.seriesSection}>
                <div className={styles.seriesHeader}>
                  {series.badge && <span className={styles.seriesBadge}>{series.badge}</span>}
                  <MetallicText variant="silver" as="h3" className={styles.seriesTitle}>
                    {series.name}
                  </MetallicText>
                  <p className={styles.seriesDescription}>{series.description}</p>
                </div>
                <div className={styles.productGrid}>
                  {seriesProducts.map((product) => (
                    <ProductTile
                      key={product.id}
                      product={productToTileData(product)}
                      purchaseModel="consultation"
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <p className={styles.disclaimer}>
            Ціни орієнтовні та наведені для порівняння моделей. Фінальна вартість — у офіційного дистриб&apos;ютора.
          </p>
        </section>

        {/* ===== Callback Section ===== */}
        <section className={styles.callbackSection}>
          <div className={styles.sectionContainer}>
            <CallbackSection />
          </div>
        </section>

        {/* ===== Final CTA ===== */}
        <section className={styles.finalCta}>
          <div className={styles.sectionContainer}>
            <MetallicText variant="silver" as="h2" className={styles.ctaTitle}>
              Готові вибрати свій самокат?
            </MetallicText>
            <p className={styles.ctaText}>
              Ми безкоштовно підберемо ідеальну модель та з&apos;єднаємо вас з офіційним дистриб&apos;ютором
            </p>
            <div className={styles.ctaButtons}>
              <a href="#catalog" className={styles.ctaLink}>
                <MetallicButton variant="brandBg" size="lg">
                  Переглянути каталог
                </MetallicButton>
              </a>
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                <MetallicButton variant="silver" size="lg">
                  Написати в Telegram
                </MetallicButton>
              </a>
            </div>
            <div className={styles.trustRow}>
              <span className={styles.trustItem}>✓ Безкоштовна консультація</span>
              <span className={styles.trustItem}>✓ Офіційна гарантія</span>
              <span className={styles.trustItem}>✓ Доставка по Україні</span>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
