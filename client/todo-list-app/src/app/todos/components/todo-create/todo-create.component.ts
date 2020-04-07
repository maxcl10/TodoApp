import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/shared/todo.service';
import { Category } from 'src/app/shared/models/category.model';
import { Todo } from 'src/app/shared/models/todo.model';

import { map, startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  EventBusService,
  EmitEvent,
  Events
} from 'src/app/shared/event-bus.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  constructor(private service: TodoService) {}

  @Output()
  AddTodo = new EventEmitter<Todo>();

  todoAddForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });

  categories: Category[];
  errorMessage: string;
  filteredCategories: Observable<Category[]>;

  ngOnInit() {
    this.service.getCategories().subscribe(arg => {
      this.categories = arg;
      this.filteredCategories = this.todoAddForm.valueChanges.pipe(
        tap(val => console.log(`BEFORE MAP: ${JSON.stringify(val)}`)),
        startWith(''),
        map(value =>
          value.category !== undefined && typeof value.category === 'string'
            ? value.category
            : value?.category?.name
        ),
        map(name => (name ? this._filter(name) : this.categories.slice()))
      );
    });
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  onAddTodo() {
    const todo = new Todo(
      this.todoAddForm.value.title,
      this.todoAddForm.value.category.categoryId
    );

    this.AddTodo.emit(todo);
    this.todoAddForm.reset();
  }

  private _filter(name: string): Category[] {
    console.log('here');
    const filterValue = name.toLowerCase();

    return this.categories.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
