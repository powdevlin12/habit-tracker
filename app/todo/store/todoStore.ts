import { makeObservable, observable, action, computed } from 'mobx';

export interface TodoEl {
	id: string;
	content: string;
	isDone: boolean;
}

export class TodoStore {
	todos: TodoEl[] = [];
	currentTodoProcessing?: TodoEl = undefined;

	constructor() {
		makeObservable(
			this,
			{
				todos: observable,
				currentTodoProcessing: observable,
				addTodo: action,
				toggleTodo: action,
				removeTodo: action,
				setTodoProcessing: action,
				unfinishedTodos: computed,
				finishedTodos: computed,
				allTodos: computed,
			},
			{
				autoBind: true,
			},
		);
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
		const todo = this.todos?.find(todo => todo.id === id);
		if (todo) {
			todo.isDone = !todo.isDone;
		}
	}

	setTodoProcessing(id: string) {
		console.log({
			id,
			todos: this.todos,
		});
		this.currentTodoProcessing = this.todos?.find(todo => todo.id === id);
		console.log({
			currentTodoProcessing: this.currentTodoProcessing,
		});
	}

	removeTodo(id: string) {
		console.log({
			id,
			todos: this.todos,
		});
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

	get GetTodoProcessing() {
		return this.currentTodoProcessing;
	}
}

export const todoStore = new TodoStore();
