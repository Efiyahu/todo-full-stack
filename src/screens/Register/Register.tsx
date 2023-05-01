import Input from 'components/Input/Input';
import * as React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import API from 'api/methods';

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const validationSchema = React.useMemo(
    () =>
      yup.object({
        name: yup.string().required('Name is required').min(3).max(20),
        email: yup.string().email().required('Email is required'),
        password: yup.string().min(6).required('Password is required'),
      }),
    []
  );

  const { mutate: registerUser } = useMutation(['register'], API.register, {
    onSuccess: () => {
      navigate('/login');
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = data => registerUser(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(validationSchema) });

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input error={!!errors.name} label="Name" placeholder="John Doe" {...register('name')} />
        <Input error={!!errors.email} label="Email" placeholder="example@gmail.com" {...register('email')} />
        <Input error={!!errors.password} label="Password" type="password" {...register('password')} />
        <Button type="submit" text="Submit" variant="outlined" />
      </Form>
      <div>
        <p>
          Already signed up? <StyledLink to="/login">login</StyledLink> to your account
        </p>
      </div>
    </Container>
  );
};

export default Register;

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
  gap: 30px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.light};
  font-size: 3rem;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.default} !important;
`;
