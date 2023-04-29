import styled, { css } from 'styled-components';
import { ReactComponent as UserSettings } from 'assets/svgs/user.svg';
import { useQuery } from '@tanstack/react-query';
import API from 'api/methods';

const User = () => {
  const user = localStorage.getItem('user');
  const { id } = JSON.parse(user ?? '');
  const { data: userImage, isLoading } = useQuery(['getUserImage'], () => API.getUserImage(id));

  console.log(userImage?.avatar);

  return (
    <Container>
      <Wrapper>
        <UserSettings></UserSettings>
        <UserAvatar avatar={userImage?.avatar}></UserAvatar>
      </Wrapper>
      <Title>User settings</Title>
    </Container>
  );
};

export default User;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const Title = styled.h2`
  margin-left: 200px;
  margin-top: 10px;
`;

const UserAvatar = styled.div<{ avatar: string }>`
  background-image: ${({ avatar }) => `url(${avatar})`};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  outline: 8px solid ${({ theme }) => theme.colors.primary.dark};
  position: absolute;
  z-index: 100;
  bottom: -50px;
  left: 50px;
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  position: relative;
`;
