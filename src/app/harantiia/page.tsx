import { Metadata } from 'next';
import { MetallicText, Icon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Гарантія',
  description: 'Гарантія 6 місяців на всі електросамокати. Умови гарантійного обслуговування.',
  alternates: { canonical: '/harantiia/' },
  openGraph: {
    type: 'website',
    url: '/harantiia/',
    siteName: 'HYSCO',
    title: 'Гарантія | HYSCO',
    description: 'Гарантія 6 місяців на всі електросамокати. Умови гарантійного обслуговування.',
  },
};

export default function WarrantyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <MetallicText variant="silver" as="h1" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>
        Гарантія
      </MetallicText>

      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <Icon name="shieldCheck" size="lg" metallic="blue" />
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Гарантійні умови</h2>
        </div>
        <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
          <p>На всі електросамокати надається гарантія <strong style={{ color: 'var(--foreground)' }}>6 місяців</strong> з дати продажу.</p>
          <p>Гарантія поширюється на заводські дефекти та несправності.</p>
          <p>Гарантійне обслуговування включає:</p>
          <ul style={{ paddingLeft: '24px' }}>
            <li>Безкоштовну діагностику</li>
            <li>Заміну дефектних деталей</li>
            <li>Консультаційну підтримку</li>
          </ul>
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <Icon name="info" size="lg" metallic="gold" />
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Гарантія не поширюється на</h2>
        </div>
        <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
          <ul style={{ paddingLeft: '24px' }}>
            <li>Механічні пошкодження внаслідок неправильної експлуатації</li>
            <li>Пошкодження від води (якщо не зазначено водозахист)</li>
            <li>Природний знос шин, гальмівних колодок та інших витратних матеріалів</li>
            <li>Самостійний ремонт або модифікація</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
