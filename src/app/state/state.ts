/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Todo } from '../shared/modal';

export interface TodoState {
    todos: Todo[];
    isLoaded: boolean;
}

export const initialState = (): TodoState => ({
    todos: [],
    isLoaded: false
});

@Injectable({
    providedIn: 'root',
})
@StoreConfig({name: 'todo'})
export class TodoStore extends Store<TodoState> {
    constructor() {
        super(initialState());
    }
};
