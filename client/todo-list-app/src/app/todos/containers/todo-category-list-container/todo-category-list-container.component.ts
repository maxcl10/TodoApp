import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/shared/todo.service';
import { SubSink } from 'subsink';
import { Todo } from 'src/app/shared/models/todo.model';
import { EventBusService } from 'src/app/shared/event-bus.service';

@Component({
  selector: 'app-category-todos-container',
  templateUrl: './todo-category-list-container.component.html',
  styleUrls: ['./todo-category-list-container.component.scss'],
})
export class TodoCategoryListContainerComponent implements OnInit {
  private subs = new SubSink();
  todos: Todo[];
  errorMessage: string;

  constructor(private route: ActivatedRoute, private service: TodoService) {}

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe((params) => {
      const category = params.id; //

      this.subs.sink = this.service
        .getTodosByCategory(category, false, true)
        .subscribe((res) => {
          this.todos = res;
        });
    });
  }

  onChecked(todo: Todo) {
    // const index = this.todos.indexOf(todo);
    // this.todos.splice(index, 1);
  }

  onDeleted(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  onErrorOccured(errorMessage: string) {
    this.errorMessage = errorMessage;
  }
}
