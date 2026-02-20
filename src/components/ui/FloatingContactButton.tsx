'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from './Icon';
import styles from './FloatingContactButton.module.css';

const TELEGRAM_URL = 'https://t.me/scootify_eco';
const PHONE = 'tel:+380772770006';
const MENU_ID = 'contact-menu';

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close]);

  return (
    <div className={styles.container} ref={containerRef}>
      {isOpen && (
        <div className={styles.menu} id={MENU_ID} role="menu" aria-label="Способи зв'язку">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.menuItem} role="menuitem">
            <Icon name="telegram" size="sm" />
            <span>Telegram</span>
          </a>
          <a href={PHONE} className={styles.menuItem} role="menuitem">
            <Icon name="phone" size="sm" />
            <span>Зателефонувати</span>
          </a>
        </div>
      )}
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Контакти"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
      >
        <Icon name={isOpen ? 'close' : 'phone'} size="md" />
      </button>
    </div>
  );
}

export default FloatingContactButton;
