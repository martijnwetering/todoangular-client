import { TestBed, inject } from '@angular/core/testing';

import { TodoStore } from './todoStore.service';

describe('TodoStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoStore]
    });
  });

  it('should be created', inject([TodoStore], (service: TodoStore) => {
    expect(service).toBeTruthy();
  }));
});
