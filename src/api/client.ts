import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import Url from './urls';

const appServerConfig: AxiosRequestConfig = {
  baseURL: Url.AppBaseUrl,
};

const createAppAxiosInstance = () => axios.create(appServerConfig);
export const appRequest: AxiosInstance = createAppAxiosInstance();

const todoServerConfig: AxiosRequestConfig = {
  baseURL: Url.TodoBaseUrl,
};

const createTodoAxiosInstance = () => axios.create(todoServerConfig);
export const todoRequest: AxiosInstance = createTodoAxiosInstance();
