import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/shared/todo.service';
import { Todo } from 'src/app/shared/models/todo.model';
import { Location } from '@angular/common';
import { SubSink } from 'node_modules/subsink/dist/';
import { MatSnackBar } from '@angular/material';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-todo-edit-container',
  templateUrl: './todo-edit-container.component.html',
  styleUrls: ['./todo-edit-container.component.scss']
})
export class TodoEditContainerComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: TodoService,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}
  private subs = new SubSink();
  todoForm: FormGroup;
  editedTodo: Todo;
  todoId: number;
  categories: Category[];

  ngOnInit(): void {
    // let id = +this.route.snapshot.paramMap.get('id');
    this.subs.sink = this.route.params.subscribe(params => {
      const id = +params.id; //

      this.subs.sink = this.service.getTodo(id).subscribe(res => {
        this.editedTodo = res;
        this.todoForm = this.fb.group({
          title: new FormControl(res.title, [Validators.required]),
          note: new FormControl(res.note),
          categoryId: new FormControl(res.categoryId)
        });
      });

      this.subs.sink = this.service.getCategories().subscribe(res => {
        this.categories = res;
      });
    });
  }

  submitForm() {
    this.editedTodo.title = this.todoForm.get('title').value;
    this.editedTodo.note = this.todoForm.get('note').value;
    this.editedTodo.categoryId = this.todoForm.get('categoryId').value;
    this.subs.sink = this.service.saveTodo(this.editedTodo).subscribe(res => {
      this.snackBar.open('Todo saved', null, { duration: 2000 });
      this.router.navigate(['../todos']);
    });
  }

  onSave() {
    this.editedTodo.title = this.todoForm.get('title').value;
    this.editedTodo.note = this.todoForm.get('note').value;
    this.subs.sink = this.service.saveTodo(this.editedTodo).subscribe(res => {
      this.snackBar.open('Todo saved', null, { duration: 2000 });
    });
  }

  onKeyDown($event): void {
    // Detect platform
    if (navigator.platform.match('Mac')) {
      this.handleMacKeyEvents($event);
    } else {
      this.handleWindowsKeyEvents($event);
    }
  }

  onBack() {
    this.location.back();
  }

  handleMacKeyEvents($event) {
    // MetaKey documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
    const charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.metaKey && charCode === 's') {
      this.onSave();
      $event.preventDefault();
    }
  }

  handleWindowsKeyEvents($event) {
    const charCode = String.fromCharCode($event.which).toLowerCase();
    if ($event.ctrlKey && charCode === 's') {
      this.onSave();
      $event.preventDefault();
    }
  }

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
