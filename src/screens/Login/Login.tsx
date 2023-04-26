import Input from 'components/Input/Input';
import * as React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import API from 'api/methods';
import { useIsLoggedIn } from 'hooks/useIsLoggedIn';

interface LoginError {
  response: {
    data: {
      msg: string;
    };
  };
}

const Login = () => {
  const navigate = useNavigate();
  useIsLoggedIn();

  const validationSchema = React.useMemo(
    () =>
      yup.object({
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(6).required('Password is required'),
      }),
    []
  );

  const {
    mutate: loginUser,
    error,
  }: UseMutationResult<unknown, LoginError, Partial<User>> = useMutation(['register'], API.login, {
    onSuccess: data => {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      navigate('/dashboard');
    },
  });

  const onSubmit: SubmitHandler<Partial<User>> = data => loginUser(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(validationSchema) });

  console.log(errors);

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email"
          placeholder="example@gmail.com"
          {...register('email')}
        />
        <Input
          error={!!errors.password}
          label="Password"
          type="password"
          helperText={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" text="Submit" variant="outlined" />
      </Form>
      <div>
        <p>
          No account yet? <StyledLink to="/register">register</StyledLink> as new user
        </p>
      </div>
      {error && <ErrorMessage>{error?.response.data.msg}</ErrorMessage>}
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 500px;
  height: 480px;
  margin: 200px auto;
  background-color: rgb(48, 50, 59);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 20px;
  cursor: default;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.light};
  font-size: 3rem;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.default} !important;
`;

const ErrorMessage = styled.span`
  background-color: rgba(255, 15, 30, 0.3);
  padding: 5px 20px;
  border-radius: 10px;
  border: 1px solid rgb(255, 15, 30);
`;
