import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { catchError } from 'rxjs/operators';
import { Api } from '../api.service.provider';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private baseUrl = '/api/todo';

  constructor(private httpClient: HttpClient, private _api?: Api) { }

  get(): Observable<Todo[]> {
    return this._api.get();
  }

  insert(todo: Todo): Observable<Todo> {
      return this.httpClient.post<Todo>(this.baseUrl, todo, this.getOptions());
  }

  update(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.baseUrl + `/${todo.id}`, todo, this.getOptions());
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    return this.httpClient.put(this.baseUrl + `/${todo.id}`, todo, this.getOptions());
  }

  remove(todo: Todo) {
    return this.httpClient.delete(this.baseUrl + `/${todo.id}`, this.getOptions())
      .pipe(
        catchError(
          (error) => {
            console.log(error);
            return Observable.throw(error);
          }
        )
      );
  }

  private getOptions() {
    const headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
    return {headers: headers};
  }
}
