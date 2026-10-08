export type Currency = "EUR" | "USD";

export const CURRENCIES: Currency[] = ["EUR", "USD"];

// Fixed commercial list prices. USD is not derived from EUR.
export const REDUCTSTORE_PRICING = {
  EUR: { perGbMonth: 0.015, perTbMonth: 15 },
  USD: { perGbMonth: 0.018, perTbMonth: 18 },
} as const;

export const REDUCTSTORE_MIN_TB = 1;

export const CURRENCY_STORAGE_KEY = "reductstore_currency";

// Euro area members, the rest of Europe that usually buys in EUR, and the
// small states that use the euro.
export const EUR_COUNTRIES = new Set([
  "AT",
  "BE",
  "HR",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES",
  "GB",
  "CH",
  "LI",
  "NO",
  "IS",
  "SE",
  "DK",
  "PL",
  "CZ",
  "HU",
  "RO",
  "BG",
  "MC",
  "AD",
  "SM",
  "VA",
  "ME",
  "XK",
]);

// Azure Static Web Apps passes no visitor country to a static page, so the
// browser time zone stands in for it.
const EUR_TIME_ZONES: Record<string, string> = {
  "Europe/Vienna": "AT",
  "Europe/Brussels": "BE",
  "Europe/Zagreb": "HR",
  "Asia/Nicosia": "CY",
  "Asia/Famagusta": "CY",
  "Europe/Nicosia": "CY",
  "Europe/Tallinn": "EE",
  "Europe/Helsinki": "FI",
  "Europe/Mariehamn": "FI",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Busingen": "DE",
  "Europe/Athens": "GR",
  "Europe/Dublin": "IE",
  "Europe/Rome": "IT",
  "Europe/Riga": "LV",
  "Europe/Vilnius": "LT",
  "Europe/Luxembourg": "LU",
  "Europe/Malta": "MT",
  "Europe/Amsterdam": "NL",
  "Europe/Lisbon": "PT",
  "Atlantic/Madeira": "PT",
  "Atlantic/Azores": "PT",
  "Europe/Bratislava": "SK",
  "Europe/Ljubljana": "SI",
  "Europe/Madrid": "ES",
  "Africa/Ceuta": "ES",
  "Atlantic/Canary": "ES",
  "Europe/London": "GB",
  "Europe/Belfast": "GB",
  "Europe/Guernsey": "GB",
  "Europe/Jersey": "GB",
  "Europe/Isle_of_Man": "GB",
  "Europe/Zurich": "CH",
  "Europe/Vaduz": "LI",
  "Europe/Oslo": "NO",
  "Arctic/Longyearbyen": "NO",
  "Atlantic/Reykjavik": "IS",
  "Europe/Stockholm": "SE",
  "Europe/Copenhagen": "DK",
  "Atlantic/Faroe": "DK",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Bucharest": "RO",
  "Europe/Sofia": "BG",
  "Europe/Monaco": "MC",
  "Europe/Andorra": "AD",
  "Europe/San_Marino": "SM",
  "Europe/Vatican": "VA",
  "Europe/Podgorica": "ME",
};

export function parseCurrency(value: unknown): Currency | undefined {
  if (typeof value !== "string") return undefined;
  const upper = value.trim().toUpperCase();
  return upper === "EUR" || upper === "USD" ? upper : undefined;
}

export function currencyForCountry(countryCode?: string): Currency {
  if (!countryCode) return "USD";
  return EUR_COUNTRIES.has(countryCode.toUpperCase()) ? "EUR" : "USD";
}

export function countryFromTimeZone(timeZone?: string): string | undefined {
  return timeZone ? EUR_TIME_ZONES[timeZone] : undefined;
}

export function countryFromLocale(locale?: string): string | undefined {
  if (!locale) return undefined;
  try {
    return new Intl.Locale(locale).maximize().region;
  } catch {
    return undefined;
  }
}

export function detectCurrency(browser: {
  timeZone?: string;
  languages?: readonly string[];
}): Currency {
  const country =
    countryFromTimeZone(browser.timeZone) ??
    (browser.timeZone ? undefined : countryFromLocale(browser.languages?.[0]));
  return currencyForCountry(country);
}

export function resolveCurrency(sources: {
  url?: unknown;
  saved?: unknown;
  detected: Currency;
}): Currency {
  return (
    parseCurrency(sources.url) ??
    parseCurrency(sources.saved) ??
    sources.detected
  );
}

const formatters = new Map<string, Intl.NumberFormat>();

export function formatCurrency(
  value: number,
  currency: Currency,
  maximumFractionDigits = 0,
): string {
  const minimumFractionDigits = Number.isInteger(value)
    ? 0
    : Math.min(2, maximumFractionDigits);
  const key = `${currency}:${minimumFractionDigits}:${maximumFractionDigits}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(currency === "EUR" ? "en-IE" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    });
    formatters.set(key, formatter);
  }
  return formatter.format(Number.isFinite(value) ? value : 0);
}

export const currencySymbol = (currency: Currency) =>
  currency === "EUR" ? "€" : "$";
