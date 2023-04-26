import { Box, Card as MuiCard, CardContent } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Todo } from 'types';
import { ReactComponent as Delete } from 'assets/svgs/delete.svg';

type Props = {
  index: number;
  onDeleteTodo: (todoId: string) => void;
} & Omit<Todo, 'order'>;

const Card = ({ index, title, description, priority, date, id, onDeleteTodo }: Props) => (
  <Draggable draggableId={id} index={index}>
    {provided => (
      <Box
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        sx={{
          maxWidth: 275,
          width: '100%',
          '& .MuiPaper-root': {
            height: 150,
            boxSizing: 'border-box',
          },
        }}
      >
        <MuiCard>
          <StyledCardContent>
            <StyledDeleteIcon onClick={() => onDeleteTodo(id)} stroke="lightgray" fill="lightgray" />
            <TextWrapper>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </TextWrapper>

            <Wrapper>
              <Priority priority={priority}>{priority}</Priority>
              <Date>{date?.toString()}</Date>
            </Wrapper>
          </StyledCardContent>
        </MuiCard>
      </Box>
    )}
  </Draggable>
);
export default Card;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
  position: relative;
`;

const Title = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Date = styled.p``;
const Description = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  color: #292929;
`;

const Priority = styled.span<{ priority: 'High' | 'Low' | 'Medium' }>`
  background: ${({ theme, priority }) => theme.priority[priority]};
  padding: 5px 15px;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #eee;
    top: -10px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const StyledDeleteIcon = styled(Delete)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  height: 16px;
  padding: 0 5px;

  :hover {
    opacity: 0.8;
  }
`;
