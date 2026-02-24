import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Політика конфіденційності | HYSCO',
  description: 'Як HYSCO збирає, використовує та захищає ваші персональні дані.',
  alternates: { canonical: '/polityka-konfidentsiinosti/' },
  openGraph: {
    type: 'website',
    url: '/polityka-konfidentsiinosti/',
    siteName: 'HYSCO',
    title: 'Політика конфіденційності | HYSCO',
    description: 'Як HYSCO збирає, використовує та захищає ваші персональні дані.',
  },
};

export default function PrivacyPage() {
  return <LegalPage pageKey="privacy" siteConfig={siteConfig} showTOC />;
}
