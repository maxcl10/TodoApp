import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoCardItemComponent } from './todo-card-item.component';

describe('TodoCardItemComponent', () => {
  let component: TodoCardItemComponent;
  let fixture: ComponentFixture<TodoCardItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
