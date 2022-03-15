import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TodoService } from 'src/app/shared/todo.service';
import { Category } from 'src/app/shared/models/category.model';
import { Todo } from 'src/app/shared/models/todo.model';

import { map, startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent implements OnInit {
  private subs = new SubSink();

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private service: TodoService) {}

  @Output()
  AddTodo = new EventEmitter<Todo>();

  todoAddForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  categories: Category[];
  errorMessage: string;
  filteredCategories: Observable<Category[]>;

  ngOnInit() {
    this.subs.sink = this.service.getCategories().subscribe((arg) => {
      this.categories = arg;
      this.filteredCategories = this.todoAddForm
        .get('category')
        .valueChanges.pipe(
          startWith(''),
          map((value) =>
            value !== undefined && typeof value === 'string'
              ? value
              : value.name
          ),
          map((name) => (name ? this.filter(name) : this.categories.slice()))
        );
    });
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  onAddTodo() {
    if (this.todoAddForm.valid) {
      const todo: Todo = {
        title: this.todoAddForm.value.title,
        categoryId: this.todoAddForm.value.category.categoryId,
      };
      this.AddTodo.emit(todo);

      this.todoAddForm.reset({ title: '', category: '' });
      // required otherwise form stay not valid has submit is set
      this.formDirective.resetForm();
    }
  }

  private filter(name: string): Category[] {
    const filterValue = name.toLowerCase();

    return this.categories.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
