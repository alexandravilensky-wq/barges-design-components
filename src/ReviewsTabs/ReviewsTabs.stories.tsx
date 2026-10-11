import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewsTabs, type ReviewsFilter } from './ReviewsTabs';

const meta: Meta<typeof ReviewsTabs> = {
  title: 'Components/Tabs/Reviews Tabs',
  component: ReviewsTabs,
  args: { selected: 'all', positiveCount: '9,900', negativeCount: '82' },
  argTypes: { selected: { control: 'inline-radio', options: ['all', 'positive', 'negative'] } },
  decorators: [Story => <div style={{ width: 375 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ReviewsTabs>;

export const AllReviews: Story = { name: 'All reviews' };
export const Positive: Story = { args: { selected: 'positive' } };
export const Negative: Story = { args: { selected: 'negative' } };

/** Click the tabs: the underline moves. */
export const Interactive: Story = {
  render: args => {
    const [selected, setSelected] = useState<ReviewsFilter>('all');
    return <ReviewsTabs {...args} selected={selected} onChange={setSelected} />;
  },
};
