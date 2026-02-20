import { Metadata } from 'next';
import { MetallicText } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'Політика використання cookies на сайті HYSCO.',
  alternates: { canonical: '/cookies/' },
  openGraph: {
    type: 'website',
    url: '/cookies/',
    siteName: 'HYSCO',
    title: 'Cookies | HYSCO',
    description: 'Політика використання cookies на сайті HYSCO.',
  },
};

export default function CookiesPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <MetallicText variant="silver" as="h1" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>
        Політика Cookies
      </MetallicText>
      <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
        <p>Сайт hysco.com.ua використовує файли cookies для забезпечення найкращого досвіду використання.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Що таке cookies?</h2>
        <p>Cookies — це невеликі текстові файли, які зберігаються у вашому браузері для запам&apos;ятовування ваших налаштувань та покращення роботи сайту.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Які cookies ми використовуємо</h2>
        <ul style={{ paddingLeft: '24px' }}>
          <li><strong style={{ color: 'var(--foreground)' }}>Необхідні:</strong> Для роботи кошика та збереження налаштувань</li>
          <li><strong style={{ color: 'var(--foreground)' }}>Аналітичні:</strong> Для покращення роботи сайту</li>
        </ul>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Управління cookies</h2>
        <p>Ви можете вимкнути cookies у налаштуваннях вашого браузера. Це може вплинути на функціональність сайту.</p>
      </div>
    </div>
  );
}
