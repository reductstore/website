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

test("Europe defaults to EUR, everything else to USD", () => {
  for (const country of [
    "DE",
    "FR",
    "ES",
    "NL",
    "de",
    "GB",
    "CH",
    "NO",
    "SE",
  ]) {
    assert.equal(currencyForCountry(country), "EUR", country);
  }
  for (const country of ["DK", "IS", "PL", "CZ", "HU", "RO", "BG", "MC"]) {
    assert.equal(currencyForCountry(country), "EUR", country);
  }
  for (const country of ["US", "CA", "JP", "TR", "RU", "UA", "AU"]) {
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
    detectCurrency({ timeZone: "America/New_York", languages: ["de-DE"] }),
    "USD",
  );
  for (const timeZone of [
    "Europe/London",
    "Europe/Zurich",
    "Europe/Oslo",
    "Europe/Stockholm",
    "Europe/Copenhagen",
    "Europe/Warsaw",
  ]) {
    assert.equal(detectCurrency({ timeZone, languages: ["en-US"] }), "EUR");
  }
  assert.equal(detectCurrency({ timeZone: "Europe/Istanbul" }), "USD");
  assert.equal(detectCurrency({ languages: ["fr-FR"] }), "EUR");
  assert.equal(detectCurrency({ languages: ["de"] }), "EUR");
  assert.equal(detectCurrency({ languages: ["en-GB"] }), "EUR");
  assert.equal(detectCurrency({ languages: ["en-US"] }), "USD");
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
    EUR: { perGbMonth: 0.015, perTbMonth: 15 },
    USD: { perGbMonth: 0.018, perTbMonth: 18 },
  });
  assert.equal(formatCurrency(15, "EUR"), "€15");
  assert.equal(formatCurrency(18, "USD"), "$18");
  assert.equal(formatCurrency(0.018, "USD", 3), "$0.018");
  assert.equal(formatCurrency(21.6, "USD", 2), "$21.60");
  assert.equal(formatCurrency(142_000, "EUR"), "€142,000");
});
