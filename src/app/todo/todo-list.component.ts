import { Component, OnInit } from '@angular/core';
import { TodoStore } from '../shared/todoStore.service';
import { Todo } from '../model/todo';
import { HttpErrorResponse } from '@angular/common/http';
import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    public todos: Array<Todo> = [];

    constructor(private todoStore: TodoStore) { }
    
    ngOnInit() {
        this.todoStore.get()
            .subscribe(
                (todos) => { 
                    this.todos = todos; 
                },
                (error) => { 
                    console.log(error.message); 
                }
            )
    }

    onTodoAdded(todo: Todo) {
        this.todoStore.insert(todo)
            .subscribe(
                (todo) => {
                    this.todos.push(todo);
                },
                (error: HttpErrorResponse) => {
                    console.log("Could not create todo", error.message);
                    this.todos.splice(this.todos.indexOf(todo), 1);
                }
            ); 
            
    }

    onUpdateTodo(todo: Todo) {
        this.todoStore.update(todo)
            .subscribe(
                (todo) => {
                   
                },
                (error: HttpErrorResponse) => {
                    console.log("Could not update todo", error.message);
                }
            )
    }

    onRemoveTodo(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.todoStore.remove(todo)
            .subscribe(
                (res) => { },
                (error: HttpErrorResponse) => {
                    this.todos.push(todo);
                } 
            );
    }

    onTodoToggleComplete(todo: Todo) {
        this.todoStore.toggleComplete(todo)
            .subscribe(
                (res) => {}
            );
    }
}

