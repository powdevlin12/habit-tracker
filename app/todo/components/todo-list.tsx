import { StyleSheet, Text, View } from 'react-native';
import React from 'react'; // Removed Component
// Removed unused TodoItem import
import { FlashList } from '@shopify/flash-list';
import TodoItemComponent from './todo-item';
import { observer } from 'mobx-react';
import { todoStore, TodoEl } from '../store/todoStore'; // Added TodoEl import

// Define props interface if needed, or remove if not used by the functional component directly
// interface TodoListProps {
// 	onDelete?: (id: string) => void; // Props might change depending on usage
// }

const TodoListFunc: React.FC = observer(() => {
	// Start functional component definition and wrap with observer
	return (
		<View style={styles.container}>
			<FlashList
				renderItem={({ item }) => (
					<TodoItemComponent todo={item} /> // Removed onDelete prop
				)}
				estimatedItemSize={100}
				data={todoStore.todos.slice()} // Access store directly
				keyExtractor={(item: TodoEl) => item.id} // Add type for item
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				ListEmptyComponent={() => <Text>No todos</Text>}
				ListFooterComponent={() => <View style={{ height: 10 }} />}
				ListHeaderComponent={() => <View style={{ height: 10 }} />}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 4,
	},
});

export default TodoListFunc; // Export the new functional component
