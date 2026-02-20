import { Header } from './Header';
import { Footer } from './Footer';
import {
  socialLinks,
  footerNavigation,
  footerContacts,
  footerFeatures,
  legalLinks,
} from '@/config/footer';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer
        tagline="Hyper електросамокати - найпотужніші в Україні"
        navigation={footerNavigation}
        contacts={footerContacts}
        socials={socialLinks}
        features={footerFeatures}
        legalLinks={legalLinks}
      />
    </>
  );
}
