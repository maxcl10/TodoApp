import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoEditContainerComponent } from './todo-edit-container.component';

describe('EditTodoContainerComponent', () => {
  let component: TodoEditContainerComponent;
  let fixture: ComponentFixture<TodoEditContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TodoEditContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
