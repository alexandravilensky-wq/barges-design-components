import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterTab } from './FilterTab';

const meta: Meta<typeof FilterTab> = {
  title: 'Components/Tabs/Filter Tab',
  component: FilterTab,
  args: { label: 'Label', breakpoint: 'mobile' },
  argTypes: { breakpoint: { control: 'inline-radio', options: ['mobile', 'desktop'] } },
  parameters: {
    docs: {
      description: {
        component:
          'Filter chips use tags or descriptive words to filter content. They can be a good alternative to toggle buttons or checkboxes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FilterTab>;

export const Mobile: Story = {};
export const Desktop: Story = { args: { breakpoint: 'desktop' } };

/** Both Figma variants side by side. */
export const AllVariants: Story = {
  name: 'All variants',
  render: args => (
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start' }}>
      <FilterTab {...args} breakpoint="mobile" />
      <FilterTab {...args} breakpoint="desktop" />
    </div>
  ),
};
