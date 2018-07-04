import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Todo } from '../model/todo';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoStore {


  private baseUrl: string = '/api/todo';

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
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

