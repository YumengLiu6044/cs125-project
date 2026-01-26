import React from "react";
import { Text as RNText, TextProps, StyleProp, TextStyle } from "react-native";

type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";

interface CustomTextProps extends TextProps {
	weight?: FontWeight;
	size?: number;
	style?: StyleProp<TextStyle>;
}

const fontFamilyMap: Record<FontWeight, string> = {
	light: "DMSans_300Light",
	regular: "DMSans_400Regular",
	medium: "DMSans_500Medium",
	semibold: "DMSans_600SemiBold",
	bold: "DMSans_700Bold",
};

export default function CustomText({
	weight = "regular",
	size=16,
	style,
	...props
}: CustomTextProps) {
	const fontFamily = fontFamilyMap[weight];

	return <RNText {...props} style={[{ fontFamily, fontSize: size }, style]} />;
}
