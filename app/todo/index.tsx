import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/todo-list';
import { observer } from 'mobx-react';
import { todoStore } from './store/todoStore';
// Removed unused TodoItem interface
// Removed unused TodoState interface

@observer
class Todo extends React.Component {
	// Removed TodoState from Component generic
	// Removed constructor and local state

	handleAdd = (text: string) => {
		// Removed local state update
		if (text.trim()) {
			todoStore.addTodo(text); // Only interact with the store
		}
	};

	// Removed handleDelete method

	render() {
		// Removed console.log for cleaner code, can be added back if needed
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 24, fontWeight: '500' }}>My todo app</Text>
				<View style={styles.body}>
					<TodoInput onAdd={this.handleAdd} />
					<TodoList />
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
