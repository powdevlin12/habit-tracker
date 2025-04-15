import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { TodoItem } from '..';
import { FlashList } from '@shopify/flash-list';
import TodoItemComponent from './todo-item';

interface TodoListProps {
	todos: TodoItem[];
	onDelete?: (id: string) => void;
}

export class TodoList extends Component<TodoListProps> {
	render() {
		return (
			<View style={styles.container}>
				<FlashList
					renderItem={({ item }) => (
						<TodoItemComponent todo={item} onDelete={this.props.onDelete} />
					)}
					estimatedItemSize={100}
					data={this.props.todos}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
					ListEmptyComponent={() => <Text>No todos</Text>}
					ListFooterComponent={() => <View style={{ height: 10 }} />}
					ListHeaderComponent={() => <View style={{ height: 10 }} />}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 4,
	},
});

export default TodoList;
