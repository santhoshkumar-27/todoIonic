import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoStatus } from './modal';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }
  addTodo(title, description): Observable<Todo>{
    return this.http.post<Todo>(this.baseUrl, {title, description, status: TodoStatus.OPEN});
  }
  todoUpdate(id: number, payload: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, payload);
  }
  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.baseUrl}/${id}`);
  }
}
