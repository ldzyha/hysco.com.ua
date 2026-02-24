'use client';

import Image from 'next/image';
import { Carousel, CarouselSlide } from '@/components/ui';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
  imageClassName?: string;
  thumbClassName?: string;
}

/**
 * Client component wrapper for the product image gallery.
 * Needed because `renderThumbnail` is a function prop and
 * can't be passed from a server component to a client component.
 */
export function ProductGallery({ images, productName, imageClassName, thumbClassName }: ProductGalleryProps) {
  const thumbnails = images.map((img) => img.url);

  return (
    <Carousel
      showThumbnails
      thumbnails={thumbnails}
      showDots={false}
      loop
      renderThumbnail={(src) => (
        <Image
          src={src}
          alt=""
          width={80}
          height={60}
          className={thumbClassName}
          unoptimized
        />
      )}
    >
      {images.map((image, index) => (
        <CarouselSlide key={index}>
          <Image
            src={image.url}
            alt={image.alt || `${productName} - зображення ${index + 1}`}
            width={600}
            height={450}
            className={imageClassName}
            priority={index === 0}
          />
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
