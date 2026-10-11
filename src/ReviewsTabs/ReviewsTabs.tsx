import { ReviewTab } from '../ReviewTab/ReviewTab';
import './ReviewsTabs.css';

export type ReviewsFilter = 'all' | 'positive' | 'negative';

export type ReviewsTabsProps = {
  /** Figma: Reviews. Which tab is underlined. */
  selected?: ReviewsFilter;
  onChange?: (filter: ReviewsFilter) => void;
  allLabel?: string;
  /** Already formatted, e.g. "9,900". */
  positiveCount: string;
  negativeCount: string;
  className?: string;
};

/** Figma: Components → ↳ Tab → Reviews Tabs (421:10925). */
export function ReviewsTabs({
  selected = 'all',
  onChange,
  allLabel = 'All reviews',
  positiveCount,
  negativeCount,
  className,
}: ReviewsTabsProps) {
  const tab = (type: ReviewsFilter, label: string) => (
    <ReviewTab
      type={type}
      label={label}
      selected={selected === type}
      onClick={() => onChange?.(type)}
      className={type === 'all' ? 'bdc-reviews-tabs__all' : undefined}
    />
  );
  return (
    <div role="tablist" className={['bdc-reviews-tabs', className].filter(Boolean).join(' ')}>
      {tab('all', allLabel)}
      {tab('positive', positiveCount)}
      {tab('negative', negativeCount)}
    </div>
  );
}
