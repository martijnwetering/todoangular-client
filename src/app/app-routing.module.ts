import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoListResolverService } from './shared/todo-list-resolver.service';

const appRoutes: Routes = [
  { path: '', component: TodoListComponent, pathMatch: 'full', resolve: {todos: TodoListResolverService} },
  { path: ':filter', component: TodoListComponent, resolve: {todos: TodoListResolverService} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
