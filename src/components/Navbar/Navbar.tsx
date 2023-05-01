import styled, { css } from 'styled-components';
import { ReactComponent as Dashboard } from 'assets/svgs/dashboard.svg';
import { ReactComponent as Calendar } from 'assets/svgs/calendar.svg';
import { ReactComponent as Settings } from 'assets/svgs/settings.svg';
import { ReactComponent as Files } from 'assets/svgs/files.svg';

type Props = {
  onClickItem: (name: string) => void;
  pathname: string;
};

const Navbar = ({ onClickItem, pathname }: Props) => (
  <Container>
    <ListWrapper>
      <ListItem active={pathname?.includes('dashboard')} onClick={() => onClickItem('dashboard')}>
        <Dashboard />
      </ListItem>
      <ListItem active={pathname?.includes('stats')} onClick={() => onClickItem('stats')}>
        <Calendar />
      </ListItem>
      <ListItem active={pathname?.includes('settings')} onClick={() => onClickItem('settings')}>
        <Settings />
      </ListItem>
      <ListItem active={pathname?.includes('files')} onClick={() => onClickItem('files')}>
        <Files />
      </ListItem>
    </ListWrapper>
  </Container>
);

export default Navbar;

const Container = styled.nav`
  width: 94px;
  background: ${({ theme }) => theme.colors.primary.darkBlue};
  height: 100vh;
  display: flex;
  position: fixed;
  margin-top: 76px;
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  list-style: none;
  padding: 0;
  margin-top: 76px;
`;

const ListItem = styled.li<{ active: boolean }>`
  margin: 20px 0;
  padding: 12px 14px;
  cursor: pointer;
  border-radius: 14px;
  border-radius: 14px;
  :hover {
    path {
      transition: all 0.5s;
      fill: ${({ theme }) => theme.colors.primary.light};
    }
  }
  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.colors.primary.lightBlue};
      path {
        transition: all 0.5s;
        box-shadow: 0px 8px 14px rgba(62, 107, 224, 0.12);
        fill: ${({ theme }) => theme.colors.primary.light};
      }
    `}
`;
