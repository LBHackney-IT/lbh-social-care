import { Story } from '@storybook/react';

import { AdvancedSearch } from './AdvancedSearch';

export default {
  title: 'AdvancedSearch',
  component: AdvancedSearch,
};

const Template: Story = () => <AdvancedSearch />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'AdvancedSearch',
};
