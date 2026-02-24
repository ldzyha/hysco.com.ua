import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Умови використання | HYSCO',
  description: 'Умови використання сайту HYSCO — консультаційний сервіс з підбору електросамокатів.',
  alternates: { canonical: '/umovy-vykorystannia/' },
  openGraph: {
    type: 'website',
    url: '/umovy-vykorystannia/',
    siteName: 'HYSCO',
    title: 'Умови використання | HYSCO',
    description: 'Умови використання сайту HYSCO.',
  },
};

export default function TermsPage() {
  return <LegalPage pageKey="terms" siteConfig={siteConfig} showTOC />;
}
