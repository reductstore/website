type EventProps = Record<string, string>;

export function track(event: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  const layer = (window as unknown as { dataLayer?: object[] }).dataLayer;
  layer?.push({ event, ...props });
}

export function bucket(value: number, edges: number[]): string {
  for (const edge of edges) {
    if (value < edge) return `<${edge}`;
  }
  return `>=${edges[edges.length - 1]}`;
}
