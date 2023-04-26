/* eslint-disable react/jsx-key */
import * as React from 'react';
import Navbar from 'components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const onClickItem = (name: string) => {
    navigate(`/${name}`);
  };

  return (
    <div>
      <Navbar onClickItem={onClickItem} />
      <TopSection />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;

const Container = styled.div`
  margin-left: 100px;
  height: 100%;
`;

const TopSection = styled.div`
  width: 100vw;
  height: 76px;
  background: ${({ theme }) => theme.colors.primary.darkBlue};
  margin-bottom: 20px;
`;
