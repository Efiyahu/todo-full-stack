/* eslint-disable react/jsx-key */
import * as React from 'react';
import Navbar from 'components/Navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopSection from 'components/TopSection/TopSection';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClickItem = (name: string) => {
    navigate(`/${name}`);
  };

  return (
    <div>
      <Navbar pathname={pathname} onClickItem={onClickItem} />
      <TopSection />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;

const Container = styled.div`
  margin-left: 100px;
  height: 100%;

  @media screen and (max-width: 880px) {
    margin-left: 0;
  }
`;
