import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import { Todo } from 'src/app/shared/models/todo.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material';
import {
  EmitEvent,
  Events,
  EventBusService
} from 'src/app/shared/event-bus.service';

@Component({
  selector: 'app-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss']
})
export class TodoListContainerComponent implements OnInit, OnDestroy {
  todos: Todo[];
  private subs = new SubSink();
  errorMessage: string;
  loading = false;

  constructor(
    private service: TodoService,
    private snackBar: MatSnackBar,
    private eventBusService: EventBusService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.subs.sink = this.service.getTodos(true, true).subscribe(
      todos => {
        this.loading = false;
        this.todos = todos;
      },
      error => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  onAddTodo(todo: Todo) {
    this.service.addTodo(todo.title, todo.categoryId).subscribe(
      res => {
        this.errorMessage = '';
        this.todos.push(res);
        this.snackBar.open('Item ´' + todo.title + '` added', null, {
          duration: 2000
        });
        this.eventBusService.emit(new EmitEvent(Events.TodoUpdated, res));
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.todos, event.previousIndex, event.currentIndex);

      for (let index = 0; index < this.todos.length; index++) {
        const element = this.todos[index];
        element.prioOrder = index;
        this.subs.sink = this.service.saveTodo(element).subscribe(res => {});
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onChecked(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.snackBar.open('Item ´' + todo.title + '` removed', null, {
      duration: 2000
    });
  }

  onDeleted(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.snackBar.open('Item ´' + todo.title + '` deleted', null, {
      duration: 2000
    });
  }

  onErrorOccured(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.snackBar.open(errorMessage, 'Error', {
      duration: 2000
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
