export type User = {
  name: string;
  email: string;
  password: string;
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'progress' | 'done';
  priority: 'High' | 'Low' | 'Medium';
  date: string;
  order: number;
};
