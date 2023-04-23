import { Navigate } from 'react-router-dom';
import { User } from 'types';
import { appRequest } from './client';
import Url from './urls';
const API = {
  register: (data: User) => appRequest.post(Url.REGISTER, data),
  login: (data: Partial<User>) => appRequest.post(Url.LOGIN, data),
  logout: () => {
    localStorage.clear();
    window.location.href = '/';
  },
};

export default API;
