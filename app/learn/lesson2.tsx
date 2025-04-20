import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, {
	Easing,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSpring,
} from 'react-native-reanimated';
import Column from '../components/column';

const Lesson2 = () => {
	const router = useRouter();

	const animatedValue = useSharedValue(0);

	const [clicked, setClicked] = useState(false);

	const animatedStyle = useAnimatedStyle(() => {
		const radius = interpolate(animatedValue.value, [0, 1], [12, 50]);
		const scale = interpolate(animatedValue.value, [0, 1], [1, 2]);
		const rotate = interpolate(animatedValue.value, [0, 1], [0, 360]);
		const backgroundColor = interpolateColor(
			animatedValue.value,
			[0, 1],
			['gray', 'green'],
		);
		return {
			transform: [
				{ translateX: animatedValue.value },
				{ scale: scale },
				{ rotate: `${rotate}deg` },
			],
			borderRadius: radius,
			backgroundColor,
		};
	});

	const startAnimation = () => {
		animatedValue.value = withRepeat(
			withSpring(1, {
				duration: 1400,
				stiffness: 100,
			}),
			-1,
			true,
		);
		setClicked(true);
	};

	const stopAnimation = () => {
		animatedValue.value = withSpring(0, {
			duration: 1000,
		});
		setClicked(false);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Bài học 2' }} />
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>
					React Native Reanimated - Interpolate (Part 2) | Engineer Codewala
				</Text>
				<Column
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						rowGap: 80,
					}}
				>
					<Animated.View
						style={[
							{
								width: 100,
								height: 100,
								backgroundColor: 'blue',
							},
							animatedStyle,
						]}
					/>
					<TouchableOpacity
						onPress={() => {
							clicked ? stopAnimation() : startAnimation();
						}}
						style={{
							backgroundColor: 'red',
							paddingHorizontal: 24,
							borderRadius: 8,
							paddingVertical: 8,
						}}
					>
						<Text style={styles.backButtonText}>
							{clicked ? 'Stop' : 'Loading'}
						</Text>
					</TouchableOpacity>
				</Column>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<Text style={styles.backButtonText}>Quay lại danh sách bài học</Text>
				</TouchableOpacity>
			</View>
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
	codeTag: {
		color: '#0000ff',
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

export default Lesson2;
