import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

const Lesson3 = () => {
	const router = useRouter();
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const gestureHandler = Gesture.Pan()
		.onChange(event => {
			translateX.value += event.changeX;
			translateY.value += event.changeY;
		})
		.onEnd(() => {
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
		};
	});

	return (
		<GestureHandlerRootView style={styles.container}>
			<Stack.Screen options={{ title: 'Bài học 3' }} />
			<Text style={styles.title}>
				React Native Gesture Handler with Reanimated - DraggableComponent
				(Part3) | Engineer Codewala
			</Text>

			<View style={{ flex: 1 }}>
				<GestureDetector gesture={gestureHandler}>
					<Animated.View
						style={[
							{ width: 100, height: 100, backgroundColor: 'red' },
							animatedStyle,
						]}
					/>
				</GestureDetector>
			</View>

			<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
				<Text style={styles.backButtonText}>Quay lại danh sách bài học</Text>
			</TouchableOpacity>
		</GestureHandlerRootView>
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
	codeBlock: {
		backgroundColor: '#f5f5f5',
		padding: 16,
		borderRadius: 8,
		marginVertical: 12,
	},
	code: {
		fontFamily: 'monospace',
		fontSize: 14,
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

export default Lesson3;
