/**
* TodosStore.tsx
* Copyright: Microsoft 2017
*
* Resub Basic Example https://github.com/Microsoft/ReSub
*/

import * as _ from 'lodash';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { Todo, } from '../models/TodoModels';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = []


    private imaginaryPartX: number[] = [];
    private imaginaryPartY: number[] = [];

    setPartX(array: number[]) {
        this.imaginaryPartX.concat(array)
        this.trigger();

    }
    setPartY(array: number[]) {
        this.imaginaryPartY.concat(array)
        this.trigger();

    }

    addTodo(todo: Todo) {
        let newTodo = todo;
        this._todos = this._todos.concat(newTodo);

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return newTodo;


    }
    @autoSubscribe
    getPartY() {
        return this.imaginaryPartY;
    }
    @autoSubscribe
    getPartX() {
        return this.imaginaryPartX;
    }
    private _type: string = '';
    @autoSubscribe
    getType() {

        return this._type;
    }
    setType(todo: string) {
        this._type = todo
        this.trigger();


    }

    @autoSubscribe
    getTodos() {
        return this._todos;
    }

    @autoSubscribe
    getTodoById(todoId: string) {
        return _.find(this._todos, todo => todo.id === todoId);
    }

    deleteTodo(todoId: string) {
        this._todos = _.filter(this._todos, todo => todo.id !== todoId);

        // Asynchronously delete the todo item from the DB.
        this.trigger();
    }
}

export default new TodosStore();
