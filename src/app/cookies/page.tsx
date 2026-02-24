import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cookies | HYSCO',
  description: 'Політика використання cookies на сайті HYSCO.',
  alternates: { canonical: '/cookies/' },
  openGraph: {
    type: 'website',
    url: '/cookies/',
    siteName: 'HYSCO',
    title: 'Cookies | HYSCO',
    description: 'Політика використання cookies на сайті HYSCO.',
  },
};

export default function CookiesPage() {
  return <LegalPage pageKey="cookies" siteConfig={siteConfig} showTOC />;
}
