import { HttpClient } from '@angular/common/http';
import { TodoStore } from './shared/todoStore.service';
import { Observable, Observer } from 'rxjs';
import { Todo } from './model/todo';
import { LocalStorageService } from 'ngx-store';

export class Test {

}

export abstract class Api {
  abstract get(): Observable<Todo[]>;
  abstract post(): Observable<Todo>;
  abstract put(): Observable<Todo>;
  abstract delete(): Observable<any>;
}

export class LocalStorageApi implements Api {

  private static STORAGE_ID = 'todos-angular';

  private todos: Todo[] = [
    {title: 'Test todo 1 localstorage', completed: false},
    {title: 'Test todo 2 localstorage', completed: false},
    {title: 'Test todo 3 localstorage', completed: false}
  ];

  constructor(private _localStorageService: LocalStorageService) {
    if (!_localStorageService.get(LocalStorageApi.STORAGE_ID)) {
      _localStorageService.set(LocalStorageApi.STORAGE_ID, this.todos);
    }
  }

  get(): Observable<Todo[]> {
    return Observable.create((observer) => {
      observer.next(this._localStorageService.get(LocalStorageApi.STORAGE_ID));
      observer.complete();
    });
  }

  post(): Observable<Todo> {
    throw new Error('Method not implemented.');
  }

  put(): Observable<Todo> {
    throw new Error('Method not implemented.');
  }

  delete(): Observable<any> {
    throw new Error('Method not implemented.');
  }


}

const ApiServiceFactory = (httpClient: HttpClient) => {
  return new LocalStorageApi(new LocalStorageService());
  // httpClient.get('/api/todo')
  //   .subscribe(
  //     (_) => {
  //       return new LocalStorageApi(new LocalStorageService());
  //     },
  //     () => {
  //       return new LocalStorageApi(new LocalStorageService());
  //     }
  //   );
};

export let ApiServiceProvider = {
  provide: Api,
  useFactory: ApiServiceFactory,
  deps: [HttpClient]
};




