'use client';

import { useState, useEffect } from 'react';
import { Icon, MetallicButton } from '@/components/ui';
import styles from './ProductConsultationCTA.module.css';

interface ProductConsultationCTAProps {
  productName: string;
  productSlug: string;
}

const PHONE_STORAGE_KEY = 'callback_phone';

export function ProductConsultationCTA({ productName, productSlug }: ProductConsultationCTAProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PHONE_STORAGE_KEY);
      if (saved) setPhone(saved);
    } catch {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim();
    if (!trimmed) {
      setError('Введіть номер телефону');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      localStorage.setItem(PHONE_STORAGE_KEY, trimmed);
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: trimmed, productName, productSlug }),
      });

      if (!response.ok) throw new Error('Failed');
      setIsSuccess(true);
    } catch {
      setError('Помилка надсилання. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {isSuccess ? (
        <div className={styles.success}>
          <Icon name="check" size="md" />
          <div>
            <p className={styles.successTitle}>Дякуємо!</p>
            <p className={styles.successText}>Ми зателефонуємо вам найближчим часом</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+38 (0__) ___-__-__"
            className={styles.input}
            autoComplete="tel"
          />
          {error && <span className={styles.error}>{error}</span>}
          <MetallicButton
            type="submit"
            variant="brandText"
            size="lg"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            <Icon name="phone" size="sm" />
            {isSubmitting ? 'Надсилання...' : 'Замовити дзвінок'}
          </MetallicButton>
        </form>
      )}

      <div className={styles.alternatives}>
        <span className={styles.altLabel}>Або напишіть нам:</span>
        <div className={styles.altLinks}>
          <a
            href="https://t.me/ldzyha"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.altLink}
          >
            <Icon name="telegram" size="sm" />
            Telegram
          </a>
          <a href="tel:+380772770006" className={styles.altLink}>
            <Icon name="phone" size="sm" />
            Зателефонувати
          </a>
        </div>
      </div>
    </div>
  );
}
