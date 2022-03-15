import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoDetailsContainerComponent } from './todo-details-container.component';

describe('TodoDetailsContainerComponent', () => {
  let component: TodoDetailsContainerComponent;
  let fixture: ComponentFixture<TodoDetailsContainerComponent>;

  beforeEach(waitForAsync(() => {
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
