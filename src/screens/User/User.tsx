import * as React from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Skeleton } from '@mui/material';
import API from 'api/methods';
import Detail from 'components/Detail/Detail';
import { ReactComponent as UserSettings } from 'assets/svgs/user.svg';
import { ReactComponent as Email } from 'assets/svgs/email.svg';
import { ReactComponent as Plus } from 'assets/svgs/plus.svg';

const User = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const user = localStorage.getItem('user');
  const { id, name, email } = JSON.parse(user ?? '');
  const {
    data: userImage,
    isFetching: isFetchingUserImage,
    refetch,
  } = useQuery(['getUserImage'], () => API.getUserImage(id));

  const { mutate: updateUserImage, isLoading } = useMutation(['updateUserImage'], API.uploadImage, {
    onSuccess: refetch,
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      updateUserImage({ file, userId: id });
      setIsUploading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <UserSettings></UserSettings>
        {isFetchingUserImage || isLoading ? (
          <StyledSkeleton variant="circular" width={100} height={100} sx={{ bgcolor: 'grey.900' }} />
        ) : (
          <UserAvatar avatar={userImage?.avatar}></UserAvatar>
        )}
        <ChangeAvatar
          onMouseEnter={() => setIsUploading(true)}
          onMouseLeave={() => setIsUploading(false)}
          onClick={() => {
            // logic for uploading new avatar image goes here
          }}
        >
          <input name="image" id="image" type="file" onChange={handleUpload} />
          <PlusIcon fill="black" />
        </ChangeAvatar>
      </Wrapper>

      <Title>User settings</Title>
      <DetailsWrapper>
        <Detail label="User Name" value={name} />
        <Detail label="Email" value={email} iconStart={<Email />} />
      </DetailsWrapper>
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
  transition: all 0.5s;
`;

const Wrapper = styled.div`
  position: relative;
`;

const DetailsWrapper = styled.div`
  margin-top: 100px;
  gap: 50px;
  display: flex;
`;

const ChangeAvatar = styled.label`
  width: 100px;
  display: flex;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  left: 50px;
  bottom: -50px;
  transition: all 0.5s;
  opacity: 0;
  cursor: pointer;

  :hover {
    opacity: 1;
  }

  input[type='file'] {
    display: none;
  }
`;

const PlusIcon = styled(Plus)`
  align-self: center;
  margin: auto;
`;
