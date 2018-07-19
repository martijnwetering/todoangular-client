import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  public todo: string = '';

  @Output()
  public todoAdded: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  submit(title: string) {
    this.todoAdded.emit({title: title, completed: false})
    this.todo = '';
  }
}
