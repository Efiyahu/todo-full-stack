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
            maxHeight: 150,
            boxSizing: 'border-box',
            background: '#1E1F25',
            borderRadius: '10px',
          },
        }}
      >
        <MuiCard>
          <StyledCardContent>
            <StyledDeleteIcon onClick={() => onDeleteTodo(id)} stroke="lightgray" fill="lightgray" />
            <Priority priority={priority}>{priority}</Priority>
            <TextWrapper>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </TextWrapper>

            <Wrapper>
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
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary.light};
  font-weight: 600;
`;

const Date = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary.light};
  font-weight: 500;
  padding: 0 5px;
`;
const Description = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary.gray};
`;

const Priority = styled.span<{ priority: 'High' | 'Low' | 'Medium' }>`
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary.light};
  background: ${({ theme, priority }) => theme.priority[priority]};
  padding: 5px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 16px;
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
