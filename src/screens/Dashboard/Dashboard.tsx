/* eslint-disable arrow-body-style */
import * as React from 'react';
import CardList from 'components/CardList/CardList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import AddTodoModal from 'components/Modal';
import { useQuery } from '@tanstack/react-query';
import API from 'api/methods';
import { Todo } from 'types';
import Button from 'components/Button/Button';

const Dashboard = () => {
  const [originalTodos, setOriginalTodos] = React.useState<Todo[]>([]);
  const [originalDone, setOriginalDone] = React.useState<Todo[]>([]);
  const [originalInProgress, setOriginalInProgress] = React.useState<Todo[]>([]);
  const { data: todos, refetch: refetchTodos } = useQuery<Todo[]>(['getTodos'], () => API.getTodos('todo'), {
    onSuccess: data => setOriginalTodos(data),
  });
  const { data: inProgress, refetch: refetchInProgress } = useQuery<Todo[]>(
    ['getInProgress'],
    () => API.getTodos('progress'),
    {
      onSuccess: data => setOriginalInProgress(data),
    }
  );

  const { data: done, refetch: refetchDone } = useQuery<Todo[]>(['getDone'], () => API.getTodos('done'), {
    onSuccess: data => setOriginalDone(data),
  });

  const refetchAll = async () => {
    await refetchInProgress();
    await refetchDone();
    await refetchTodos();
  };

  const [open, setOpen] = React.useState<boolean>(false);

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
    await API.updateTodos(copyTodos);
    await API.updateTodos(copyInProgress);
    await API.updateTodos(copyDone);
    await refetchAll();
  };

  const onDeleteTodo = async (todoId: string) => {
    await API.deleteTodo(todoId);
    await refetchAll();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddTodoModal open={open} handleClose={() => setOpen(false)} refetch={refetchAll} />
      <Container>
        <TopWrapper>
          <Title>Dashboard</Title>
          <Button text="Add todo" onClick={() => setOpen(true)} />
        </TopWrapper>
        <Wrapper>
          <CardList onDeleteTodo={onDeleteTodo} data={originalTodos} droppableId="todo" title="To Do" />
          <CardList onDeleteTodo={onDeleteTodo} data={originalInProgress} droppableId="progress" title="In progress" />
          <CardList onDeleteTodo={onDeleteTodo} data={originalDone ?? []} droppableId="done" title="Done" />
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
