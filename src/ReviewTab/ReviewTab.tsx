import type { ButtonHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import './ReviewTab.css';

export type ReviewTabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  /** Figma: Type. All = text label, Positive / Negative = icon + count. */
  type?: 'all' | 'positive' | 'negative';
  /** Figma: State. Selected shows the underline indicator. */
  selected?: boolean;
  /** Text for All ("All reviews"), the count for Positive / Negative ("9,900"). */
  label: string;
};

/** Figma: Components → ↳ Tab → Review Tab (716:66). */
export function ReviewTab({ type = 'all', selected = false, label, className, ...rest }: ReviewTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={['bdc-review-tab', `bdc-review-tab--${type}`, selected && 'bdc-review-tab--selected', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {type === 'all' ? (
        <span className="text-title-small-emphasis">{label}</span>
      ) : (
        <>
          <span className="bdc-review-tab__icon">
            <Icon name={type === 'positive' ? 'review-positive' : 'review-negative'} />
          </span>
          <span className="text-body-medium-emphasis">{label}</span>
        </>
      )}
    </button>
  );
}
