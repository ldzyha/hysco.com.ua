import { metallic, type MetallicVariant } from '@/lib/metallic';
import type { CSSProperties, ReactNode } from 'react';

export interface MetallicTextProps {
  variant?: MetallicVariant;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function MetallicText({
  variant = 'silver',
  as: Tag = 'span',
  children,
  className = '',
  style,
}: MetallicTextProps) {
  const gradientStyle: CSSProperties = {
    background: metallic[variant],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    ...style,
  };

  return (
    <Tag className={className} style={gradientStyle}>
      {children}
    </Tag>
  );
}

export default MetallicText;
