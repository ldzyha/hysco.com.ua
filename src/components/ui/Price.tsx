'use client';

import { formatUAH, formatUSD } from '@/lib/currency';

export interface PriceProps {
  usdCents: number;
  originalUsdCents?: number;
  size?: 'sm' | 'md' | 'lg';
  showUsd?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { main: '16px', secondary: '12px' },
  md: { main: '20px', secondary: '14px' },
  lg: { main: '28px', secondary: '16px' },
};

export function Price({
  usdCents,
  originalUsdCents,
  size = 'md',
  showUsd = true,
  className = '',
}: PriceProps) {
  const sizes = sizeMap[size];

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: sizes.main, fontWeight: 700, color: 'var(--foreground)' }}>
          {formatUAH(usdCents)}
        </span>
        {originalUsdCents && originalUsdCents > usdCents && (
          <span
            style={{
              fontSize: sizes.secondary,
              color: 'var(--foreground-muted)',
              textDecoration: 'line-through',
            }}
          >
            {formatUAH(originalUsdCents)}
          </span>
        )}
      </div>
      {showUsd && (
        <span style={{ fontSize: sizes.secondary, color: 'var(--foreground-muted)' }}>
          {formatUSD(usdCents)}
        </span>
      )}
    </div>
  );
}

export default Price;
