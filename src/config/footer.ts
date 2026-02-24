import type {
  FooterNavColumn,
  FooterContactItem,
  FooterSocialLink,
  FooterFeature,
  FooterLegalLink,
} from '@scootify/shared/components';

export const footerNavigation: FooterNavColumn[] = [
  {
    title: 'Каталог',
    items: [
      { label: 'Всі самокати', href: '/' },
      { label: 'Teverun', href: '/#teverun' },
      { label: 'Premium', href: '/#premium' },
      { label: 'Extreme', href: '/#extreme' },
    ],
  },
  {
    title: 'Інформація',
    items: [
      { label: 'Доставка та оплата', href: '/dostavka-i-oplata', icon: 'truck' },
      { label: 'Гарантія', href: '/harantiia', icon: 'shieldCheck' },
    ],
  },
];

export const footerContacts: FooterContactItem[] = [
  { icon: 'phone', label: '+38 077 277 00 06', href: 'tel:+380772770006' },
  { icon: 'telegram', label: '@ldzyha', href: 'https://t.me/ldzyha' },
  { icon: 'clock', label: 'Пн-Нд: 09:00 - 21:00' },
];

export const socialLinks: FooterSocialLink[] = [
  { platform: 'telegram', href: 'https://t.me/scootify_eco', label: 'Telegram' },
  { platform: 'youtube', href: 'https://youtube.com/@hiley_ua', label: 'YouTube' },
];

export const footerFeatures: FooterFeature[] = [
  {
    icon: 'truck',
    title: 'Доставка по Україні',
    description: 'Новою Поштою по всій країні',
  },
  {
    icon: 'shieldCheck',
    title: 'Гарантія 6 місяців',
    description: 'На всі електросамокати',
  },
  {
    icon: 'phone',
    title: 'Консультація',
    description: 'Допоможемо обрати',
  },
  {
    icon: 'lightning',
    title: 'Hyper потужність',
    description: 'До 15000W та 120 км/год',
  },
];

export const legalLinks: FooterLegalLink[] = [
  { label: 'Політика конфіденційності', href: '/polityka-konfidentsiinosti' },
  { label: 'Умови використання', href: '/umovy-vykorystannia' },
  { label: 'Cookies', href: '/cookies' },
];
