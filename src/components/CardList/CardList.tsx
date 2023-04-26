import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from 'components/Card/Card';
import { format } from 'date-fns';
import { Todo } from 'types';

type Props = {
  title: string;
  droppableId: string;
  data: Todo[] | [];
  onDeleteTodo: (todoId: string) => void;
};

const CardList = ({ title, droppableId = 'todo', data, onDeleteTodo }: Props) => (
  <Droppable droppableId={droppableId}>
    {provided => (
      <Container ref={provided.innerRef} {...provided.droppableProps}>
        <Title>{title}</Title>
        {data?.map(({ title: todoTitle, description, date, priority, status, id }, index) => (
          <Card
            onDeleteTodo={onDeleteTodo}
            index={index}
            key={crypto.randomUUID()}
            title={todoTitle}
            description={description}
            priority={priority}
            date={format(new Date(date), 'dd/mm/yy')}
            status={status}
            id={id}
          />
        ))}
        {provided.placeholder}
      </Container>
    )}
  </Droppable>
);
export default CardList;

const Container = styled.div`
  background-color: rgba(192, 192, 192, 0.2);
  width: 300px;
  border-radius: 10px;
  height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
  overflow: overlay;
  align-items: center;
  padding-bottom: 30px;
`;

const Title = styled.h2`
  color: #eee;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 10px 0;
  background-color: #292929;
  text-align: center;
  z-index: 2;
`;
