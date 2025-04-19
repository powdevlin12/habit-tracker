import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component, useEffect } from 'react'; // Removed PureComponent
import Row from '../../components/row';
// Removed incorrect import: import { TodoItem } from '..';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { TodoEl, todoStore } from '../store/todoStore'; // Import todoStore
import { autorun } from 'mobx';

type TodoItemProps = {
	todo: TodoEl;
	// Removed onDelete prop: onDelete?: (id: string) => void;
};

// @observer
// export class TodoItemComponent extends Component<TodoItemProps> {
// 	// Removed constructor and local state

// 	// Removed commented out shouldComponentUpdate
// 	// shouldComponentUpdate(
// 	// 	nextProps: Readonly<TodoItemProps>,
// 	// 	nextState: Readonly<{}>,
// 	// 	nextContext: any,
// 	// ): boolean {
// 	// 	return nextProps.todo.content !== this.props.todo.content;
// 	// }

// 	handleDelete = () => {
// 		// Call store action directly
// 		todoStore.removeTodo(this.props.todo.id);
// 	};

// 	// Removed getDerivedStateFromProps

// 	render() {
// 		// Removed console.log
// 		return (
// 			<View style={styles.container}>
// 				<Row justifyContent='space-between' style={styles.row}>
// 					{/* Display content directly from props */}
// 					<Text style={styles.todoText}>{this.props.todo.content}</Text>
// 					<TouchableOpacity
// 						onPress={this.handleDelete}
// 						style={styles.deleteButton}
// 					>
// 						<Ionicons name='trash-outline' size={20} color='#ff6b6b' />
// 					</TouchableOpacity>
// 				</Row>
// 			</View>
// 		);
// 	}
// }

const TodoItemComponent: React.FC<TodoItemProps> = observer(({ todo }) => {
	const handleDelete = () => {
		todoStore.removeTodo(todo.id);
	};

	const handlePress = () => {
		todoStore.setTodoProcessing(todo.id);
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

export default TodoItemComponent;
