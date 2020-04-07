import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListContainerComponent } from './containers/todo-list-container/todo-list-container.component';
import { TodoEditContainerComponent } from './containers/todo-edit-container/todo-edit-container.component';
import { TodoDetailsContainerComponent } from './containers/todo-details-container/todo-details-container.component';
import { TodoCategoryListContainerComponent } from './containers/todo-category-list-container/todo-category-list-container.component';

const routes: Routes = [
  { path: '', component: TodoListContainerComponent },
  { path: ':id/edit', component: TodoEditContainerComponent },
  { path: ':id', component: TodoDetailsContainerComponent },
  { path: 'category/:id', component: TodoCategoryListContainerComponent },
  { path: '**', component: TodoListContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
