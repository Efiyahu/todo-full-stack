/* eslint-disable react/jsx-key */
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import { Divider, List as MuiList, Toolbar as MuiToolbar } from '@mui/material';
import ListItem from 'components/ListItem/ListItem';

const drawerWidth = 240;

type Props = {
  title: string;
  listItems: string[];
  iconsArray?: JSX.Element[];
  onClickItem: (text: string) => void;
};

const Navbar = ({ title, listItems, iconsArray, onClickItem }: Props) => (
  <Box sx={{ display: 'flex' }}>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          height: '90%',
          maxHeight: '800px',
          boxSizing: 'border-box',
          margin: '10px',
          borderRadius: '20px',
          background: '#2E384E',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <Toolbar>
          <h4>{title}</h4>
        </Toolbar>
        <Divider sx={{ background: '#eee' }} />
        {listItems.map((text, index) => (
          <ListItem onClick={() => onClickItem(text)} text={text} icon={iconsArray?.[index]} />
        ))}
      </List>
    </Drawer>
  </Box>
);

export default Navbar;

const List = styled(MuiList)`
  margin-top: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .MuiListItem-root {
    transition: all 1s;
    .MuiButtonBase-root {
      display: flex;
      align-items: center;
    }
    color: ${({ theme }) => theme.colors.primary.light};
    .MuiListItemIcon-root {
      padding-left: 20px;
    }

    :hover {
      background-color: none;
      .MuiListItemText-root,
      .MuiListItemIcon-root {
        transition: all 0.3s ease-in-out;
        transform: translateX(5px);
      }
    }
  }
`;

const Toolbar = styled(MuiToolbar)`
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary.light};
    cursor: default;
  }
`;
