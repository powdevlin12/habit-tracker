import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react-lite';
import { todoStore, TodoEl } from '../store/todoStore';
import TodoItem from './todo-item';

const TodoList: React.FC = observer(() => {
	return (
		<View style={styles.container}>
			<FlashList
				renderItem={({ item }) => <TodoItem todo={item} />}
				estimatedItemSize={100}
				data={todoStore.todos.slice()}
				keyExtractor={(item: TodoEl) => item.id}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				ListEmptyComponent={() => (
					<Text style={styles.emptyText}>No todos</Text>
				)}
				ListFooterComponent={() => <View style={{ height: 10 }} />}
				ListHeaderComponent={() => <View style={{ height: 10 }} />}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
	},
	emptyText: {
		textAlign: 'center',
		color: '#666',
		fontSize: 16,
	},
});

export default TodoList;
