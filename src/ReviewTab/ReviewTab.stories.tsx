import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewTab } from './ReviewTab';

const meta: Meta<typeof ReviewTab> = {
  title: 'Components/Tabs/Review Tab',
  component: ReviewTab,
  args: { type: 'all', selected: true, label: 'All reviews' },
  argTypes: { type: { control: 'inline-radio', options: ['all', 'positive', 'negative'] } },
  parameters: {
    docs: {
      description: {
        component:
          'Single tab of the Reviews tabs bar. Type: All (text) / Positive / Negative (icon + count). Selected shows the underline indicator.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReviewTab>;

export const All: Story = {};
export const Positive: Story = { args: { type: 'positive', label: '9,900', selected: false } };
export const Negative: Story = { args: { type: 'negative', label: '82', selected: false } };

/** Type × State, like the Figma component set. */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 24, alignItems: 'end' }}>
      {[true, false].map(selected => (
        <Fragment key={String(selected)}>
          <ReviewTab type="all" label="All reviews" selected={selected} />
          <ReviewTab type="positive" label="9,900" selected={selected} />
          <ReviewTab type="negative" label="82" selected={selected} />
        </Fragment>
      ))}
    </div>
  ),
};
