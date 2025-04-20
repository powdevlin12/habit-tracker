import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Redirect, Link } from 'expo-router';

const index = () => {
	return <Redirect href={'/learn'} />;
	// return (
	// 	<View style={styles.container}>
	// 		<Link href={'/todo'} asChild>
	// 			<TouchableOpacity style={styles.button}>
	// 				<Text style={styles.buttonText}>Quản lý công việc</Text>
	// 			</TouchableOpacity>
	// 		</Link>

	// 		<Link href={'/learn'} asChild>
	// 			<TouchableOpacity style={styles.button}>
	// 				<Text style={styles.buttonText}>Danh sách bài học</Text>
	// 			</TouchableOpacity>
	// 		</Link>
	// 	</View>
	// );
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	button: {
		width: '100%',
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginVertical: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

// -> "/"
