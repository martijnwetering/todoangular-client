import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Todo } from '../model/todo';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  
  public faTimes = faTimes;

  public edit: boolean = false;

  @Input()
  public todo: Todo;

  @Output()
  public toggleComplete: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  public removeTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  public updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  @ViewChild("editTodo", {read: ElementRef}) editTodoEl: ElementRef;

  constructor(private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {
  }

  toggleTodoComplete(event: Event) {
    this.toggleComplete.emit(this.todo);
  }

  remove(event: Event) {
    this.removeTodo.emit(this.todo);
  }

  update() {
    this.updateTodo.emit(this.todo);
  }

  toggleEdit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.edit = !this.edit;
    if (this.edit) { 
      this.changeDetector.detectChanges();
      this.editTodoEl.nativeElement.focus();
    } else {
      this.update();
    } 
  }
}
