import * as React from 'react';
import { Modal as MuiModal } from '@mui/material';
import styled from 'styled-components';
import Button, { ButtonProps } from 'components/Button/Button';

interface Props {
  open: boolean;
  title?: React.ReactNode;
  onClose: VoidFunction;
  buttons?: ButtonProps[];
  asForm?: boolean;
  content: React.ReactNode;
  modalStyles?: React.CSSProperties;
  containerStyles?: React.CSSProperties;
  onSubmitForm?: VoidFunction;
}

const Modal = ({ open, title, asForm, content, modalStyles, buttons, containerStyles, onSubmitForm }: Props) => {
  console.log({ buttons, containerStyles, open, title, asForm, content });
  return (
    <MuiModal open={open} sx={modalStyles}>
      <Container style={containerStyles}>
        {Boolean(title) && <Title>{title}</Title>}
        <Wrapper as={asForm ? 'form' : 'div'} onSubmit={onSubmitForm}>
          {content}
          {Boolean(buttons?.length) && (
            <ButtonContainer>
              {buttons?.map(button => (
                <Button {...button} key={crypto.randomUUID()} />
              ))}
            </ButtonContainer>
          )}
        </Wrapper>
      </Container>
    </MuiModal>
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: ${({ theme }) => theme.colors.primary.dark};
  outline: none;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const Title = styled.h5`
  color: ${({ theme }) => theme.colors.primary.light};
  font-size: 1.125rem;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;
