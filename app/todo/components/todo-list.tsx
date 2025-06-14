import { StyleSheet, Text, View } from 'react-native';
import React from 'react'; // Removed Component
// Removed unused TodoItem import
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react-lite';
import { todoStore, TodoEl } from '../store/todoStore'; // Added TodoEl import
import TodoItem from './todo-item';

// Define props interface if needed, or remove if not used by the functional component directly
// interface TodoListProps {
// 	onDelete?: (id: string) => void; // Props might change depending on usage
// }

const TodoList: React.FC = observer(() => {
	// Start functional component definition and wrap with observer
	return (
		<View style={styles.container}>
			<FlashList
				renderItem={({ item }) => (
					<TodoItem todo={item} /> // Removed onDelete prop
				)}
				estimatedItemSize={100}
				data={todoStore.todos.slice()} // Access store directly
				keyExtractor={(item: TodoEl) => item.id} // Add type for item
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

export default TodoList; // Export the new functional component
