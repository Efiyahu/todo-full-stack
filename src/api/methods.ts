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

  getUserImage: async (userId: string) =>
    appRequest
      .get(`/user-image/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => res.data),

  getTodo: async (todoId: string) =>
    todoRequest
      .get(`/${todoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => res.data.todo),
  updateTodo: async ({ updatedTodo, todoId }: { updatedTodo: TodoFormValues; todoId: string }) =>
    todoRequest
      .patch(
        `/${todoId}`,
        { ...updatedTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(res => res.data),
  uploadImage: async ({ file, userId }: { file: File; userId: string }) => {
    const formData = new FormData();
    formData.append('myFile', file);
    const response = await appRequest.patch(`/upload/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': file.type,
        'Content-Length': `${file.size}`,
      },
    });
    return response.data;
  },
};

export default API;
