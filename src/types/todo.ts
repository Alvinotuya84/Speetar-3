export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: false;
  createdAt: string;
  updatedAt: string;
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
