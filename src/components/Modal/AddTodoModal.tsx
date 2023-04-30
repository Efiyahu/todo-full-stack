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
import { useMutation, useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

type Props = {
  open: boolean;
  isEditing: boolean;
  handleClose: VoidFunction;
  refetch: () => Promise<void>;
  cardId: string;
};

export interface TodoFormValues extends FieldValues {
  title: string;
  description: string;
  fullDescription?: string;
  priority?: Priority;
  status?: Status;
}

const AddTodoModal = ({ open, handleClose, refetch, isEditing, cardId }: Props) => {
  const { data: cardData, isFetching: isLoadingCard } = useQuery<TodoFormValues>(
    ['getTodo'],
    () => API.getTodo(cardId),
    {
      enabled: isEditing,
    }
  );

  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(['updateTodo'], API.updateTodo);
  const onSubmit: SubmitHandler<TodoFormValues> = async data => {
    for (const value in data) {
      if (data[value as keyof TodoFormValues] === '') delete data[value as keyof TodoFormValues];
    }
    if (isEditing) {
      update({ updatedTodo: data, todoId: cardId });
    } else {
      await API.addTodo(data);
    }
    await refetch();
    handleClose();
    reset();
  };

  console.log(cardId);

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

  React.useEffect(() => {
    if (cardData && isEditing) {
      reset(cardData);
    } else if (!isEditing) {
      reset({
        priority: 'Low',
        status: 'todo',
      });
    }
  }, [cardData, reset, isEditing]);

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
          {isLoadingCard || isLoadingUpdate ? (
            <CircularProgress />
          ) : (
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
                value={cardData?.status}
              />
              <Input
                className="multiline-todo"
                {...register('fullDescription')}
                label="Full Description"
                error={!!errors.fullDescription}
                helperText={errors.fullDescription?.message}
                multiline
                rows={4}
              />
            </FormWrapper>
          )}
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

  .multiline-todo {
    width: 100% !important;

    .MuiInputBase-root {
      width: 100%;
    }
  }
`;
