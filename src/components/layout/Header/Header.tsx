'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Icon, MetallicText } from '@/components/ui';
import styles from './Header.module.css';

export interface HeaderProps {
  logoText?: string;
  logoHref?: string;
  className?: string;
}

export function Header({
  logoText = 'HYSCO',
  logoHref = '/',
  className = '',
}: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDiff = currentScrollY - lastScrollY.current;

        setIsAtTop(currentScrollY < 10);

        if (Math.abs(scrollDiff) > 5) {
          if (scrollDiff > 0 && currentScrollY > 60) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        className={`
          ${styles.header}
          ${isAtTop ? styles.atTop : styles.scrolled}
          ${className}
        `}
      >
        <div className={`${styles.main} ${isVisible ? styles.mainVisible : styles.mainHidden}`}>
          <div className={styles.container}>
            <Link href={logoHref} className={styles.logo} aria-label="HYSCO Home">
              <MetallicText variant="brandText" as="span" className={styles.logoText}>
                {logoText}
              </MetallicText>
            </Link>

            <nav className={styles.nav} aria-label="Головне меню">
              <Link href="/" className={styles.navLink}>Каталог</Link>
              <Link href="/dostavka-i-oplata" className={styles.navLink}>Доставка</Link>
              <Link href="/harantiia" className={styles.navLink}>Гарантія</Link>
            </nav>

            <div className={styles.actions}>
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.actionButton} aria-label="Telegram">
                <Icon name="telegram" size="md" />
              </a>
              <a href="tel:+380772770006" className={styles.actionButton} aria-label="Телефон">
                <Icon name="phone" size="md" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.spacer} />
    </>
  );
}

export default Header;
