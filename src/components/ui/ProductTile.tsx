'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Price } from './Price';
import { Icon } from './Icon';
import type { ProductTileData } from '@/types/product';
import styles from './ProductTile.module.css';

export interface ProductTileProps {
  product: ProductTileData;
  priority?: boolean;
}

export function ProductTile({ product, priority = false }: ProductTileProps) {
  return (
    <Link href={`/product/${product.slug}`} className={styles.tile}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={400}
          height={300}
          className={styles.image}
          priority={priority}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>

        {product.tagline && (
          <p className={styles.tagline}>{product.tagline}</p>
        )}

        {/* Specs highlights */}
        <div className={styles.specs}>
          {product.specs?.maxSpeed && (
            <span className={styles.spec}>
              <Icon name="lightning" size="xs" color="var(--secondary)" />
              {product.specs.maxSpeed} км/год
            </span>
          )}
          {product.specs?.range && (
            <span className={styles.spec}>
              <Icon name="mapPin" size="xs" color="var(--primary-light)" />
              {product.specs.range} км
            </span>
          )}
          {product.specs?.totalPower && (
            <span className={styles.spec}>
              <Icon name="lightning" size="xs" color="var(--gold-metal)" />
              {product.specs.totalPower}W
            </span>
          )}
        </div>

        <Price
          usdCents={product.priceUsdCents}
          originalUsdCents={product.originalPriceUsdCents}
          size="sm"
        />
      </div>
    </Link>
  );
}

export default ProductTile;
