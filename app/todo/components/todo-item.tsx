import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component, PureComponent } from 'react';
import Row from '../../components/row';
import { TodoItem } from '..';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { TodoEl } from '../store/todoStore';

type TodoItemProps = {
	todo: TodoEl;
	onDelete?: (id: string) => void;
};

@observer
export class TodoItemComponent extends Component<TodoItemProps> {
	constructor(props: TodoItemProps) {
		super(props);
		this.state = {
			todoContent: '',
		};
	}

	// shouldComponentUpdate(
	// 	nextProps: Readonly<TodoItemProps>,
	// 	nextState: Readonly<{}>,
	// 	nextContext: any,
	// ): boolean {
	// 	return nextProps.todo.content !== this.props.todo.content;
	// }

	handleDelete = () => {
		if (this.props.onDelete) {
			this.props.onDelete(this.props.todo.id);
		}
	};

	static getDerivedStateFromProps(
		props: Readonly<TodoItemProps>,
		state: Readonly<{}>,
	): any {
		return {
			todoContent: `${props.todo.content} + 123`,
		};
	}

	render() {
		console.log(`render ${this.props.todo.content}`);
		return (
			<View style={styles.container}>
				<Row justifyContent='space-between' style={styles.row}>
					<Text style={styles.todoText}>{this.state.todoContent}</Text>
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
