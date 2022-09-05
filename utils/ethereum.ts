export const ethereum = () =>
  typeof window !== "undefined" ? (window as any).ethereum : null;
export const networkVersion = () =>
  ethereum() ? +ethereum().networkVersion : null;