/**
 * Currency utilities for HYSCO store
 * Prices stored in USD cents, displayed as UAH primary + USD secondary
 *
 * Exchange rate: fetched from Monobank → NBU → fallback at build time (SSG)
 */

const FALLBACK_USD_TO_UAH = 42.25;

let cachedRate: number | null = null;
let rateInitialized = false;

export function getExchangeRate(): number {
  return cachedRate || FALLBACK_USD_TO_UAH;
}

export function setExchangeRate(rate: number): void {
  cachedRate = rate;
}

/**
 * Fetch USD→UAH rate from Monobank API
 * Currency codes: USD=840, UAH=980
 */
async function fetchMonobankRate(): Promise<number> {
  const res = await fetch('https://api.monobank.ua/bank/currency');
  if (!res.ok) throw new Error(`Monobank API error: ${res.status}`);
  const data = await res.json();
  const usdRate = data.find(
    (r: { currencyCodeA: number; currencyCodeB: number }) =>
      r.currencyCodeA === 840 && r.currencyCodeB === 980
  );
  if (!usdRate) throw new Error('USD/UAH rate not found in Monobank response');
  return usdRate.rateSell || usdRate.rateCross || usdRate.rateBuy;
}

/**
 * Fetch USD→UAH rate from National Bank of Ukraine API
 */
async function fetchNbuRate(): Promise<number> {
  const res = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json'
  );
  if (!res.ok) throw new Error(`NBU API error: ${res.status}`);
  const data = await res.json();
  if (!data?.[0]?.rate) throw new Error('Invalid NBU API response');
  return data[0].rate;
}

/**
 * Initialize exchange rate: Monobank → NBU → fallback
 * Safe to call multiple times (caches after first success)
 */
export async function initExchangeRate(): Promise<number> {
  if (rateInitialized && cachedRate) return cachedRate;

  try {
    const rate = await fetchMonobankRate();
    setExchangeRate(rate);
    rateInitialized = true;
    console.log(`[currency] Monobank USD/UAH: ${rate}`);
    return rate;
  } catch (e) {
    console.warn('[currency] Monobank failed, trying NBU:', e);
  }

  try {
    const rate = await fetchNbuRate();
    setExchangeRate(rate);
    rateInitialized = true;
    console.log(`[currency] NBU USD/UAH: ${rate}`);
    return rate;
  } catch (e) {
    console.warn('[currency] NBU failed, using fallback:', e);
  }

  rateInitialized = true;
  return FALLBACK_USD_TO_UAH;
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
