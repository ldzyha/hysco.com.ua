'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import styles from './FloatingContactButton.module.css';

const TELEGRAM_URL = 'https://t.me/scootify_eco';
const PHONE = 'tel:+380772770006';

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.menu}>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.menuItem}>
            <Icon name="telegram" size="sm" />
            <span>Telegram</span>
          </a>
          <a href={PHONE} className={styles.menuItem}>
            <Icon name="phone" size="sm" />
            <span>Зателефонувати</span>
          </a>
        </div>
      )}
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Контакти"
      >
        <Icon name={isOpen ? 'close' : 'phone'} size="md" />
      </button>
    </div>
  );
}

export default FloatingContactButton;
