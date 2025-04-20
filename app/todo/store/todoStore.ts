import {
	makeObservable,
	observable,
	action,
	computed,
	reaction,
	IReactionDisposer,
} from 'mobx';

export interface TodoEl {
	id: string;
	content: string;
	isDone: boolean;
}

export class TodoStore {
	static instance: TodoStore;
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
				updateTodo: action,
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

	addTodo(content: string): void {
		const todo: TodoEl = {
			content,
			id: Date.now().toString(),
			isDone: false,
		};
		this.todos.push(todo);
	}

	toggleTodo(id: string): void {
		const todo = this.todos.find(todo => todo.id === id);
		if (todo) {
			todo.isDone = !todo.isDone;
		}
	}

	updateTodo(id: string, newContent: string): void {
		const todo = this.todos.find(todo => todo.id === id);
		if (todo) {
			todo.content = newContent;
		}
	}

	setTodoProcessing(id: string): void {
		this.currentTodoProcessing = this.todos.find(todo => todo.id === id);
	}

	removeTodo(id: string): void {
		this.todos = this.todos.filter(todo => todo.id !== id);
	}

	subscribeToTodoProcessingChanges(callback: () => void): IReactionDisposer {
		return reaction(() => this.currentTodoProcessing?.id, callback);
	}

	get unfinishedTodos(): TodoEl[] {
		return this.todos.filter(todo => !todo.isDone);
	}

	get finishedTodos(): TodoEl[] {
		return this.todos.filter(todo => todo.isDone);
	}

	get allTodos(): TodoEl[] {
		return this.todos;
	}

	get GetTodoProcessing() {
		return this.currentTodoProcessing;
	}

	static getInstance(): TodoStore {
		if (!TodoStore.instance) {
			TodoStore.instance = new TodoStore();
		}
		return TodoStore.instance;
	}
}

export const todoStore = TodoStore.getInstance();
