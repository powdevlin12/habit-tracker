import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Row from '../components/row';
import { useRouter } from 'expo-router';

const Home = () => {
	const [optionActive, setOptionActive] = useState('Today');
	const router = useRouter();
	return (
		<ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
			<Row justifyContent='space-between' alignItems='center'>
				<Ionicons name='logo-foursquare' size={24} color='black' />
				<AntDesign
					name='plus'
					size={24}
					color='black'
					onPress={() => router.push('/home/create')}
				/>
			</Row>
			<Text style={{ marginTop: 5, fontSize: 28, fontWeight: '500' }}>
				Habits
			</Text>

			{/* Button Row */}
			<Row style={{ marginTop: 15 }} gap={10}>
				{['Today', 'Weekly', 'Overall'].map((option, index) => (
					<Pressable
						key={index}
						style={{
							backgroundColor:
								option === optionActive ? '#e0ffff' : 'transparent', // Highlight 'Today' for now
							paddingHorizontal: 10,
							paddingVertical: 10, // Slightly reduced padding
							borderRadius: 25,
							flex: 1, // Make buttons share space equally
						}}
						onPress={() => setOptionActive(option)}
					>
						<Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
							{option}
						</Text>
					</Pressable>
				))}
			</Row>
		</ScrollView>
	);
};

export default Home;

const styles = StyleSheet.create({});
