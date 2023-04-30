/* eslint-disable arrow-body-style */
import * as React from 'react';
import CardList from 'components/CardList/CardList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import AddTodoModal from 'components/Modal';
import { useQuery } from '@tanstack/react-query';
import API from 'api/methods';
import { Todo } from 'types';
import DeleteTodo from './modals/DeleteTodo';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [deleteTodoId, setDeleteTodoId] = React.useState<string>('');
  const [originalTodos, setOriginalTodos] = React.useState<Todo[]>([]);
  const [originalDone, setOriginalDone] = React.useState<Todo[]>([]);
  const [originalInProgress, setOriginalInProgress] = React.useState<Todo[]>([]);
  const {
    data: todos,
    refetch: refetchTodos,
    isLoading: isLoadingTodos,
  } = useQuery<Todo[]>(['getTodos'], () => API.getTodos('todo'), {
    onSuccess: data => setOriginalTodos(data),
  });
  const {
    data: inProgress,
    refetch: refetchInProgress,
    isLoading: isLoadingInProgress,
  } = useQuery<Todo[]>(['getInProgress'], () => API.getTodos('progress'), {
    onSuccess: data => setOriginalInProgress(data),
  });

  const {
    data: done,
    refetch: refetchDone,
    isLoading: isLoadingDone,
  } = useQuery<Todo[]>(['getDone'], () => API.getTodos('done'), {
    onSuccess: data => setOriginalDone(data),
  });

  const refetchAll = async () => {
    await refetchInProgress();
    await refetchDone();
    await refetchTodos();
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [currentCardId, setCurrentCardId] = React.useState<string>('');

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    const copyTodos = [...(todos ?? [])];
    const copyInProgress = [...(inProgress ?? [])];
    const copyDone = [...(done ?? [])];

    if (!destination) return;
    if (source.index === destination.index && destination.droppableId === source.droppableId) return;
    let add = copyTodos[0];
    // Source logic
    if (source.droppableId === 'todo') {
      add = copyTodos[source.index];
      copyTodos.splice(source.index, 1);
    } else if (source.droppableId === 'progress') {
      add = copyInProgress[source.index];
      copyInProgress.splice(source.index, 1);
    } else {
      add = copyDone[source.index];
      copyDone.splice(source.index, 1);
    }

    // // Destination Logic
    if (destination.droppableId === 'todo') {
      add.status = 'todo';
      copyTodos.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'progress') {
      add.status = 'progress';
      copyInProgress.splice(destination.index, 0, add);
    } else {
      add.status = 'done';
      copyDone.splice(destination.index, 0, add);
    }

    setOriginalTodos([...copyTodos]);
    setOriginalInProgress([...copyInProgress]);
    setOriginalDone([...copyDone]);

    setDisabled(true);
    await Promise.all([API.updateTodos(copyTodos), API.updateTodos(copyInProgress), API.updateTodos(copyDone)]);
    await refetchAll();
    setDisabled(false);
  };

  const onDeleteTodo = async (todoId: string) => {
    await API.deleteTodo(todoId);
    await refetchAll();
    setOpenDelete(false);
  };

  const onClickDelete = (todoId: string) => {
    setOpenDelete(true);
    setDeleteTodoId(todoId);
  };

  const onClickCard = (cardId: string) => {
    setCurrentCardId(cardId);
    setOpen(true);
    setIsEditing(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DeleteTodo
        todoId={deleteTodoId}
        title="Delete Todo"
        onDelete={onDeleteTodo}
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
      />
      <AddTodoModal
        cardId={currentCardId}
        open={open}
        handleClose={() => {
          setOpen(false);
          setIsEditing(false);
        }}
        refetch={refetchAll}
        isEditing={isEditing}
      />
      <Container>
        <TopWrapper>
          <Title>Dashboard</Title>
        </TopWrapper>
        <Wrapper>
          <CardList
            onClickCard={onClickCard}
            onAddTodo={() => setOpen(true)}
            onClickDelete={onClickDelete}
            data={originalTodos}
            droppableId="todo"
            title="To Do"
            showButton
            disabledDrag={disabled}
            isLoading={isLoadingTodos}
          />
          <CardList
            onClickCard={onClickCard}
            onClickDelete={onClickDelete}
            data={originalInProgress}
            droppableId="progress"
            title="In progress"
            disabledDrag={disabled}
            isLoading={isLoadingInProgress}
          />
          <CardList
            onClickCard={onClickCard}
            onClickDelete={onClickDelete}
            data={originalDone ?? []}
            droppableId="done"
            title="Done"
            disabledDrag={disabled}
            isLoading={isLoadingDone}
          />
        </Wrapper>
      </Container>
    </DragDropContext>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 40px;
  padding: 20px 40px;
`;

const Title = styled.h1``;

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const TopWrapper = styled.div`
  display: flex;
  gap: 50px;
`;
