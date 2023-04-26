import type { Meta, StoryObj } from '@storybook/react';
import CardList from './CardList';

const meta: Meta<typeof CardList> = {
  title: 'Components/CardList',
  component: CardList,
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const Default: Story = {
  args: {
    title: 'Todo',
    showButton: true,
  },
};
