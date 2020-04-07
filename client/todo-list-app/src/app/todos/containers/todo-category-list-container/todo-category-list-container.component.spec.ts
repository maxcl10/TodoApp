import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCategoryListContainerComponent } from './todo-category-list-container.component';

describe('CategoryTodosContainerComponent', () => {
  let component: TodoCategoryListContainerComponent;
  let fixture: ComponentFixture<TodoCategoryListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCategoryListContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCategoryListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
