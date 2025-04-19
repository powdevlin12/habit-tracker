import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/todo-list';
import { observer } from 'mobx-react';
import { todoStore } from './store/todoStore';
export interface TodoItem {
	id: string;
	content: string;
}

interface TodoState {
	todos: TodoItem[];
}

@observer
class Todo extends React.Component<{}, TodoState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			todos: [],
		};
	}

	handleAdd = (text: string) => {
		this.setState(prevState => ({
			todos: [
				...prevState.todos,
				{
					id: Date.now().toString(),
					content: text,
				},
			],
		}));

		if (text.trim()) {
			todoStore.addTodo(text);
		}
	};

	handleDelete = (id: string) => {
		this.setState(prevState => ({
			todos: prevState.todos.filter(todo => todo.id !== id),
		}));
	};

	render() {
		console.log('render chạy');
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 24, fontWeight: '500' }}>My todo app</Text>
				<View style={styles.body}>
					<TodoInput onAdd={this.handleAdd} />
					<TodoList todos={this.state.todos} onDelete={this.handleDelete} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
	},
	body: {
		flex: 1,
	},
});

export default Todo;
