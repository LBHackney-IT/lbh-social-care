import { Story } from '@storybook/react';

import { TextArea as Args } from 'components/Form/types';

import TextArea from './TextArea';

export default {
  title: 'Form Components/TextArea',
  component: TextArea,
};

const Template: Story<Args> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'TextArea',
  hint: 'hello, I am a hint :)',
  name: 'textArea',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'TextArea',
  hint: 'hello, I am a hint :)',
  name: 'textArea',
  value: 'foobar',
};

export const withError = Template.bind({});
withError.args = {
  label: 'TextArea',
  name: 'textArea',
  error: { message: 'Ops! There was an error!' },
};
