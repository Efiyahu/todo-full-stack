import Modal from 'components/Modal/Modal';
import styled from 'styled-components';

type Props = {
  title: string;
  onDelete: (todoId: string) => Promise<void>;
  onCancel: VoidFunction;
  todoId: string;
  open: boolean;
};

const DeleteTodo = ({ onDelete, onCancel, title, todoId, open }: Props) => (
  <Modal
    title={title}
    open={open}
    onClose={onCancel}
    buttons={[
      {
        variant: 'outlined',
        text: 'Cancel',
        onClick: onCancel,
      },
      {
        variant: 'contained',
        text: 'Confirm',
        onClick: () => onDelete(todoId),
      },
    ]}
    content={<Text>Are you sure you want to delete this todo?</Text>}
  />
);

export default DeleteTodo;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary.gray};
  font-size: 0.75rem;
`;
