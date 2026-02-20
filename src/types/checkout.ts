export type DeliveryMethod = 'nova-poshta-branch' | 'nova-poshta-courier';
export type PaymentMethod = 'cod';

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface NovaPoshtaCity {
  ref: string;
  name: string;
  region?: string;
}

export interface NovaPoshtaWarehouse {
  ref: string;
  number: string;
  description: string;
  shortAddress?: string;
  typeDescription?: string;
  maxWeightKg?: number;
}

export interface DeliveryInfo {
  method: DeliveryMethod;
  city: NovaPoshtaCity | null;
  warehouse: NovaPoshtaWarehouse | null;
}

export interface CheckoutFormData {
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  comment?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  priceUsdCents: number;
  quantity: number;
  thumbnail: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  subtotalUsdCents: number;
  shippingUsdCents: number;
  totalUsdCents: number;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';
