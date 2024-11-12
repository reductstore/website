export {};

declare global {
  interface Window {
    _paq: any[];
    revisitCkyConsent: () => void;
  }
}
