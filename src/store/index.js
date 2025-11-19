import { create } from "zustand";

export const useFontReady = create((set) => ({
  fontReady: false,
  setFontReady: () => set(() => ({ fontReady: true })),
}));
