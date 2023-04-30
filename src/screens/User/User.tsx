import styled, { css } from 'styled-components';
import { ReactComponent as UserSettings } from 'assets/svgs/user.svg';
import { useQuery } from '@tanstack/react-query';
import API from 'api/methods';
import { Skeleton } from '@mui/material';

const User = () => {
  const user = localStorage.getItem('user');
  const { id } = JSON.parse(user ?? '');
  const { data: userImage, isFetching: isFetchingUserImage } = useQuery(['getUserImage'], () => API.getUserImage(id));

  console.log(userImage?.avatar);

  return (
    <Container>
      <Wrapper>
        <UserSettings></UserSettings>
        {isFetchingUserImage ? (
          <StyledSkeleton variant="circular" width={100} height={100} sx={{ bgcolor: 'grey.900' }} />
        ) : (
          <UserAvatar avatar={userImage?.avatar}></UserAvatar>
        )}
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

const ImageStyles = css`
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: -50px;
  left: 50px;
`;

const StyledSkeleton = styled(Skeleton)`
  ${ImageStyles};
`;

const UserAvatar = styled.div<{ avatar: string }>`
  ${ImageStyles}
  background-image: ${({ avatar }) => `url(${avatar})`};
  border-radius: 50%;
  outline: 8px solid ${({ theme }) => theme.colors.primary.dark};
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  position: relative;
`;
