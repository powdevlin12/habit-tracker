import React from 'react';
import { Stack } from 'expo-router';

const TodoLayout: React.FC = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: 'Todo Manager',
					headerStyle: {
						backgroundColor: '#f8f9fa',
					},
					headerTintColor: '#333',
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default TodoLayout;
