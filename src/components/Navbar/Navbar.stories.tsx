/* eslint-disable react/jsx-key */
import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';
import { ReactComponent as Profile } from 'assets/svgs/profile.svg';
import { ReactComponent as LeftArrow } from 'assets/svgs/leftArrow.svg';
import { ReactComponent as Settings } from 'assets/svgs/settings.svg';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
};

const listItemIconArray = [<Settings height={20} />, <Profile height={20} />, <LeftArrow height={20} />];

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    title: 'What to do?',
    listItems: ['Dashboard', 'Settings', 'Logout'],
    iconsArray: listItemIconArray,
  },
};
