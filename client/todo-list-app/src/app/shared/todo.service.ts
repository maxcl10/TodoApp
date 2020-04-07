import { Injectable } from '@angular/core';
import { Todo } from './models/todo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observer, Observable } from 'rxjs';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'https://localhost:5001/api/';

  addTodo(title: string, categoryId: number): Observable<Todo> {
    const url = this.baseUrl + 'todos';
    return this.httpClient.post<Todo>(url, new Todo(title, categoryId));
  }

  saveTodo(todo: Todo): Observable<Todo> {
    const url = this.baseUrl + 'todos/' + todo.todoId;
    return this.httpClient.put<Todo>(url, todo);
  }

  deleteTodo(todoId: number): Observable<Todo> {
    const url = this.baseUrl + 'todos/' + todoId;
    return this.httpClient.delete<Todo>(url);
  }

  getTodos(excludeDone: boolean, excludeDeleted: boolean): Observable<Todo[]> {
    const url = this.baseUrl + 'todos';

    const params = new HttpParams()
      .append('excludeDone', excludeDone ? 'true' : 'false')
      .append('excludeDeleted', excludeDeleted ? 'true' : 'false');
    return this.httpClient.get<Todo[]>(url, { params });
  }

  getTodosByCategory(
    category: string,
    excludeDone: boolean,
    excludeDeleted: boolean
  ): Observable<Todo[]> {
    const url = this.baseUrl + 'category/' + category + '/todos';

    const params = new HttpParams()
      .append('excludeDone', excludeDone ? 'true' : 'false')
      .append('excludeDeleted', excludeDeleted ? 'true' : 'false');
    return this.httpClient.get<Todo[]>(url, { params });
  }

  getTodo(id: number): Observable<Todo> {
    const url = this.baseUrl + 'todos/' + id;
    return this.httpClient.get<Todo>(url);
  }

  getCategories(): Observable<Category[]> {
    const url = this.baseUrl + 'categories';
    return this.httpClient.get<Category[]>(url);
  }
}
