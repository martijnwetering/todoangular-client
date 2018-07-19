import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './model/todo';
import { LocalStorageService } from 'ngx-store';
import { ConfigService } from './config.service';
import { Injector, Injectable } from '@angular/core';

export class Test {

}

export abstract class Api {
  abstract get(): Observable<Todo[]>;
  abstract post(): Observable<Todo>;
  abstract put(): Observable<Todo>;
  abstract delete(): Observable<any>;
}

@Injectable({
    providedIn: 'root'
  })
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

const ApiServiceFactory = (configService: ConfigService) => {
  if (configService.apiAvailable) {
    return Injector.create({providers: [{ provide: LocalStorageApi, deps: [LocalStorageService] }]}).get(LocalStorageApi);
  } else {
    return Injector.create({providers: [{ provide: LocalStorageApi, deps: [LocalStorageService] }]}).get(LocalStorageApi);
  }
};

export let ApiServiceProvider = {
  provide: Api,
  useFactory: ApiServiceFactory,
  deps: [HttpClient]
};




