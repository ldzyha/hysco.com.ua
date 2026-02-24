import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Гарантія | HYSCO',
  description: 'Гарантія та сервісне обслуговування електросамокатів від офіційних дистриб\'юторів.',
  alternates: { canonical: '/harantiia/' },
  openGraph: {
    type: 'website',
    url: '/harantiia/',
    siteName: 'HYSCO',
    title: 'Гарантія | HYSCO',
    description: 'Гарантія та сервісне обслуговування електросамокатів.',
  },
};

export default function WarrantyPage() {
  return <LegalPage pageKey="warranty" siteConfig={siteConfig} showTOC />;
}
