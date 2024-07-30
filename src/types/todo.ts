export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: false;
  createdAt: string;
  updatedAt: string;
  onPress?: () => void;
};
export interface TodoResponse {
  data: Todo[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface CreateToDoResponse {
  data: {
    title: string;
    description: string;
    completed: false;
    user: {
      id: 1;
      username: string;
    };
    id: 7;
    createdAt: string;
    updatedAt: string;
  };
  success: boolean;
}
export interface EditTaskResponse {
  data: {
    id: number;
    title: string;
    description: string;
    completed: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  success: boolean;
}
