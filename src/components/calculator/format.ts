const decimal = (digits: number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: digits });

export function formatTb(tb: number): string {
  if (!Number.isFinite(tb) || tb <= 0) return "0 TB";
  if (tb >= 1000) return `${decimal(2).format(tb / 1000)} PB`;
  if (tb < 1) return `${decimal(3).format(tb)} TB`;
  return `${decimal(tb < 10 ? 2 : 1).format(tb)} TB`;
}

export const formatPercent = (value: number) =>
  `${Math.round(Number.isFinite(value) ? value : 0)}%`;
