import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Row from '../../components/row';
import { TodoItem } from '..';
import { Ionicons } from '@expo/vector-icons';

type TodoItemProps = {
	todo: TodoItem;
	onDelete?: (id: string) => void;
};

export class TodoItemComponent extends Component<TodoItemProps> {
	handleDelete = () => {
		if (this.props.onDelete) {
			this.props.onDelete(this.props.todo.id);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Row justifyContent='space-between' style={styles.row}>
					<Text style={styles.todoText}>{this.props.todo.content}</Text>
					<TouchableOpacity
						onPress={this.handleDelete}
						style={styles.deleteButton}
					>
						<Ionicons name='trash-outline' size={20} color='#ff6b6b' />
					</TouchableOpacity>
				</Row>
			</View>
		);
	}
}

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
