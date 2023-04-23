/* eslint-disable react/jsx-key */
import * as React from 'react';
import Navbar from 'components/Navbar/Navbar';
import { ReactComponent as Profile } from 'assets/svgs/profile.svg';
import { ReactComponent as LeftArrow } from 'assets/svgs/leftArrow.svg';
import { ReactComponent as Settings } from 'assets/svgs/settings.svg';
import { useNavigate } from 'react-router-dom';
import API from 'api/methods';

const listItemIconArray = [<Settings height={20} />, <Profile height={20} />, <LeftArrow height={20} />];

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const onClickItem = (text: string) => {
    if (text !== 'Logout') {
      navigate(`/${text.toLowerCase()}`);
    } else {
      API.logout();
    }
  };

  return (
    <div>
      <Navbar
        onClickItem={onClickItem}
        title="What to do?"
        iconsArray={listItemIconArray}
        listItems={['Dashboard', 'Settings', 'Logout']}
      />
      {children}
    </div>
  );
};

export default Layout;
