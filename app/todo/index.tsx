import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TodoInput from './components/TodoInput';
import { observer } from 'mobx-react-lite';
import { todoStore } from './store/todoStore';
import TodoList from './components/todo-list';
// Removed unused TodoItem interface
// Removed unused TodoState interface

const Todo: React.FC = observer(() => {
	// Removed TodoState from Component generic
	// Removed constructor and local state

	const handleAdd = (text: string) => {
		// Removed local state update
		if (text.trim()) {
			todoStore.addTodo(text); // Only interact with the store
		}
	};

	const handleUpdate = (id: string, newContent: string) => {
		todoStore.updateTodo(id, newContent);
	};

	// Removed handleDelete method

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My todo app</Text>
			<View style={styles.body}>
				<TodoInput onAdd={handleAdd} onUpdate={handleUpdate} />
				<TodoList />
			</View>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 16,
	},
	body: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		marginBottom: 16,
	},
});

export default Todo;
