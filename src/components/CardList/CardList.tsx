import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from 'components/Card/Card';
import { format } from 'date-fns';
import { Todo } from 'types';
import { ReactComponent as Add } from 'assets/svgs/add.svg';
import { CircularProgress } from '@mui/material';

type Props = {
  title: string;
  droppableId: string;
  data: Todo[] | [];
  onClickDelete: (todoId: string) => void;
  onAddTodo?: VoidFunction;
  showButton?: boolean;
  onClickCard: (cardId: string) => void;
  disabledDrag: boolean;
  isLoading: boolean;
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
  isLoading,
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
            {isLoading ? (
              <CircularProgress style={{ alignSelf: 'center' }} />
            ) : (
              data?.map(({ title: todoTitle, description, date, priority, status, id, fullDescription }, index) => (
                <Card
                  onClickCard={onClickCard}
                  onClickDelete={onClickDelete}
                  index={index}
                  key={Date.now() * 10 + Math.floor(Math.random() * 100000)}
                  title={todoTitle}
                  description={description}
                  priority={priority}
                  date={format(new Date(date), 'MMM dd,yyyy')}
                  status={status}
                  id={id}
                  disabledDrag={disabledDrag}
                  fullDescription={fullDescription}
                />
              ))
            )}
            {provided.placeholder}
          </Wrapper>
        </Container>
      )}
    </Droppable>
  </MainContainer>
);
export default CardList;

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  overflow: scroll;
  padding-right: 10px;
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
  width: 94.1%;
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
  width: 15.9%;
`;
