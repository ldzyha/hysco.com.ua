'use client';

import { Icon } from '@/components/ui';
import styles from './ProductConsultationCTA.module.css';

interface ProductConsultationCTAProps {
  productName: string;
  productSlug: string;
}

export function ProductConsultationCTA(_props: ProductConsultationCTAProps) {
  return (
    <div className={styles.container}>
      <div className={styles.alternatives}>
        <span className={styles.altLabel}>Зв&apos;яжіться з нами:</span>
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
