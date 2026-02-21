'use client';

import { ReactNode, useState } from 'react';
import { MetallicText, Icon, type IconName } from '@/components/ui';
import styles from './Footer.module.css';

export interface FooterNavItem {
  label: string;
  href: string;
  icon?: IconName;
}

export interface FooterNavColumn {
  title: string;
  items: FooterNavItem[];
}

export interface FooterContactItem {
  icon: IconName;
  label: string;
  href?: string;
  lines?: string[];
}

export interface FooterSocialLink {
  platform: 'telegram' | 'youtube';
  href: string;
  label: string;
}

export interface FooterFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterProps {
  brand?: ReactNode;
  tagline?: string;
  navigation?: FooterNavColumn[];
  contacts?: FooterContactItem[];
  socials?: FooterSocialLink[];
  features?: FooterFeature[];
  legalLinks?: FooterLegalLink[];
  copyright?: string;
  variant?: 'full' | 'minimal';
  className?: string;
}

const socialIcons: Record<string, ReactNode> = {
  telegram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export function Footer({
  tagline = 'Hyper електросамокати - найпотужніші в Україні',
  navigation,
  contacts,
  socials,
  features,
  legalLinks,
  copyright,
  variant = 'full',
  className = '',
}: FooterProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const year = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className={`${styles.footer} ${styles.minimal} ${className}`}>
        <div className={styles.container}>
          <div className={styles.bottomBar}>
            <p className={styles.copyright}>{copyright || `${year} HYSCO. Всі права захищені.`}</p>
            {legalLinks && (
              <div className={styles.legalLinks}>
                {legalLinks.map((link) => (
                  <a key={link.href} href={link.href} className={styles.legalLink}>{link.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* Features */}
          {features && features.length > 0 && (
            <div className={styles.featuresGrid}>
              {features.map((feature, i) => (
                <div key={i} className={styles.featureCard}>
                  <Icon name={feature.icon} size="lg" metallic="blue" />
                  <div className={styles.featureContent}>
                    <span className={styles.featureTitle}>{feature.title}</span>
                    <span className={styles.featureDescription}>{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Brand */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <MetallicText variant="brandText">HYSCO</MetallicText>
            </div>
            <p className={styles.tagline}>{tagline}</p>
            {socials && (
              <div className={styles.socialLinks}>
                {socials.map((link) => (
                  <a key={link.platform} href={link.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    {socialIcons[link.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          {navigation?.map((column) => {
            const isExpanded = expandedSections.has(column.title);
            const sectionId = `footer-nav-${column.title.replace(/\s+/g, '-')}`;
            return (
              <nav key={column.title} className={styles.navSection} aria-label={column.title}>
                <button
                  className={styles.navTitleButton}
                  onClick={() => toggleSection(column.title)}
                  aria-expanded={isExpanded}
                  aria-controls={sectionId}
                >
                  <h3 className={styles.navTitle}><MetallicText variant="silver">{column.title}</MetallicText></h3>
                  <span className={`${styles.accordionIcon} ${isExpanded ? styles.expanded : ''}`}>
                    <Icon name="chevronDown" size="sm" />
                  </span>
                </button>
                <ul id={sectionId} className={`${styles.navList} ${isExpanded ? styles.navListExpanded : ''}`}>
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className={styles.navLink}>
                        {item.icon && <Icon name={item.icon} size="sm" />}
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}

          {/* Contacts */}
          {contacts && (
            <div className={styles.contactSection}>
              <button
                className={styles.navTitleButton}
                onClick={() => toggleSection('Контакти')}
                aria-expanded={expandedSections.has('Контакти')}
                aria-controls="footer-contacts"
              >
                <h3 className={styles.navTitle}><MetallicText variant="silver">Контакти</MetallicText></h3>
                <span className={`${styles.accordionIcon} ${expandedSections.has('Контакти') ? styles.expanded : ''}`}>
                  <Icon name="chevronDown" size="sm" />
                </span>
              </button>
              <div id="footer-contacts" className={`${styles.contactList} ${expandedSections.has('Контакти') ? styles.contactListExpanded : ''}`}>
                {contacts.map((item, i) => (
                  <div key={i} className={styles.contactItem}>
                    <Icon name={item.icon} size="sm" metallic="blue" />
                    <div>
                      {item.href ? (
                        <a href={item.href} className={styles.contactLink}>{item.label}</a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom */}
          <div className={styles.bottomBar}>
            <p className={styles.copyright}>{copyright || `${year} HYSCO. Всі права захищені.`}</p>
            {legalLinks && (
              <div className={styles.legalLinks}>
                {legalLinks.map((link) => (
                  <a key={link.href} href={link.href} className={styles.legalLink}>{link.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
