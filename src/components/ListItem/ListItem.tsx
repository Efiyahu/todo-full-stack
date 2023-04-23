import { ListItem as MuiListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type Props = {
  icon?: JSX.Element;
  text: string;
  onClick: VoidFunction;
};

const ListItem = ({ icon, text, onClick }: Props) => (
  <MuiListItem key={text} disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </MuiListItem>
);

export default ListItem;
