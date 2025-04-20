import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Column from '../components/column';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

const Lesson1 = () => {
	const router = useRouter();

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
			opacity: opacity.value,
			scale: scale.value,
		};
	});

	const [clicked, setClicked] = useState(false);

	const configOption = { duration: 2000 };

	const handleClick = () => {
		translateX.value = withSpring(100, configOption);
		translateY.value = withSpring(400, configOption);
		scale.value = withSpring(0.3, configOption);
		opacity.value = withSpring(0, configOption);
		setClicked(true);
	};

	const handleReset = () => {
		translateX.value = withSpring(0, configOption);
		translateY.value = withSpring(0, configOption);
		scale.value = withSpring(1, configOption);
		opacity.value = withSpring(1, configOption);
		setClicked(false);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Bài học 1',
					headerBackVisible: true,
					headerBackTitle: 'Back',
				}}
			/>
			<Text style={styles.title}>
				React Native Reanimated - Part 1 | Engineer Codewala
			</Text>
			<Column
				style={{ flex: 1, rowGap: 28 }}
				alignItems='center'
				justifyContent='center'
			>
				<Animated.View
					style={[
						{
							width: 100,
							height: 100,
							backgroundColor: 'red',
						},
						animatedStyle,
					]}
				/>
				<TouchableOpacity
					style={{
						backgroundColor: 'pink',
						paddingHorizontal: 24,
						borderRadius: 8,
						paddingVertical: 8,
					}}
					onPress={clicked ? handleReset : handleClick}
				>
					<Text style={{ color: 'white' }}>{clicked ? 'Reset' : 'Click'}</Text>
				</TouchableOpacity>
			</Column>

			<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
				<Text style={styles.backButtonText}>Quay lại danh sách bài học</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
		marginTop: 8,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 24,
		marginBottom: 12,
	},
	content: {
		fontSize: 16,
		lineHeight: 24,
		color: '#333',
	},
	backButton: {
		backgroundColor: '#007bff',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 20,
	},
	backButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
});

export default Lesson1;
