import { metallic, type MetallicVariant } from '@/lib/metallic';
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';

export interface MetallicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MetallicVariant;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const sizeStyles: Record<string, CSSProperties> = {
  sm: { padding: '8px 16px', fontSize: '13px' },
  md: { padding: '12px 24px', fontSize: '14px' },
  lg: { padding: '16px 32px', fontSize: '16px' },
};

export function MetallicButton({
  variant = 'blue',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}: MetallicButtonProps) {
  const buttonStyle: CSSProperties = {
    background: metallic[variant],
    color: variant === 'gold' || variant === 'brandText' ? '#121212' : '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button className={className} style={buttonStyle} {...props}>
      {children}
    </button>
  );
}

export default MetallicButton;
