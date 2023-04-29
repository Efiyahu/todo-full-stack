import * as React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from 'api/methods';
import Modal from './Modal';
import Select from 'components/Select/Select';
import { Priority, Status } from 'types';

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  refetch: () => Promise<void>;
};

export interface TodoFormValues extends FieldValues {
  title: string;
  description: string;
  priority?: Priority;
  status?: Status;
}

const AddTodoModal = ({ open, handleClose, refetch }: Props) => {
  const onSubmit: SubmitHandler<TodoFormValues> = async data => {
    for (const value in data) {
      if (data[value as keyof TodoFormValues] === '') delete data[value as keyof TodoFormValues];
    }
    await API.addTodo(data);
    await refetch();
    handleClose();
    reset();
  };

  const validationSchema = React.useMemo(
    () =>
      yup.object({
        title: yup.string().required('Title is required').min(3).max(20),
        description: yup.string().min(6).required('Description is required'),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TodoFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      priority: 'Low',
      status: 'todo',
    },
  });

  return (
    <Modal
      modalStyles={{ outline: 'none' }}
      open={open}
      onClose={() => {
        handleClose();
        reset();
      }}
      title="Add Todo"
      asForm
      onSubmitForm={handleSubmit(onSubmit)}
      buttons={[
        {
          variant: 'outlined',
          text: 'Cancel',
          onClick: () => {
            handleClose();
            reset();
          },
        },
        {
          variant: 'contained',
          text: 'Confirm',
          type: 'submit',
        },
      ]}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      containerStyles={{
        width: 700,
      }}
      content={
        <>
          <FormWrapper>
            <Input label="Title" {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
            <Input
              {...register('description')}
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Select
              autoWidth={false}
              multiple={false}
              native={false}
              data={['Low', 'Medium', 'High']}
              {...register('priority')}
              label="Priority"
              control={control}
            />
            <Select
              control={control}
              autoWidth={false}
              multiple={false}
              native={false}
              data={['todo', 'progress', 'done']}
              {...register('status')}
              label="Status"
            />
          </FormWrapper>
        </>
      }
    />
  );
};

export default AddTodoModal;

const FormWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;
