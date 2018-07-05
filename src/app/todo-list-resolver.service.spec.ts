import { TestBed, inject } from '@angular/core/testing';

import { TodoListResolverService } from './todo-list-resolver.service';

describe('TodoListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListResolverService]
    });
  });

  it('should be created', inject([TodoListResolverService], (service: TodoListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
