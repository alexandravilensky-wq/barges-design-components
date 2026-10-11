import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './FilterTab.css';

export type FilterTabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Figma: Breakpoint. Mobile = body/small label, Desktop = title/small label on secondary background. */
  breakpoint?: 'mobile' | 'desktop';
  label: string;
  /** Defaults to the "All" filter icon (badge-all). */
  icon?: ReactNode;
};

/** Figma: Components → ↳ Tab → Filter Tab (394:6577). */
export function FilterTab({ breakpoint = 'mobile', label, icon, className, ...rest }: FilterTabProps) {
  const desktop = breakpoint === 'desktop';
  return (
    <button
      type="button"
      className={['bdc-filter-tab', `bdc-filter-tab--${breakpoint}`, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="bdc-filter-tab__icon">{icon ?? <Icon name="badge-all" size={desktop ? 32 : 24} />}</span>
      <span className={desktop ? 'text-title-small-regular' : 'text-body-small-regular'}>{label}</span>
    </button>
  );
}
