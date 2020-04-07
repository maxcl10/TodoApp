import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/shared/todo.service';
import { SubSink } from 'subsink';
import { Todo } from 'src/app/shared/models/todo.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-details-container',
  templateUrl: './todo-details-container.component.html',
  styleUrls: ['./todo-details-container.component.scss'],
})
export class TodoDetailsContainerComponent implements OnInit {
  private subs = new SubSink();

  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private service: TodoService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe((params) => {
      const id = +params.id; //

      this.subs.sink = this.service.getTodo(id).subscribe((res) => {
        this.todo = res;
      });
    });
  }

  onBack() {
    this.location.back();
  }
}
