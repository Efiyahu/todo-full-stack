import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menu = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden}>
      <Link onClick={() => setOpen(false)} to="/dashboard" tabIndex={tabIndex}>
        Dashbaord
      </Link>
      <Link onClick={() => setOpen(false)} to="/settings" tabIndex={tabIndex}>
        Settings
      </Link>
      <Link onClick={() => setOpen(false)} to="/stats" tabIndex={tabIndex}>
        Stats
      </Link>
    </StyledMenu>
  );
};

export default Menu;

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.dark};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  width: 100vw;
  z-index: 2;
  a {
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.colors.primary.light};
    text-decoration: none;
    transition: color 0.3s linear;
    font-size: 1.5rem;
    text-align: center;
    &:hover {
      color: ${({ theme }) => theme.colors.primary.gray};
    }
  }
`;
