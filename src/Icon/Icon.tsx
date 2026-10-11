import { useBrand, type Brand } from '../brand';
import './Icon.css';

// Icons come from the installed barges-design-tokens package. Add a name here when a component needs it.
const files = import.meta.glob<string>(
  '/node_modules/barges-design-tokens/icons/*/{badge-all,review-positive,review-negative}.svg',
  { query: '?raw', import: 'default', eager: true },
);

export type IconName = 'badge-all' | 'review-positive' | 'review-negative';

const svgFor = (brand: Brand, name: IconName) =>
  files[`/node_modules/barges-design-tokens/icons/${brand}/${name}.svg`] ??
  // Not every brand has every icon yet (e.g. Purple Ocean reviews); fall back to Purple Garden.
  files[`/node_modules/barges-design-tokens/icons/purple-garden/${name}.svg`];

type IconProps = {
  name: IconName;
  /** Size in px. Icons are drawn on a 24px grid. */
  size?: number;
  className?: string;
};

/** Brand icon. Colored with `currentColor`, so set `color` on it or its parent. */
export function Icon({ name, size = 24, className }: IconProps) {
  const brand = useBrand();
  return (
    <span
      aria-hidden
      className={['bdc-icon', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgFor(brand, name) ?? '' }}
    />
  );
}
