// InputField.tsx
import React from "react";
import { TextInput, TextInputProps, View, StyleSheet } from "react-native";
import { CircleCheck, Eye, EyeOff, Info } from "lucide-react-native";
import { Colors } from "@/constants/theme";

interface InputFieldProps {
	value?: string;
	placeholder?: string;
	onChangeText?: (text: string) => void;
	variant?: keyof typeof InputStyles;
	textContentType?: TextInputProps["textContentType"];
	autocomplete?: TextInputProps["autoComplete"];
}

export default function InputField({
	value,
	placeholder,
	onChangeText,
	variant = "default",
	textContentType = "none",
	autocomplete,
}: InputFieldProps) {
	const currentStyle = InputStyles[variant];

	return (
		<View style={[styles.container, currentStyle.container]}>
			<TextInput
				value={value}
				placeholder={placeholder}
				onChangeText={onChangeText}
				placeholderTextColor={Colors.gray[400]}
				style={[styles.input, currentStyle.input]}
				secureTextEntry={variant === "passwordHide"}
				textContentType={textContentType}
				autoComplete={autocomplete}
			/>
			{currentStyle.Icon && (
				<View style={styles.iconWrapper}>{currentStyle.Icon}</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		position: "relative",
	},
	input: {
		width: "100%",
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 20,
		paddingRight: 40, // space for icon
		fontSize: 16,
		color: Colors.black,
	},
	iconWrapper: {
		position: "absolute",
		right: 16,
		top: "50%",
		transform: [{ translateY: -10 }], // vertically center assuming icon ~20px
	},
});

// Styles adapted from Tailwind-like system
const InputStyles = {
	default: {
		container: {},
		input: {
			borderWidth: 1,
			borderColor: Colors.gray[200],
			backgroundColor: Colors.white,
      paddingRight: 20
		},
		Icon: null,
	},
	success: {
		container: {},
		input: {
			borderWidth: 1,
			borderColor: Colors.green[500],
			backgroundColor: Colors.white,
		},
		Icon: <CircleCheck size={20} color={Colors.green[500]} />,
	},
	error: {
		container: {},
		input: {
			borderWidth: 1,
			borderColor: Colors.red[500],
			backgroundColor: Colors.white,
		},
		Icon: <Info size={20} color={Colors.red[500]} />,
	},
	passwordShow: {
		container: {},
		input: {
			borderWidth: 1,
			borderColor: Colors.gray[200],
			backgroundColor: Colors.white,
		},
		Icon: <Eye size={20} color={Colors.black} />,
	},
	passwordHide: {
		container: {},
		input: {
			borderWidth: 1,
			borderColor: Colors.gray[200],
			backgroundColor: Colors.white,
		},
		Icon: <EyeOff size={20} color={Colors.black} />,
	},
} as const;
