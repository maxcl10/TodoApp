import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardItemContainerComponent } from './todo-card-item-container.component';

describe('TodoCardItemContainerComponent', () => {
  let component: TodoCardItemContainerComponent;
  let fixture: ComponentFixture<TodoCardItemContainerComponent>;

  beforeEach(async(() => {
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
