import { Metadata } from 'next';
import { MetallicText, Icon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Доставка та оплата',
  description: 'Доставка електросамокатів по всій Україні Новою Поштою. Оплата при отриманні.',
};

export default function DeliveryPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <MetallicText variant="silver" as="h1" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>
        Доставка та оплата
      </MetallicText>

      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <Icon name="truck" size="lg" metallic="blue" />
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Доставка</h2>
        </div>
        <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
          <p>Доставка здійснюється <strong style={{ color: 'var(--foreground)' }}>Новою Поштою</strong> по всій Україні.</p>
          <p>Термін доставки: <strong style={{ color: 'var(--foreground)' }}>1-3 робочі дні</strong> після відправки.</p>
          <p>Для передзамовлення термін складає <strong style={{ color: 'var(--foreground)' }}>10-14 робочих днів</strong>.</p>
          <p>Вартість доставки розраховується за тарифами Нової Пошти.</p>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <Icon name="shieldCheck" size="lg" metallic="gold" />
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Оплата</h2>
        </div>
        <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
          <p><strong style={{ color: 'var(--foreground)' }}>Повна передоплата</strong> на картку ПриватБанк/Monobank.</p>
          <p>Можлива оплата частинами за домовленістю.</p>
          <p>Для оформлення замовлення зв&apos;яжіться з нами через Telegram або за телефоном.</p>
        </div>
      </section>

      <section>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <Icon name="phone" size="lg" metallic="blue" />
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Контакти</h2>
        </div>
        <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
          <p>Телефон: <a href="tel:+380772770006" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>+38 077 277 00 06</a></p>
          <p>Telegram: <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>@scootify_eco</a></p>
          <p>Працюємо щодня з 09:00 до 21:00.</p>
        </div>
      </section>
    </div>
  );
}
