import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Todo } from './model/todo';
import { Observable } from 'rxjs';
import { TodoStore } from './shared/todoStore.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListResolverService implements Resolve<Todo[]> {

  constructor(private _todoStore: TodoStore) { }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Todo[] | Observable<Todo[]> | Promise<Todo[]> {
      console.log('resolve method called');
      return this._todoStore.get();
  }
}