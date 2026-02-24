import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Доставка і оплата | HYSCO',
  description: 'Умови доставки та способи оплати електросамокатів через офіційних дистриб\'юторів.',
  alternates: { canonical: '/dostavka-i-oplata/' },
  openGraph: {
    type: 'website',
    url: '/dostavka-i-oplata/',
    siteName: 'HYSCO',
    title: 'Доставка і оплата | HYSCO',
    description: 'Умови доставки та способи оплати електросамокатів.',
  },
};

export default function ShippingPage() {
  return <LegalPage pageKey="shipping" siteConfig={siteConfig} showTOC />;
}
