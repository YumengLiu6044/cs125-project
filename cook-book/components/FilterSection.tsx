import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import OptionItem from "./OptionItem";
import { Colors, DIET_OPTIONS, Layout, Typography } from "@/constants";
import { ChevronRight } from "lucide-react-native";
import { capitalizeWords } from "@/util";
import Text from "./Text";
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface FilterSectionProps {
	style: StyleProp<ViewStyle>;
	filterKey: string;
	selectedOptions: Set<string>;
	onOptionPress: (option: string) => void;
}

export default function FilterSection({
	style,
	filterKey,
	selectedOptions,
	onOptionPress
}: FilterSectionProps) {
	const isExpanded = useSharedValue(false);

	const height = useSharedValue(0);
	const rotation = useSharedValue(0);

	const chevronStyle = useAnimatedStyle(() => ({
		transform: [
			{
				rotateZ: `${rotation.value}deg`,
			},
		],
	}));
	const onPressChevron = () => {
		rotation.value = withTiming(rotation.value === 0 ? 90 : 0, {
			duration: 200,
		});
		isExpanded.value = !isExpanded.value;
	};

	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded.value), {
			duration: 200,
		}),
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<View style={style}>
			<Pressable onPress={onPressChevron} style={styles.centerRow}>
				<Text style={[styles.header2Style, { flex: 1 }]}>
					{capitalizeWords(filterKey, "_")}
				</Text>

				<Animated.View style={chevronStyle}><ChevronRight color={Colors.gray[400]}></ChevronRight></Animated.View>
			</Pressable>

			<Animated.View
				style={[styles.animatedView, bodyStyle, styles.optionsView]}
			>
				<View
					onLayout={(e) => {
						height.value = e.nativeEvent.layout.height;
					}}
					style={[styles.wrapper, styles.optionsView]}
				>
					{DIET_OPTIONS[filterKey as keyof typeof DIET_OPTIONS].map(
						(option, optionIdx) => (
							<OptionItem
								key={optionIdx}
								label={option}
								isPartial={true}
								selected={selectedOptions.has(option)}
								onPress={() => onOptionPress(option)}
							></OptionItem>
						),
					)}
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	optionsView: {
		flexDirection: "row",
		gap: Layout.gap.sm,
		flexWrap: "wrap",
		width: "100%",
	},
	centerRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	header2Style: {
		fontFamily: Typography.fontFamily.bold,
		fontSize: Typography.fontSize["2xl"],
	},
	wrapper: {
		width: "100%",
		display: "flex",
		paddingVertical: Layout.padding.sm,
	},
	animatedView: {
		width: "100%",
		overflow: "hidden",
		display: "flex",
	},
});
