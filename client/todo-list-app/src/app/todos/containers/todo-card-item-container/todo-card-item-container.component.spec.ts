import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoCardItemContainerComponent } from './todo-card-item-container.component';

describe('TodoCardItemContainerComponent', () => {
  let component: TodoCardItemContainerComponent;
  let fixture: ComponentFixture<TodoCardItemContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCardItemContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
