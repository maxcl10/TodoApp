import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';
import { SubSink } from 'subsink';
import { TodoService } from 'src/app/shared/todo.service';
import {
  EventBusService,
  Events,
  EmitEvent
} from 'src/app/shared/event-bus.service';

@Component({
  selector: 'app-todo-card-item-container',
  templateUrl: './todo-card-item-container.component.html',
  styleUrls: ['./todo-card-item-container.component.scss']
})
export class TodoCardItemContainerComponent implements OnInit {
  constructor(
    private service: TodoService,
    private eventBusService: EventBusService
  ) {}

  private subs = new SubSink();

  @Input()
  todo: Todo;

  @Input()
  displayCategory = false;

  @Output()
  errorOccured = new EventEmitter<string>();

  @Output()
  checked = new EventEmitter<Todo>();

  @Output()
  deleted = new EventEmitter<Todo>();

  ngOnInit(): void {}

  onCheck(todo: Todo) {
    todo.doneDate = new Date();
    this.subs.sink = this.service.saveTodo(todo).subscribe(
      () => {
        this.checked.emit(todo);
        this.eventBusService.emit(new EmitEvent(Events.TodoUpdated, todo));
      },
      error => {
        this.errorOccured.emit(error);
      }
    );
  }

  onDelete(todo: Todo) {
    todo.deletedDate = new Date();
    this.subs.sink = this.service.deleteTodo(todo.todoId).subscribe(
      () => {
        this.deleted.emit(todo);
        this.eventBusService.emit(new EmitEvent(Events.TodoUpdated, todo));
      },
      error => {
        this.errorOccured.emit(error);
      }
    );
  }

  onStarClicked(todo: Todo) {
    todo.isUrgent = !todo.isUrgent;
    this.subs.sink = this.service.saveTodo(todo).subscribe(
      () => {},
      error => {
        this.errorOccured.emit(error);
      }
    );
  }
}
