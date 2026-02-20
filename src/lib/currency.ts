/**
 * Currency utilities for HYSCO store
 * Prices stored in USD cents, displayed as UAH primary + USD secondary
 */

// Fallback exchange rate (manually updated)
const FALLBACK_USD_TO_UAH = 41.5;

let cachedRate: number | null = null;

export function getExchangeRate(): number {
  return cachedRate || FALLBACK_USD_TO_UAH;
}

export function setExchangeRate(rate: number): void {
  cachedRate = rate;
}

/**
 * Convert USD cents to UAH display string
 */
export function formatUAH(usdCents: number): string {
  const uah = (usdCents / 100) * getExchangeRate();
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(uah);
}

/**
 * Convert USD cents to USD display string
 */
export function formatUSD(usdCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usdCents / 100);
}

/**
 * Get UAH value from USD cents
 */
export function usdCentsToUAH(usdCents: number): number {
  return Math.round((usdCents / 100) * getExchangeRate());
}
