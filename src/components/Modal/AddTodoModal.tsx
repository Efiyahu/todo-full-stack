import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import Button from 'components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from 'api/methods';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  refetch: () => Promise<void>;
};

export interface TodoFormValues {
  title: string;
  description: string;
  priority?: 'Low' | 'Medium' | 'High';
  status?: 'todo' | 'progress' | 'done';
}

const AddTodoModal = ({ open, handleClose, refetch }: Props) => {
  const onSubmit: SubmitHandler<TodoFormValues> = async data => {
    for (const value in data) {
      if (data[value as keyof TodoFormValues] === '') delete data[value as keyof TodoFormValues];
    }
    await API.addTodo(data);
    await refetch();
    handleClose();
  };

  const validationSchema = React.useMemo(
    () =>
      yup.object({
        title: yup.string().required('Title is required').min(3).max(20),
        description: yup.string().required('Description is required'),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({ resolver: yupResolver(validationSchema) });

  return (
    <Modal
      sx={{ outline: 'none' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Title>Add new Todo</Title>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
          <Input
            {...register('description')}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Input {...register('priority')} label="Priority" />
          <Input {...register('status')} label="Status" />
          <ButtonContainer>
            <Button variant="outlined" text="Cancel" onClick={handleClose} />
            <Button variant="contained" text="Save" type="submit" />
          </ButtonContainer>
        </FormWrapper>
      </Container>
    </Modal>
  );
};

export default AddTodoModal;

const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  background: #2e384e;
  box-shadow: 24;
  outline: none;
  padding: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary.light};
  margin-bottom: 30px;
`;

const FormWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;
