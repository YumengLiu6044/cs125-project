import { Pressable, StyleSheet, View } from "react-native";
import { Container } from "./Container";
import { Layout } from "@/constants/theme";
import { ReactNode } from "react";

interface PageWithIconsProps {
	children?: ReactNode;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;

	onLeftIconClick?: () => void;
	onRightIconClick?: () => void;
}

export default function PageWithIcons({
	children,
	leftIcon,
	rightIcon,
	onLeftIconClick,
	onRightIconClick,
}: PageWithIconsProps) {
	return (
		<Container style={styles.outerView}>
			<View style={styles.iconView}>
				<Pressable onPress={onLeftIconClick}>{leftIcon}</Pressable>
				<View style={styles.spacerView}></View>
				<Pressable onPress={onRightIconClick}>{rightIcon}</Pressable>
			</View>
			<View style={styles.contentView}>{children}</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	outerView: {
		padding: Layout.padding.md,
		display: "flex",
		flexDirection: "column",
	},
	iconView: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	contentView: {
		display: "flex",
		flex: 1,
	},
	spacerView: {
		display: "flex",
		flex: 1,
	},
});
