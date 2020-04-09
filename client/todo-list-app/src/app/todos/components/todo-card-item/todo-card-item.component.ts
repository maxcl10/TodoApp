import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

/**
 * TodoCardItem Component
 */
@Component({
  selector: 'app-todo-card-item',
  templateUrl: './todo-card-item.component.html',
  styleUrls: ['./todo-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardItemComponent implements OnInit {
  @Input()
  todo: Todo;

  @Input()
  displayCategory: false;

  @Output()
  check = new EventEmitter<Todo>();

  @Output()
  delete = new EventEmitter<Todo>();

  @Output()
  starClicked = new EventEmitter<Todo>();

  isHover = false;

  constructor() {}

  ngOnInit(): void {}

  onCheck(todo: Todo) {
    this.check.emit(todo);
  }

  onDelete(todo: Todo) {
    this.delete.emit(todo);
  }

  onStarClick(todo: Todo) {
    this.starClicked.emit(todo);
  }
}
