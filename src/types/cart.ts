export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  quantity: number;
  thumbnail: string;
  maxQuantity?: number;
  weightKg?: number;
}

export interface CartState {
  items: CartItem[];
  lastUpdated: number;
  version: number;
}

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotalUsdCents: number;
  totalWeightKg: number;
  isHydrated: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}
