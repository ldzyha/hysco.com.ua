'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import {
  socialLinks,
  footerNavigation,
  footerContacts,
  footerFeatures,
  legalLinks,
} from '@/config/footer';

const MINIMAL_FOOTER_PAGES = ['/checkout', '/cart'];

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMinimalFooterPage = MINIMAL_FOOTER_PAGES.some(page => pathname?.startsWith(page));

  return (
    <>
      <Header />
      <main>{children}</main>
      {isMinimalFooterPage ? (
        <Footer variant="minimal" legalLinks={legalLinks} />
      ) : (
        <Footer
          tagline="Hyper електросамокати - найпотужніші в Україні"
          navigation={footerNavigation}
          contacts={footerContacts}
          socials={socialLinks}
          features={footerFeatures}
          legalLinks={legalLinks}
        />
      )}
    </>
  );
}
