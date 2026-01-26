import { Link, LinkProps } from "expo-router";
import React from "react";

import { StyleSheet } from "react-native";
import { Typography } from "@/constants/theme";

export default function CustomLink({...props}: LinkProps) {
	return (
		<Link {...props} style={[props.style, styles.link]}>
		</Link>
	);
}

const styles = StyleSheet.create({
	link: {
    alignSelf: "flex-start",
		textDecorationLine: "underline",
		fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md
	},
});
