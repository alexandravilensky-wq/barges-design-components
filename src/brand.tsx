import { createContext, useContext, type ReactNode } from 'react';

export type Brand = 'purple-garden' | 'kasamba' | 'psiquicos' | 'purple-ocean';

const BrandContext = createContext<Brand>('purple-garden');

/** Picks which brand's icons components render. Colors and fonts come from the brand CSS file. */
export function BrandProvider({ brand, children }: { brand: Brand; children: ReactNode }) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export const useBrand = () => useContext(BrandContext);
