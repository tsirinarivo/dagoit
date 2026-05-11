"use client";

import { create } from "zustand";

type UIStore = {
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;

  currency: "ar" | "eur" | "usd";
  setCurrency: (currency: "ar" | "eur" | "usd") => void;

  pricingBillingPeriod: "monthly" | "annual";
  setPricingBillingPeriod: (period: "monthly" | "annual") => void;
};

export const useUIStore = create<UIStore>((set) => ({
  mobileNavOpen: false,
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleMobileNav: () =>
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),

  currency: "ar",
  setCurrency: (currency) => set({ currency }),

  pricingBillingPeriod: "monthly",
  setPricingBillingPeriod: (pricingBillingPeriod) =>
    set({ pricingBillingPeriod }),
}));
