import React, { ReactNode } from 'react';
import {
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
	FlexStyle,
	TouchableOpacity,
} from 'react-native';

interface RowProps {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	justifyContent?: FlexStyle['justifyContent'];
	alignItems?: FlexStyle['alignItems'];
	flex?: FlexStyle['flex'];
	flexWrap?: FlexStyle['flexWrap'];
	gap?: FlexStyle['gap'];
	columnGap?: FlexStyle['columnGap']; // More specific gap
	onPress?: () => void; // Optional onPress prop
}

const Row: React.FC<RowProps> = ({
	children,
	style,
	justifyContent,
	alignItems = 'center', // Keep default alignItems if not provided
	flex,
	flexWrap,
	gap,
	columnGap,
	onPress, // Optional onPress prop
}) => {
	// Combine base styles, flex props, and custom style prop
	const combinedStyle: StyleProp<ViewStyle> = [
		styles.row,
		{
			justifyContent,
			alignItems,
			flex,
			flexWrap,
			gap,
			columnGap,
		},
		style, // Apply custom style last to allow overrides
	];

	const Container = onPress ? TouchableOpacity : View;

	return (
		<Container style={combinedStyle} onPress={onPress}>
			{children}
		</Container>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		// alignItems is now handled dynamically via props, with a default
	},
});

export default Row;
