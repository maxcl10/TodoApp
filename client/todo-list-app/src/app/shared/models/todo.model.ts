import { Category } from './category.model';

export interface Todo {
  todoId?: number;
  title: string;
  note?: string;
  dueDate?: Date;
  prioOrder?: number;
  categoryId: number;
  category?: Category;
  statusId?: number;
  statusName?: string;
  deletedDate?: Date;
  doneDate?: Date;
  creationDate?: Date;
  isUrgent?: boolean;
}
