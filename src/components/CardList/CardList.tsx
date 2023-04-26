import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from 'components/Card/Card';
import { format } from 'date-fns';
import { Todo } from 'types';
import { ReactComponent as Add } from 'assets/svgs/add.svg';

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
        <Title>
          <h5>{title}</h5>
          <Add />
        </Title>
        {data?.map(({ title: todoTitle, description, date, priority, status, id }, index) => (
          <Card
            onDeleteTodo={onDeleteTodo}
            index={index}
            key={crypto.randomUUID()}
            title={todoTitle}
            description={description}
            priority={priority}
            date={format(new Date(date), 'MMM dd,yyyy')}
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
  max-width: 250px;
  width: 30%;
  height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
  overflow: overlay;
  align-items: center;
  padding-bottom: 30px;
`;

const Title = styled.div`
  cursor: default;
  display: flex;
  width: 100%;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary.darkBlue};
  border-radius: 10px;
`;
