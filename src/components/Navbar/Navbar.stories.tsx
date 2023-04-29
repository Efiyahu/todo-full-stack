/* eslint-disable react/jsx-key */
import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  argTypes: {
    pathname: {
      options: ['dashboard', 'settings', 'files', 'calendar'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    pathname: 'dashboard',
  },
};
