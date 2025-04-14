import React, { ReactNode } from 'react';
import {
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
	FlexStyle,
} from 'react-native';

interface ColumnProps {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
	justifyContent?: FlexStyle['justifyContent']; // Vertical alignment for column
	alignItems?: FlexStyle['alignItems']; // Horizontal alignment for column
	flex?: FlexStyle['flex'];
	gap?: FlexStyle['gap'];
	rowGap?: FlexStyle['rowGap']; // More specific gap for vertical layout
}

const Column: React.FC<ColumnProps> = ({
	children,
	style,
	justifyContent,
	alignItems, // No default alignment needed here usually
	flex,
	gap,
	rowGap,
}) => {
	// Combine base styles, flex props, and custom style prop
	const combinedStyle: StyleProp<ViewStyle> = [
		styles.column,
		{
			justifyContent,
			alignItems,
			flex,
			gap,
			rowGap,
		},
		style, // Apply custom style last to allow overrides
	];

	return <View style={combinedStyle}>{children}</View>;
};

const styles = StyleSheet.create({
	column: {
		flexDirection: 'column',
	},
});

export default Column;
