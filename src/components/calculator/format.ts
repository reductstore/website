const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});

const decimal = (digits: number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: digits });

export function formatTb(tb: number): string {
  if (!Number.isFinite(tb) || tb <= 0) return "0 TB";
  if (tb >= 1000) return `${decimal(2).format(tb / 1000)} PB`;
  if (tb < 1) return `${decimal(3).format(tb)} TB`;
  return `${decimal(tb < 10 ? 2 : 1).format(tb)} TB`;
}

export const formatCount = (value: number) =>
  compact.format(Number.isFinite(value) ? value : 0);

export const formatPercent = (value: number) =>
  `${Math.round(Number.isFinite(value) ? value : 0)}%`;

export function formatDays(days: number): string {
  if (!Number.isFinite(days)) return "unlimited";
  if (days < 1) return `${decimal(1).format(days * 24)} hours`;
  return `${decimal(days < 10 ? 1 : 0).format(days)} days`;
}
