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
  onClickDelete: (todoId: string) => void;
  onAddTodo?: VoidFunction;
  showButton?: boolean;
  onClickCard: (cardId: string) => void;
  disabledDrag: boolean;
};

const CardList = ({
  title,
  droppableId = 'todo',
  data,
  onClickDelete,
  onAddTodo,
  showButton = false,
  onClickCard,
  disabledDrag,
}: Props) => (
  <MainContainer>
    <Title>
      <h5>{title}</h5>
      {showButton && <Add onClick={onAddTodo} />}
    </Title>
    <Droppable droppableId={droppableId} direction="vertical">
      {provided => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <Wrapper>
            {data?.map(({ title: todoTitle, description, date, priority, status, id }, index) => (
              <Card
                onClickCard={onClickCard}
                onClickDelete={onClickDelete}
                index={index}
                key={crypto.randomUUID()}
                title={todoTitle}
                description={description}
                priority={priority}
                date={format(new Date(date), 'MMM dd,yyyy')}
                status={status}
                id={id}
                disabledDrag={disabledDrag}
              />
            ))}
            {provided.placeholder}
          </Wrapper>
        </Container>
      )}
    </Droppable>
  </MainContainer>
);
export default CardList;

const Container = styled.div`
  max-width: 250px;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  overflow: scroll;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`;

const Title = styled.div`
  cursor: default;
  display: flex;
  width: 100%;
  min-height: 45px;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary.darkBlue};
  border-radius: 10px;
  position: sticky;
  z-index: 1;
  margin-bottom: 30px;
  top: 0;
  svg {
    transition: all 0.2s;
    :hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }
`;

const MainContainer = styled.div`
  width: 14.4%;
`;
