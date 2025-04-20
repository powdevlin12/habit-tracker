import React from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';

interface Lesson {
	id: string;
	title: string;
	path: string;
}

const lessons: Lesson[] = [
	{
		id: '1',
		title: 'React Native Reanimated - Part 1 | Engineer Codewala',
		path: '/learn/lesson1',
	},
	{
		id: '2',
		title: 'React Native Reanimated - Interpolate (Part 2) | Engineer Codewala',
		path: '/learn/lesson2',
	},
	{
		id: '3',
		title:
			'React Native Gesture Handler with Reanimated - DraggableComponent (Part3) | Engineer Codewala',
		path: '/learn/lesson3',
	},
];

const LearnIndex = () => {
	const renderItem = ({ item }: { item: Lesson }) => (
		<Link href={item.path} asChild>
			<TouchableOpacity style={styles.lessonItem}>
				<Text style={styles.lessonTitle}>{item.title}</Text>
				<Text style={styles.viewMore}>Xem bài học</Text>
			</TouchableOpacity>
		</Link>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Danh sách bài học</Text>
			<FlatList
				data={lessons}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		padding: 16,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	listContainer: {
		padding: 16,
	},
	lessonItem: {
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	lessonTitle: {
		fontSize: 16,
		fontWeight: '500',
		flex: 1,
	},
	viewMore: {
		color: '#007bff',
		fontWeight: '500',
	},
});

export default LearnIndex;
