import { Pressable, StyleSheet } from "react-native";
import Text from "@/components/Text";
import { capitalizeWords } from "@/util";
import { Colors, Layout } from "@/constants";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export default function OptionItem({
	label,
	selected,
	onPress,
	isPartial = true,
}: {
	label: string;
	selected: boolean;
	onPress: () => void;
	isPartial: boolean;
}) {
	const animationState = useSharedValue(false);
	useEffect(() => {
		animationState.value = selected;
	}, [selected])

	const animatedStyle = useAnimatedStyle(() => ({
		borderColor: withTiming(animationState.value ? Colors.orange[500] : Colors.gray[200], {
			duration: 200
		}),
		backgroundColor: withTiming(animationState.value ? Colors.orange[100] : Colors.white, {
			duration: 200
		}),
	}))
	return (
		<Pressable onPress={onPress}>
			<Animated.View
				style={[
					styles.baseRowOption,
					animatedStyle,
					{
						width: isPartial ? "auto" : "100%",
					},
				]}
			>
				<Text weight="bold">{capitalizeWords(label)}</Text>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	selectedRowOption: {
		borderColor: Colors.orange[500],
		backgroundColor: Colors.orange[100],
	},
	baseRowOption: {
		paddingHorizontal: Layout.padding.lg,
		paddingVertical: Layout.padding.md,
		borderRadius: Layout.radius.md,
		borderColor: Colors.gray[200],
		borderWidth: Layout.border.md,
		backgroundColor: Colors.white,
		width: "100%",
	},
});
