import { test } from "node:test";
import assert from "node:assert/strict";
import {
  REDUCTSTORE_PRICING,
  currencyForCountry,
  detectCurrency,
  formatCurrency,
  parseCurrency,
  resolveCurrency,
} from "./currency.ts";

test("euro area countries default to EUR, everything else to USD", () => {
  for (const country of ["DE", "FR", "ES", "NL", "de"]) {
    assert.equal(currencyForCountry(country), "EUR", country);
  }
  for (const country of ["US", "GB", "CH", "NO", "SE", "CA", "JP"]) {
    assert.equal(currencyForCountry(country), "USD", country);
  }
  assert.equal(currencyForCountry(undefined), "USD");
  assert.equal(currencyForCountry("XX"), "USD");
});

test("the browser time zone decides before the locale", () => {
  assert.equal(
    detectCurrency({ timeZone: "Europe/Berlin", languages: ["en-US"] }),
    "EUR",
  );
  assert.equal(
    detectCurrency({ timeZone: "Europe/London", languages: ["de-DE"] }),
    "USD",
  );
  assert.equal(
    detectCurrency({ timeZone: "Europe/Zurich", languages: ["de-CH"] }),
    "USD",
  );
  assert.equal(detectCurrency({ languages: ["fr-FR"] }), "EUR");
  assert.equal(detectCurrency({ languages: ["de"] }), "EUR");
  assert.equal(detectCurrency({ languages: ["en-GB"] }), "USD");
  assert.equal(detectCurrency({}), "USD");
});

test("URL beats a saved choice, which beats detection", () => {
  assert.equal(
    resolveCurrency({ url: "usd", saved: "EUR", detected: "EUR" }),
    "USD",
  );
  assert.equal(
    resolveCurrency({ url: null, saved: "EUR", detected: "USD" }),
    "EUR",
  );
  assert.equal(
    resolveCurrency({ url: "GBP", saved: "foo", detected: "EUR" }),
    "EUR",
  );
});

test("only EUR and USD are accepted", () => {
  for (const value of ["GBP", "CHF", "foo", "", undefined, 42]) {
    assert.equal(parseCurrency(value), undefined);
  }
  assert.equal(parseCurrency(" eur "), "EUR");
});

test("list prices are fixed per currency, not converted", () => {
  assert.deepEqual(REDUCTSTORE_PRICING, {
    EUR: { perGbMonth: 0.01, perTbMonth: 10 },
    USD: { perGbMonth: 0.012, perTbMonth: 12 },
  });
  assert.equal(formatCurrency(10, "EUR"), "€10");
  assert.equal(formatCurrency(12, "USD"), "$12");
  assert.equal(formatCurrency(0.012, "USD", 3), "$0.012");
  assert.equal(formatCurrency(21.6, "USD", 2), "$21.60");
  assert.equal(formatCurrency(142_000, "EUR"), "€142,000");
});
