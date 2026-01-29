import React, { ReactNode } from "react";
import {
	Pressable,
	View,
	StyleSheet,
	GestureResponderEvent,
	ViewStyle,
} from "react-native";
import Text from "./Text";
import { Colors, Layout } from "@/constants";

interface ButtonProps {
	onPress?: (event: GestureResponderEvent) => void;
	children?: ReactNode;
	variant?: keyof typeof ButtonStyles;
	style?: ViewStyle;
	icon?: ReactNode | (() => ReactNode);
	disabled?: boolean;
}

export default function Button({
	onPress,
	variant = "primary",
	icon,
	disabled = false,
	style,
	children,
}: ButtonProps) {
	const selectedStyle = ButtonStyles[variant];

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.base,
				selectedStyle.pressable,
				pressed && selectedStyle.pressablePressed,
				disabled && styles.disabled,
				style,
			]}
		>
			{icon && <View>{typeof icon === "function" ? icon() : icon}</View>}
			<Text weight="bold" style={[styles.text, selectedStyle.text]}>
				{children}
			</Text>
		</Pressable>
	);
}

// Base styles
const styles = StyleSheet.create({
	base: {
		flexDirection: "row-reverse",
		alignItems: "center",
		justifyContent: "center",
		gap: Layout.gap.sm,
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 24,
	},
	text: {
		fontSize: 16,
		color: Colors.white,
	},
	disabled: {
		opacity: 0.6,
	},
});

const ButtonStyles = {
	primary: {
		pressable: { backgroundColor: Colors.orange[500] },
		pressablePressed: { backgroundColor: Colors.orange[600] },
		text: { color: Colors.black },
	},
	simple: {
		pressable: { backgroundColor: "transparent" },
		pressablePressed: { backgroundColor: "transparent" },
		text: { color: Colors.black },
	},
	wire: {
		pressable: {
			borderWidth: 1,
			borderColor: Colors.gray[300],
			backgroundColor: Colors.white,
		},
		pressablePressed: { backgroundColor: Colors.gray[200] },
		text: { color: Colors.black },
	},
	muted: {
		pressable: { backgroundColor: Colors.gray[300] },
		pressablePressed: { backgroundColor: Colors.gray[400] },
		text: { color: Colors.gray[500] },
	},
} as const;
