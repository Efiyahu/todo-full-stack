import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as Home } from 'assets/svgs/home.svg';
import styled from 'styled-components';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const List: Story = {
  render: args => (
    <Container>
      <Button {...args} variant="contained" />
      <Button {...args} variant="outlined" />
      <Button {...args} variant="text" />
      <Button {...args} variant="text" startIcon={<Home />} />
      <Button {...args} variant="text" endIcon={<Home />} />
    </Container>
  ),
  args: {
    text: 'Button',
    type: 'button',
  },
};

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;
