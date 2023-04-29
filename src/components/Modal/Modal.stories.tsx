/* eslint-disable react/jsx-key */
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary.gray};
  font-size: 0.875rem;
  margin-top: 4px;
  cursor: default;
`;

export const Default: Story = {
  render: args => (
    <Container>
      <Modal {...args} />
    </Container>
  ),
  args: {
    open: true,
    title: 'Generic Title',
    content: <Text>Action some action that you are going to do or get , Lorem Ipsum</Text>,
    buttons: [
      {
        text: 'Cancel',
        variant: 'outlined',
      },
      {
        text: 'Confirm',
        variant: 'contained',
      },
    ],
  },
};
