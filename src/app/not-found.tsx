import Link from 'next/link';
import { MetallicText, Icon } from '@/components/ui';
import { metallic, type MetallicVariant } from '@/lib/metallic';
import type { CSSProperties } from 'react';

function LinkButton({
  href,
  variant = 'blue',
  size = 'md',
  children,
}: {
  href: string;
  variant?: MetallicVariant;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: '13px' },
    md: { padding: '12px 24px', fontSize: '14px' },
    lg: { padding: '16px 32px', fontSize: '16px' },
  };
  return (
    <Link
      href={href}
      style={{
        background: metallic[variant],
        color: variant === 'gold' || variant === 'brandText' ? '#121212' : '#ffffff',
        border: 'none',
        borderRadius: '9999px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        ...sizeStyles[size],
      }}
    >
      {children}
    </Link>
  );
}

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', padding: '60px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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

        <LinkButton href="/" variant="blue" size="md">
          <Icon name="chevronLeft" size="sm" />
          На головну
        </LinkButton>

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
    </div>
  );
}
