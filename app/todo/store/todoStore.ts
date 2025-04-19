import { makeObservable, observable, action, computed } from 'mobx';

export interface TodoEl {
	id: string;
	content: string;
	isDone: boolean;
}

export class TodoStore {
	todos: TodoEl[] = [];

	constructor() {
		makeObservable(this, {
			todos: observable,
			addTodo: action,
			toggleTodo: action,
			removeTodo: action,
			unfinishedTodos: computed,
			finishedTodos: computed,
			allTodos: computed,
		});
	}

	addTodo(content: string) {
		const todo: TodoEl = {
			content,
			id: Date.now().toString(),
			isDone: false,
		};
		this.todos.push(todo);
	}

	toggleTodo(id: string) {
		const todo = this.todos.find(todo => todo.id === id);
		if (todo) {
			todo.isDone = !todo.isDone;
		}
	}

	removeTodo(id: string) {
		this.todos = this.todos.filter(todo => todo.id !== id);
	}

	get unfinishedTodos() {
		return this.todos.filter(todo => !todo.isDone);
	}
	get finishedTodos() {
		return this.todos.filter(todo => todo.isDone);
	}
	get allTodos() {
		return this.todos;
	}
}

export const todoStore = new TodoStore();
