import { Metadata } from 'next';
import { MetallicText } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
  description: 'Політика конфіденційності HYSCO. Як ми збираємо та захищаємо ваші персональні дані.',
  alternates: { canonical: '/polityka-konfidentsiinosti/' },
  openGraph: {
    type: 'website',
    url: '/polityka-konfidentsiinosti/',
    siteName: 'HYSCO',
    title: 'Політика конфіденційності | HYSCO',
    description: 'Політика конфіденційності HYSCO. Як ми збираємо та захищаємо ваші персональні дані.',
  },
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <MetallicText variant="silver" as="h1" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>
        Політика конфіденційності
      </MetallicText>
      <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
        <p>Ця Політика конфіденційності описує, як HYSCO (hysco.com.ua) збирає, використовує та захищає вашу персональну інформацію.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Яку інформацію ми збираємо</h2>
        <p>При оформленні замовлення ми можемо збирати: ім&apos;я, номер телефону, email, адресу доставки.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Як ми використовуємо інформацію</h2>
        <p>Для обробки замовлень, зв&apos;язку з вами, покращення роботи сайту та надання технічної підтримки.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Захист інформації</h2>
        <p>Ми вживаємо всіх необхідних заходів для захисту ваших персональних даних. Ваша інформація не передається третім особам без вашої згоди.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Контакти</h2>
        <p>З питань конфіденційності зверніться: <a href="tel:+380772770006" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>+38 077 277 00 06</a></p>
      </div>
    </div>
  );
}
