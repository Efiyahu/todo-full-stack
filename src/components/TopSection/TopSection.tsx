import * as React from 'react';
import styled from 'styled-components';
import Logo from 'assets/imgs/logo.png';
import Button from 'components/Button';
import API from 'api/methods';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Menu from 'components/Menu';

const TopSection = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 880px)');
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Container>
      <StyledLogo onClick={() => navigate('/dashboard')} src={Logo} alt="logo" style={{ cursor: 'pointer' }} />
      <Wrapper>{!isMobile && <Button variant="outlined" text="Log Out" onClick={() => API.logout()} />}</Wrapper>
      {isMobile && (
        <>
          <StyledBurger open={open} onClick={() => setOpen(prev => !prev)} className="nav-hamburger">
            <div />
            <div />
            <div />
          </StyledBurger>
          <Menu setOpen={setOpen} open={open} />
        </>
      )}
    </Container>
  );
};

export default TopSection;

const Container = styled.div`
  width: 100vw;
  height: 76px;
  background: ${({ theme }) => theme.colors.primary.darkBlue};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  justify-content: space-between;
  position: relative;
`;

const StyledLogo = styled.img`
  height: 40px;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledBurger = styled.button<{ open: boolean }>`
  position: absolute;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.primary.light};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
