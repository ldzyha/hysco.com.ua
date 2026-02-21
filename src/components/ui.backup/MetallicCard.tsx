import type { MetallicVariant } from '@/lib/metallic';
import type { CSSProperties, ReactNode } from 'react';

export interface MetallicCardProps {
  variant?: MetallicVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const variantBorders: Record<string, string> = {
  silver: 'rgba(192, 192, 192, 0.2)',
  blue: 'rgba(74, 126, 184, 0.2)',
  gold: 'rgba(212, 175, 55, 0.2)',
  red: 'rgba(220, 80, 80, 0.2)',
  platinum: 'rgba(160, 160, 160, 0.2)',
};

export function MetallicCard({
  variant = 'silver',
  children,
  className = '',
  style,
}: MetallicCardProps) {
  const cardStyle: CSSProperties = {
    background: 'var(--surface)',
    border: `1px solid ${variantBorders[variant] || 'rgba(255,255,255,0.05)'}`,
    borderRadius: '16px',
    padding: '16px',
    transition: 'border-color 0.2s ease',
    ...style,
  };

  return (
    <div className={className} style={cardStyle}>
      {children}
    </div>
  );
}

export default MetallicCard;
