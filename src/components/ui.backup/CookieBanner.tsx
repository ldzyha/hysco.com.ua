'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './CookieBanner.module.css';

const COOKIE_CONSENT_KEY = 'hysco-cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleAccept();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [visible, handleAccept]);

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Повідомлення про cookies">
      <p className={styles.text}>
        Ми використовуємо cookies для покращення роботи сайту.{' '}
        <a href="/cookies" className={styles.link}>Дізнатись більше</a>
      </p>
      <button className={styles.button} onClick={handleAccept}>
        Прийняти
      </button>
    </div>
  );
}

export default CookieBanner;
