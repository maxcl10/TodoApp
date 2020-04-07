import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TodosRoutingModule } from './todos-routing.module';

import { TodoCardItemComponent } from './components/todo-card-item/todo-card-item.component';
import { TodoCardItemContainerComponent } from './containers/todo-card-item-container/todo-card-item-container.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoCategoryListContainerComponent } from './containers/todo-category-list-container/todo-category-list-container.component';
import { TodoEditContainerComponent } from './containers/todo-edit-container/todo-edit-container.component';
import { TodoListContainerComponent } from './containers/todo-list-container/todo-list-container.component';
import { TodoDetailsContainerComponent } from './containers/todo-details-container/todo-details-container.component';

@NgModule({
  declarations: [
    TodoEditContainerComponent,
    TodoCategoryListContainerComponent,
    TodoCardItemComponent,
    TodoCardItemContainerComponent,
    TodoCreateComponent,
    TodoListContainerComponent,
    TodoDetailsComponent,
    TodoCardItemContainerComponent,
    TodoDetailsContainerComponent
  ],
  imports: [CommonModule, TodosRoutingModule, SharedModule]
})
export class TodosModule {}
