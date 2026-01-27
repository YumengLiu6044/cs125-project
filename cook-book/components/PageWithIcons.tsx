import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import { Container } from "./Container";
import { Layout } from "@/constants/theme";
import { ReactNode } from "react";

interface PageWithIconsProps {
	children?: ReactNode;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;

	style?: StyleProp<ViewStyle>;

	onLeftIconClick?: () => void;
	onRightIconClick?: () => void;
}

export default function PageWithIcons({
	children,
	leftIcon,
	rightIcon,
	onLeftIconClick,
	onRightIconClick,
	style,
}: PageWithIconsProps) {
	return (
		<Container style={styles.outerView}>
			<View style={styles.iconView}>
				<Pressable onPress={onLeftIconClick}>
					<View>{leftIcon}</View>
				</Pressable>
				<View style={styles.spacerView}></View>
				<Pressable onPress={onRightIconClick}>
					<View>{rightIcon}</View>
				</Pressable>
			</View>
			<View style={[styles.contentView, style]}>{children}</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	outerView: {
		padding: Layout.padding.md,
		display: "flex",
		flexDirection: "column",
		gap: Layout.gap.sm
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
