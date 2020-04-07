import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit {
  @Input()
  todo: Todo;

  constructor() {}

  ngOnInit(): void {}
}
