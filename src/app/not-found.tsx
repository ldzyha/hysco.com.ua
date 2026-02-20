import Link from 'next/link';
import { MetallicText, MetallicButton, Icon } from '@/components/ui';

export default function NotFound() {
  return (
    <main style={{ minHeight: '60vh', padding: '60px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '16px' }}>
          <MetallicText variant="brandText" as="span" style={{ fontSize: '120px', fontWeight: 800, lineHeight: 1 }}>
            404
          </MetallicText>
        </div>

        <MetallicText variant="silver" as="h1" style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
          Сторінку не знайдено
        </MetallicText>

        <p style={{ color: 'var(--foreground-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
          Схоже, ця сторінка переїхала або більше не існує. Поверніться до каталогу, щоб знайти потрібний самокат.
        </p>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <MetallicButton variant="blue" size="md">
            <Icon name="chevronLeft" size="sm" />
            На головну
          </MetallicButton>
        </Link>

        <div style={{ marginTop: '40px', padding: '24px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="phone" size="lg" metallic="blue" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Потрібна допомога?</div>
              <div style={{ fontSize: '14px', color: 'var(--foreground-muted)' }}>
                <a href="tel:+380772770006" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>+38 077 277 00 06</a>
                {' | '}
                <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
