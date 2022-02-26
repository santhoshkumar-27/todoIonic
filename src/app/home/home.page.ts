/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo, TodoStatus } from '../shared/modal';
import { TodoService } from '../shared/todo.service';
import { TodoQuery } from '../state/todo.query';
import { filter, switchMap, take } from 'rxjs/operators';
import { TodoStore } from '../state/state';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: Todo[] = [];
  isLoaded: boolean;
  constructor(
    private router: Router,
    private ts: TodoService,
    private tq: TodoQuery,
    private todoStore: TodoStore
    ) {
  }
  ngOnInit() {
    this.tq.getTodos().subscribe({next: (res) => this.todos  = res});
    this.tq.getLoading().subscribe({next: (res) => this.isLoaded = res});
    this.tq.getLoaded()
    .pipe(
      take(1),
      filter( res => !res),
      switchMap( () => {
        this.todoStore.setLoading(true);
        return this.ts.getTodos();
      }
      )
    ).subscribe({
      next: (res) => {
        this.todoStore.update( state => {
          return {
            todos: res,
            isLoaded: true
          };
        });
        this.todoStore.setLoading(false);
      },
      error: (err) => {
        console.log('error in loading', err);
        this.todoStore.setLoading(false);
      }

    });
  }
  gotoTodo() {
    this.router.navigateByUrl('/add-todo');
  }
  markAsFinished(id: number, todo: Todo) {
    const payload = {
      ...todo,
      status: TodoStatus.DONE
    };
    this.ts.todoUpdate(id, payload).subscribe({
      next: (res) => {
        this.todoStore.update( state => {
          const todos: Todo[] = [...state.todos];
          const index = todos.findIndex(t => t.id === id);
          todos[index] = {
            ...todos[index],
            status: TodoStatus.DONE
          };
          return {
            ...state,
            todos
          };
        });
      }
    });
  }
  deleteTodo(id: number){
    this.ts.deleteTodo(id).subscribe({
      next: (res) => {
        this.todoStore.update( state => {
          return {
            ...state,
            todos: state.todos.filter( t => t.id !== id)
          };
        });
      }
    });
  }
}
