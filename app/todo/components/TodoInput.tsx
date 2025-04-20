import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Component } from 'react';
import Column from '../../components/column';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { TodoStore } from '../store/todoStore';
interface TodoInputProps {
	onAdd: (text: string) => void;
	onUpdate: (id: string, newContent: string) => void;
}

@observer
export class TodoInput extends Component<TodoInputProps> {
	disposerReaction!: () => void;
	todoStoreInstance = TodoStore.instance;

	state = {
		text: '',
		btnTitle: 'Add',
	};
	handleChangeText = (text: string) => {
		this.setState({ text });
	};

	handlePressBtn = () => {
		if (this.state.btnTitle === 'Add') {
			this.props.onAdd(this.state.text);
		} else {
			this.props.onUpdate(
				this.todoStoreInstance.currentTodoProcessing?.id ?? '',
				this.state.text,
			);
		}

		this.setState({ text: '' });
		this.todoStoreInstance.setTodoProcessing('');
	};

	componentDidMount(): void {
		this.disposerReaction = reaction(
			() => this.todoStoreInstance.currentTodoProcessing?.id,
			() => {
				console.log('Change todo processing');
				if (this.todoStoreInstance.currentTodoProcessing) {
					this.setState({
						text: this.todoStoreInstance.currentTodoProcessing?.content ?? '',
						btnTitle: 'Update',
					});
				} else {
					this.setState({
						text: '',
						btnTitle: 'Add',
					});
				}
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
				<Button title={this.state.btnTitle} onPress={this.handlePressBtn} />
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
