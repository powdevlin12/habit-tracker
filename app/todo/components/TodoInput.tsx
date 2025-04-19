import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Component } from 'react';
import Column from '../../components/column';
import { reaction } from 'mobx';
import { todoStore } from '../store/todoStore';

interface TodoInputProps {
	onAdd: (text: string) => void;
}

export class TodoInput extends Component<TodoInputProps> {
	disposerReaction!: () => void;

	state = {
		text: '',
	};
	handleChangeText = (text: string) => {
		this.setState({ text });
	};

	handleAdd = () => {
		this.props.onAdd(this.state.text);
		this.setState({ text: '' });
	};

	componentDidMount(): void {
		this.disposerReaction = reaction(
			() => todoStore.currentTodoProcessing?.id,
			() => {
				console.log('Change todo processing');
			},
		);
	}

	componentWillUnmount() {
		this.disposerReaction?.();
	}

	render() {
		return (
			<Column>
				<TextInput
					style={styles.input}
					value={this.state.text}
					onChangeText={this.handleChangeText}
					placeholder='Enter todo'
				/>
				<Button title='Add' onPress={this.handleAdd} />
			</Column>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: { flexDirection: 'row', marginBottom: 16 },
	input: {
		borderColor: 'gray',
		borderWidth: 0, // Keep borderless look
		borderRadius: 10,
		marginTop: 20,
		backgroundColor: '#e1ebee',
		padding: 15,
		fontSize: 16, // Slightly larger font
	},
});
export default TodoInput;
