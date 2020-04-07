import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { TodoService } from 'src/app/shared/todo.service';
import { EventBusService, Events } from 'src/app/shared/event-bus.service';
import { Todo } from 'src/app/shared/models/todo.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private subs = new SubSink();
  categories: Category[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: TodoService,
    private eventBusService: EventBusService
  ) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngOnInit(): void {
    this.service.getCategories().subscribe(res => {
      this.categories = res;
    });

    this.subs.sink = this.eventBusService.on(Events.TodoUpdated, todo => {
      this.updateCount(todo);
    });
  }

  updateCount(todo: Todo) {
    const category = this.categories.filter(
      o => o.categoryId === todo.categoryId
    )[0];

    if (todo.doneDate || todo.deletedDate) {
      category.todosCount -= 1;
    } else {
      category.todosCount += 1;
    }
  }
}
