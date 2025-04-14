import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
	Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Row from '../components/row';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Define a list of colors
const COLORS = [
	'#FF5733', // Red-Orange
	'#FFC300', // Vivid Yellow
	'#DAF7A6', // Light Green
	'#33FF57', // Bright Green
	'#33D4FF', // Light Blue
	'#3357FF', // Bright Blue
	'#C70039', // Crimson
	'#900C3F', // Dark Red
	'#581845', // Dark Purple
	'#FFBD33', // Orange
	'#A6FF33', // Lime Green
	'#33FFA6', // Turquoise
];

const REPEAT = ['Daily', 'Weekly', 'Monthly']; // Example repeat options

const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]; // Example days of the week

const CreateHabitScreen = () => {
	// Renamed component for clarity
	const [habitName, setHabitName] = useState('');
	const [selectedColor, setSelectedColor] = useState(COLORS[0]); // Default to first color
	const [title, setTitle] = useState('');
	const router = useRouter();

	const addHabit = async () => {
		try {
			const habitDetails = {
				title,
				color: selectedColor,
				repeatMode: 'daily', // Default to daily
				reminder: true,
			};

			const response = await axios.post(
				'http://localhost:3000/habits', // Replace with your API endpoint
				habitDetails,
			);

			if (response.status === 201) {
				console.log('Habit created successfully:', response.data);
				Alert.alert('Success', 'Habit created successfully!');
				setTitle('');
			}
		} catch (error) {
			Alert.alert('Error', (error as any)?.message ?? 'An error occurred');
			console.error('Error creating habit:', error);
		}
	};

	return (
		<View style={styles.container}>
			<Row style={{ alignItems: 'center' }}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name='arrow-back-outline' size={24} color='black' />
				</Pressable>
			</Row>
			<Text style={{ fontSize: 28, fontWeight: '500', marginTop: 10 }}>
				Create Habit
			</Text>
			<TextInput
				style={styles.textInput}
				placeholder='Habit name'
				autoCapitalize='sentences' // Better default for habit names
				autoCorrect={false}
				returnKeyType='done'
				value={title}
				onChangeText={setTitle}
				// onSubmitEditing can be added later if needed
			/>

			{/* Color Selection */}
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Color</Text>
				<Row style={styles.colorRow} flexWrap='wrap' gap={10}>
					{COLORS.map(color => (
						<Pressable
							key={color}
							style={[
								styles.colorCircle,
								{ backgroundColor: color },
								selectedColor === color && styles.selectedColorCircle, // Add border if selected
							]}
							onPress={() => setSelectedColor(color)}
						/>
					))}
				</Row>
			</View>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Repeat</Text>
				<Row gap={12}>
					{REPEAT.map((repeat, index) => (
						<Pressable
							key={index}
							style={{
								padding: 10,
								backgroundColor: '#e1ebee',
								borderRadius: 10,
								marginVertical: 5,
								flex: 1,
							}}
							onPress={() => console.log(`Selected: ${repeat}`)}
						>
							<Text style={{ fontSize: 14, textAlign: 'center' }}>
								{repeat}
							</Text>
						</Pressable>
					))}
				</Row>
			</View>
			<View style={styles.sectionContainer}>
				<Row justifyContent='space-between' alignItems='center'>
					<Text style={styles.sectionTitle}>Reminder</Text>
					<Text style={{ fontSize: 17, fontWeight: '500', color: '#2774ae' }}>
						Yes
					</Text>
				</Row>
			</View>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>On these days</Text>
				<Row justifyContent='space-between' gap={6}>
					{DAYS.map((day, index) => (
						<Pressable
							key={index}
							style={{
								padding: 10,
								borderRadius: 10,
								marginVertical: 5,
								flex: 1,
								backgroundColor: '#e0e0e0',
							}}
							onPress={() => console.log(`Selected: ${day}`)}
						>
							<Text
								style={{
									fontSize: 14,
									textAlign: 'center',
								}}
							>
								{day[0]}
							</Text>
						</Pressable>
					))}
				</Row>
			</View>
			<View style={styles.sectionContainer}>
				<Pressable
					style={{
						backgroundColor: '#00428c',
						padding: 14,
						borderRadius: 8,
					}}
					onPress={addHabit}
				>
					<Text
						style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
					>
						SAVE
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default CreateHabitScreen; // Export renamed component

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 10, // Add some top padding
		backgroundColor: 'white', // Assuming white background
	},
	textInput: {
		borderColor: 'gray',
		borderWidth: 0, // Keep borderless look
		borderRadius: 10,
		marginTop: 20,
		backgroundColor: '#e1ebee',
		padding: 15,
		fontSize: 16, // Slightly larger font
	},
	sectionContainer: {
		marginTop: 12,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 10,
	},
	colorRow: {
		// Uses Row component props like flexWrap and gap
	},
	colorCircle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderWidth: 2,
		borderColor: 'transparent', // Default border
	},
	selectedColorCircle: {
		borderColor: 'gray', // Highlight selected color
	},
});
