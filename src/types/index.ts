export type User = {
  name: string;
  email: string;
  password: string;
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  date: string;
  order: number;
};

export type Status = 'todo' | 'progress' | 'done';
export type Priority = 'High' | 'Low' | 'Medium';
