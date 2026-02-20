/**
 * API endpoint configuration
 * In production, these point to Firebase Functions
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ENDPOINTS = {
  callback: `${BASE_URL}/api/callback`,
  orders: `${BASE_URL}/api/orders`,
  novaPoshta: `${BASE_URL}/api/nova-poshta`,
  exchangeRate: `${BASE_URL}/api/exchange-rate`,
} as const;
