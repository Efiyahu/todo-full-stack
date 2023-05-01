/* eslint-disable react/jsx-key */
import type { Meta, StoryObj } from '@storybook/react';
import Menu from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    open: true,
  },
};
