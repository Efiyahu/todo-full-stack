import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import Url from './urls';

const appServerConfig: AxiosRequestConfig = {
  baseURL: Url.AppBaseUrl,
};

const createAppAxiosInstance = () => axios.create(appServerConfig);
export const appRequest: AxiosInstance = createAppAxiosInstance();

// appRequest.interceptors.request.use(req => {
//   const token = localStorage.getItem('token');
//   if (!token) return req;
//   return {
//     ...req,
//     headers: {
//       ...(req.headers ?? {}),
//       Authorization: `Bearer ${token}`,
//     },
//   };
// });
