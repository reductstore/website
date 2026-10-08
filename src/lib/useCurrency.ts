import { useSyncExternalStore } from "react";
import {
  CURRENCY_STORAGE_KEY,
  type Currency,
  detectCurrency,
  resolveCurrency,
} from "./currency";

const SERVER_CURRENCY: Currency = "USD";

let current: Currency | undefined;
const listeners = new Set<() => void>();

function readSaved(): string | null {
  try {
    return window.localStorage.getItem(CURRENCY_STORAGE_KEY);
  } catch {
    return null;
  }
}

function initial(): Currency {
  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timeZone = undefined;
  }
  return resolveCurrency({
    url: new URLSearchParams(window.location.search).get("currency"),
    saved: readSaved(),
    detected: detectCurrency({ timeZone, languages: navigator.languages }),
  });
}

const getSnapshot = () => (current ??= initial());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function setCurrency(currency: Currency) {
  current = currency;
  try {
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {
    // The choice still applies to this visit.
  }
  listeners.forEach((listener) => listener());
}

export default function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_CURRENCY);
}
