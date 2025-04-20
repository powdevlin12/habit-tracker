import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Row from '../../components/row';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { TodoEl, TodoStore } from '../store/todoStore';

interface TodoItemProps {
	todo: TodoEl;
}

const TodoItem: React.FC<TodoItemProps> = observer(({ todo }) => {
	const todosStoreInstance = TodoStore.instance;

	const handleDelete = () => {
		todosStoreInstance.removeTodo(todo.id);
	};

	const handlePress = () => {
		todosStoreInstance.setTodoProcessing(todo.id);
	};

	return (
		<View style={styles.container}>
			<Row
				justifyContent='space-between'
				style={styles.row}
				onPress={handlePress}
			>
				<Text style={styles.todoText}>{todo.content}</Text>
				<TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
					<Ionicons name='trash-outline' size={20} color='#ff6b6b' />
				</TouchableOpacity>
			</Row>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f8f9fa',
		borderRadius: 8,
		padding: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	row: {
		width: '100%',
	},
	todoText: {
		fontSize: 16,
		flex: 1,
	},
	deleteButton: {
		padding: 4,
	},
});

export default TodoItem;
