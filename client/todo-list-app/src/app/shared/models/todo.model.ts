export interface Todo {
  todoId?: number;
  title: string;
  note?: string;
  dueDate?: Date;
  prioOrder?: number;
  statusId?: number;
  categoryId: number;
  categoryName?: string;
  categoryShortName?: string;
  statusName?: string;
  deletedDate?: Date;
  doneDate?: Date;
  creationDate?: Date;
  isUrgent?: boolean;
}
