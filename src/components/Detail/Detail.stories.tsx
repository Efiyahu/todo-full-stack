import type { Meta, StoryObj } from '@storybook/react';
import Detail from './Detail';
import { ReactComponent as Email } from 'assets/svgs/email.svg';

const meta: Meta<typeof Detail> = {
  title: 'Components/Detail',
  component: Detail,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Detail>;

export const Default: Story = {
  render: args => (
    <div style={{ margin: '50px 50px' }}>
      <Detail {...args} />
    </div>
  ),
  args: {
    label: 'label',
    value: 'value',
  },
};

export const WithIcon: Story = {
  render: args => (
    <div style={{ margin: '50px 50px' }}>
      <Detail {...args} />
    </div>
  ),
  args: {
    label: 'label',
    value: 'value',
    iconStart: <Email />,
  },
};
