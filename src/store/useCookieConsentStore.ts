import { create } from "zustand";

interface CookieConsentState {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  wasBannerShown: boolean;
  setBannerShown: (shown: boolean) => void;
}

const useCookieConsentStore = create<CookieConsentState>((set) => ({
  isModalOpen: false,
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  wasBannerShown: false,
  setBannerShown: (shown) => set({ wasBannerShown: shown }),
}));

export default useCookieConsentStore;
