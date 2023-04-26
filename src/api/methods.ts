import { TodoFormValues } from 'components/Modal/AddTodoModal';
import { Todo, User } from 'types';
import { appRequest, todoRequest } from './client';
import Url from './urls';
const API = {
  register: (data: User) => appRequest.post(Url.REGISTER, data),
  login: (data: Partial<User>) => appRequest.post(Url.LOGIN, data),
  logout: () => {
    localStorage.clear();
    window.location.href = '/';
  },
  addTodo: async (data: TodoFormValues) => {
    await todoRequest.post('/', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
  getTodos: (status: 'todo' | 'progress' | 'done') =>
    todoRequest
      .get('/', {
        params: {
          status,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => res.data.todos),
  updateTodos: (todos: Todo[]) =>
    todoRequest.patch(
      '/',
      { todos: todos },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    ),
  deleteTodo: async (todoId: string) =>
    todoRequest.delete(`/${todoId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }),
};

export default API;
