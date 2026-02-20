import { type MetallicVariant } from '@/lib/metallic';
import { useId } from 'react';

const iconPaths = {
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronUp: <path d="M18 15l-6-6-6 6" />,
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  cart: <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />,
  heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  lightning: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  shieldCheck: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  phone: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  truck: <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  telegram: (
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.303l3.198 1.044v4.255a2.25 2.25 0 0 0 3.85 1.59l1.932-1.932 3.748 2.812a2.25 2.25 0 0 0 3.532-1.299l3-13.5a2.25 2.25 0 0 0-1.864-2.238z" data-filled="true" />
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  externalLink: (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  mapPin: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z" />,
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
} as const;

export type IconName = keyof typeof iconPaths;

export interface IconProps {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  metallic?: MetallicVariant;
  className?: string;
  strokeWidth?: number;
  'aria-label'?: string;
}

const sizeMap = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 };

const filledIcons: Set<IconName> = new Set(['telegram']);

function MetallicGradientStops({ variant }: { variant: MetallicVariant }) {
  const gradientColors: Record<MetallicVariant, Array<{ offset: string; color: string }>> = {
    silver: [
      { offset: '0%', color: '#a0a0a0' },
      { offset: '50%', color: '#ffffff' },
      { offset: '100%', color: '#a0a0a0' },
    ],
    platinum: [
      { offset: '0%', color: '#707070' },
      { offset: '50%', color: '#d0d0d0' },
      { offset: '100%', color: '#707070' },
    ],
    blue: [
      { offset: '0%', color: '#2a5a8c' },
      { offset: '50%', color: '#80c0f0' },
      { offset: '100%', color: '#2a5a8c' },
    ],
    gold: [
      { offset: '0%', color: '#9a7020' },
      { offset: '50%', color: '#ffd860' },
      { offset: '100%', color: '#9a7020' },
    ],
    red: [
      { offset: '0%', color: '#8c2a2a' },
      { offset: '50%', color: '#f08080' },
      { offset: '100%', color: '#8c2a2a' },
    ],
    green: [
      { offset: '0%', color: '#2a6c2a' },
      { offset: '50%', color: '#80d080' },
      { offset: '100%', color: '#2a6c2a' },
    ],
    brandBg: [
      { offset: '0%', color: '#1a4a7c' },
      { offset: '50%', color: '#50a0e0' },
      { offset: '100%', color: '#ffd860' },
    ],
    brandText: [
      { offset: '0%', color: '#ff4444' },
      { offset: '25%', color: '#ff8800' },
      { offset: '50%', color: '#ffcc00' },
      { offset: '75%', color: '#ff8800' },
      { offset: '100%', color: '#ff4444' },
    ],
  };

  const stops = gradientColors[variant] || gradientColors.silver;

  return (
    <>
      {stops.map((stop, i) => (
        <stop key={i} offset={stop.offset} stopColor={stop.color} />
      ))}
    </>
  );
}

export function Icon({
  name,
  size = 'md',
  color,
  metallic: metallicVariant,
  className = '',
  strokeWidth = 2,
  'aria-label': ariaLabel,
}: IconProps) {
  const id = useId();
  const gradientId = `icon-gradient-${id}`;
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];
  const path = iconPaths[name];
  const isFilled = filledIcons.has(name);

  let colorValue: string;
  if (metallicVariant) {
    colorValue = `url(#${gradientId})`;
  } else if (color) {
    colorValue = color;
  } else {
    colorValue = 'currentColor';
  }

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill={isFilled ? colorValue : 'none'}
      stroke={isFilled ? 'none' : colorValue}
      strokeWidth={isFilled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      {metallicVariant && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <MetallicGradientStops variant={metallicVariant} />
          </linearGradient>
        </defs>
      )}
      {path}
    </svg>
  );
}

export const iconNames = Object.keys(iconPaths) as IconName[];
export default Icon;
