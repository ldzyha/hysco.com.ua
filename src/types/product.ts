export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isMain?: boolean;
}

export interface ProductSpecs {
  performance?: {
    maxSpeed?: number;
    maxSpeedLimited?: number;
    range?: number;
    maxIncline?: number;
    maxLoad?: number;
  };
  motor?: {
    count?: number;
    powerPerMotor?: number;
    totalPower?: number;
    type?: 'hub' | 'belt' | 'chain';
  };
  battery?: {
    voltage?: number;
    voltageMin?: number;
    capacity?: number;
    capacityMin?: number;
    wattHours?: number;
    cells?: string;
    chargeTime?: { min: number; max: number };
    chargerSpec?: string;
    waterRating?: 'IPX4' | 'IPX5' | 'IPX6' | 'IPX7';
  };
  physical?: {
    weight?: number;
    wheelSize?: number;
    wheelType?: 'pneumatic' | 'solid' | 'tubeless';
    foldable?: boolean;
    dimensions?: { length: number; width: number; height: number };
    foldedDimensions?: { length: number; width: number; height: number };
  };
  safety?: {
    waterRating?: 'IPX4' | 'IPX5' | 'IPX6' | 'IPX7';
    brakeType?: string;
    brakePistons?: number;
    suspensionFront?: 'none' | 'spring' | 'hydraulic';
    suspensionRear?: 'none' | 'spring' | 'hydraulic';
    suspensionAdjustable?: boolean;
  };
  features?: {
    display?: boolean;
    cruiseControl?: boolean;
    nfc?: boolean;
    app?: boolean;
    rgbLeds?: boolean;
    alarm?: boolean;
    alarmWithWheelLock?: boolean;
    regenerativeBrake?: boolean;
    turnSignals?: boolean;
    dualMotorMode?: boolean;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount?: number;
  specsOverride?: Partial<ProductSpecs>;
}

export interface ProductWarranty {
  months: number;
  batteryMonths?: number;
  conditions?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  series?: string;
  model: string;
  shortDescription?: string;
  description?: string;
  categoryId: string;
  categoryIds?: string[];
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  inStock: boolean;
  stockCount?: number;
  shippingDays: number;
  preorder?: boolean;
  hidden?: boolean;
  images: ProductImage[];
  videos?: string[];
  youtubeVideoId?: string;
  variants?: ProductVariant[];
  colors?: string[];
  colorImages?: Record<string, ProductImage[]>;
  specs?: ProductSpecs;
  warranty?: ProductWarranty;
  legalNotice?: string;
  relatedProducts?: string[];
  rating?: {
    average: number;
    count: number;
  };
}

export interface ProductTileData {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  thumbnail: string;
  hoverImage?: string;
  inStock?: boolean;
  specs?: {
    maxSpeed?: number;
    range?: number;
    voltage?: number;
    capacity?: number;
    totalPower?: number;
  };
}

export interface ProductVideo {
  id: string;
  type: 'youtube';
  thumbnail?: string;
  aspectRatio?: '16/9' | '9/16' | '4/3';
}

export const productVideos: Record<string, ProductVideo[]> = {
  'teverun-supreme-7260r': [
    { id: 'o4bSzShXnhY', type: 'youtube' },
  ],
  'teverun-supreme-ultra': [
    { id: '4a2_MNi09HQ', type: 'youtube' },
  ],
  'inmotion-rs': [
    { id: '9IcBwUWQQog', type: 'youtube' },
  ],
  // Nami Burn-E MAX — keyed by actual product slug (burn-e-max)
  'burn-e-max': [
    { id: 'yoYfhevyPtI', type: 'youtube' },
  ],
  'mars-gtr-xtr': [
    { id: 'l-1Ww2ZH4-E', type: 'youtube' },
  ],
  // Kaabo Wolf King GTR — keyed by actual product slug
  'elektrosamokat-kaabo-wolf-king-gtr-seriia': [
    { id: 'qTD2sbwvLXY', type: 'youtube' },
  ],
  'tiger-king-rs': [
    { id: 'F5Q64P4nvt0', type: 'youtube' },
  ],
  'tiger-supra-pro': [
    { id: 'LTRlHErCGGU', type: 'youtube' },
  ],
  'surron-light-bee': [
    { id: 'fu8usBL9kPk', type: 'youtube' },
  ],
};
