import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailsContainerComponent } from './todo-details-container.component';

describe('TodoDetailsContainerComponent', () => {
  let component: TodoDetailsContainerComponent;
  let fixture: ComponentFixture<TodoDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDetailsContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
