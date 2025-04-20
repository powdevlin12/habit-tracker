import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TodoStore } from '../store/todoStore';
import Column from '../../components/column';

interface TodoInputProps {
	onAdd: (text: string) => void;
	onUpdate: (id: string, newContent: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = observer(({ onAdd, onUpdate }) => {
	const [text, setText] = useState('');
	const [btnTitle, setBtnTitle] = useState('Add');

	const todoStoreInstance = TodoStore.instance;

	const handleChangeText = (value: string) => {
		setText(value);
	};

	const handlePressBtn = () => {
		if (btnTitle === 'Add') {
			onAdd(text);
		} else {
			onUpdate(todoStoreInstance.currentTodoProcessing?.id ?? '', text);
		}

		setText('');
		todoStoreInstance.setTodoProcessing('');
	};

	useEffect(() => {
		// React to changes in the currently processed todo
		const updateInputFromStore = () => {
			if (todoStoreInstance.currentTodoProcessing) {
				setText(todoStoreInstance.currentTodoProcessing.content ?? '');
				setBtnTitle('Update');
			} else {
				setText('');
				setBtnTitle('Add');
			}
		};

		// Initial setup
		updateInputFromStore();

		// Set up a MobX reaction
		const disposer =
			todoStoreInstance.subscribeToTodoProcessingChanges(updateInputFromStore);

		// Clean up reaction when component unmounts
		return disposer;
	}, [todoStoreInstance]);

	return (
		<Column>
			<TextInput
				style={styles.input}
				value={text}
				onChangeText={handleChangeText}
				placeholder='Enter todo'
			/>
			<Button title={btnTitle} onPress={handlePressBtn} />
		</Column>
	);
});

const styles = StyleSheet.create({
	input: {
		borderColor: 'gray',
		borderWidth: 0,
		borderRadius: 10,
		marginTop: 20,
		backgroundColor: '#e1ebee',
		padding: 15,
		fontSize: 16,
		marginBottom: 10,
	},
});

export default TodoInput;
