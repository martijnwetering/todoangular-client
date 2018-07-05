import { Component, OnInit, DoCheck, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TodoStore } from '../shared/todoStore.service';
import { Todo } from '../model/todo';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck, OnDestroy {

    private filter: string;
    private routeSubscription: Subscription;
    public todos: Array<Todo> = [];

    constructor(private todoStore: TodoStore, private route: ActivatedRoute) { 

    }
    
    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(
            (params) => { 
                const filter = params['filter'];
                this.route.data.subscribe(
                    (data: {todos: Todo[]}) => {
                        if (filter === 'active')
                            this.todos = data.todos.filter(t => !t.completed);
                        else if (filter === 'completed')
                            this.todos = data.todos.filter(t => t.completed);
                        else
                            this.todos = data.todos;
                    },
                    (error) => { 
                        console.log(error.message); 
                    }
                )
            }
        );
        
    }

    ngOnDestroy() {

    }

    ngDoCheck() {
        console.log('Do Check called');
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
                () => {
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
                () => { },
                () => {
                    this.todos.push(todo);
                } 
            );
    }

    onTodoToggleComplete(todo: Todo) {
        this.todoStore.toggleComplete(todo)
            .subscribe(
                () => { }
            );
    }
}

