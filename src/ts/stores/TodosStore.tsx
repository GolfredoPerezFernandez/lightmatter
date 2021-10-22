/**
* TodosStore.tsx
* Copyright: Microsoft 2017
*
* Resub Basic Example https://github.com/Microsoft/ReSub
*/

import * as _ from 'lodash';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { Todo, Options } from '../models/TodoModels';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = [{
        id: '1',
        creationTime: 0,
        title: 'weekly test',
        description: 'description',
        options: [{
            id: "11",
            creationTime: 1,
            title: 'option 1',
            url: 'link',
            votes: 20,
            votesPercent: '10%',
            _searchTerms: '3'
        }, {
            id: "12",
            creationTime: 1,
            title: 'option 2',
            url: 'link',
            votes: 20,
            votesPercent: '30%',
            _searchTerms: '3'
        }],
        closeTime: 2,
        winner: "golfred",
        winning: 'perez',
        duration: 5,
        openPoll: false,
        totalVotes: 20,
        _searchTerms: '3'
    }, {
        id: '2',
        creationTime: 0,
        title: 'Next test',
        description: 'easd',
        options: [{
            id: "13",
            creationTime: 1,
            title: 'option 2',
            url: 'link',
            votes: 52,
            votesPercent: '10%',
            _searchTerms: '3'
        }, {
            id: "14",
            creationTime: 1,
            title: 'option 4',
            url: 'link',
            votes: 84,
            votesPercent: '30%',
            _searchTerms: '3'
        }],
        closeTime: 2,
        winner: "Alejandro",
        winning: 'perez',
        duration: 5,
        openPoll: true,
        totalVotes: 15,
        _searchTerms: '3'
    }];

    private _options: Options[] = [{
        id: "11",
        creationTime: 1,
        title: 'option 1',
        url: 'link',
        votes: 20,
        votesPercent: '10%',
        _searchTerms: '3'
    }, {
        id: "12",
        creationTime: 1,
        title: 'option 2',
        url: 'link',
        votes: 20,
        votesPercent: '30%',
        _searchTerms: '3'
    },];

    addTodo(title: string, description: string, closeTime: number, duration: number, winning: string, openPoll: boolean, winner: string, totalVotes: number, options: Options) {
        const now = Date.now().valueOf();
        const newTodo: Todo = {
            id: now.toString(),
            creationTime: now,
            closeTime,
            winner,
            title,
            description,
            openPoll,
            winning,
            options: [...options],
            duration,
            totalVotes,
            _searchTerms: now.toString(),
        };

        this._todos = this._todos.concat(newTodo);

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return newTodo;
    }

    @autoSubscribe
    getTodos() {
        return this._todos;
    }
    @autoSubscribe
    getOptions() {
        return this._options;
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
