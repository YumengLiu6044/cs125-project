import { Colors, Layout, Typography, DIET_OPTIONS } from "@/constants";
import { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { useRouter } from "expo-router";
import PageWithIcons from "@/components/PageWithIcons";
import { ArrowLeft } from "lucide-react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

const baseRowOption = {
	paddingHorizontal: Layout.padding.lg,
	paddingVertical: Layout.padding.md,
	borderRadius: Layout.radius.md,
	borderColor: Colors.gray[200],
	borderWidth: Layout.border.md,
	backgroundColor: Colors.white,
	width: "100%",
} as ViewStyle;

const styles = StyleSheet.create({
	outerView: {
		flex: 1,
		gap: Layout.gap.md,
		flexDirection: "column",
		alignItems: "flex-start",
	},
	progressView: {
		flexDirection: "row",
		alignItems: "center",
		gap: Layout.gap.sm,
	},
	progressBarActive: {
		height: 15,
		flex: 1,
		borderRadius: 99,
	},
	optionsView: {
		flexDirection: "row",
		gap: Layout.gap.md,
		flexWrap: "wrap",
		width: "100%",
	},
	fullRowOption: baseRowOption,
	partialRowOption: {
		...baseRowOption,
		width: "auto",
	},
	selectedRowOption: {
		borderColor: Colors.orange[500],
		backgroundColor: Colors.orange[100],
	},
});

function capitalizeWords(str: string) {
	if (!str) return "";
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

const steps = [
	{
		title: "Pick your diet",
		column: "diet_labels",
		columnStyle: styles.fullRowOption,
	},
	{
		title: "Any allergies?",
		column: "cautions",
		columnStyle: styles.partialRowOption,
	},
	{
		title: "Favorite cousines?",
		column: "cuisine_type",
		columnStyle: styles.partialRowOption,
	},
];

function ProgressBar({ active }: { active: boolean }) {
	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(
				active ? Colors.green[500] : Colors.gray[400],
				{ duration: 300 },
			),
		};
	});

	return <Animated.View style={[styles.progressBarActive, animatedStyle]} />;
}

const OptionItem = memo(
	({
		label,
		selected,
		onPress,
		style,
	}: {
		label: string;
		selected: boolean;
		onPress: () => void;
		style: ViewStyle;
	}) => (
		<Pressable
			onPress={onPress}
			style={[style, selected && styles.selectedRowOption]}
		>
			<Text weight="bold">{capitalizeWords(label)}</Text>
		</Pressable>
	),
);

export default function SelectDiet() {
	const [stepIndex, setStepIndex] = useState(0);
	const [selections, setSelections] = useState<Record<string, Set<string>>>({
		diet_labels: new Set<string>(),
		cautions: new Set<string>(),
		cuisine_type: new Set<string>(),
	});

	const router = useRouter();

	const handleLeftArrowClick = useCallback(() => {
		if (stepIndex === 0) router.back();
		setStepIndex((prev) => Math.max(0, prev - 1));
	}, [stepIndex]);

	const handleContinue = useCallback(() => {
		setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
	}, []);

	const toggleOption = useCallback(
		(step: (typeof steps)[0], option: string) => {
			setSelections((prev) => {
				const current = new Set(prev[step.column] ?? []);

				if (current.has(option)) {
					current.delete(option);
				} else {
					current.add(option);
				}

				return {
					...prev,
					[step.column]: current,
				};
			});
		},
		[],
	);

	const currentStep = steps[stepIndex];

	return (
		<PageWithIcons
			leftIcon={<ArrowLeft color={"black"}></ArrowLeft>}
			onLeftIconClick={handleLeftArrowClick}
			style={styles.outerView}
		>
			<View style={styles.progressView}>
				{steps.map((_, idx) => (
					<ProgressBar
						key={idx}
						active={idx <= stepIndex}
					></ProgressBar>
				))}
			</View>

			<Text size={Typography.fontSize["4xl"]} weight="bold">
				{currentStep.title}
			</Text>

			{/* Option tags */}
			<ScrollView
				horizontal={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.optionsView}
			>
				{DIET_OPTIONS[
					currentStep.column as keyof typeof DIET_OPTIONS
				].map((option) => (
					<OptionItem
						key={option}
						label={option}
						selected={selections[currentStep.column].has(option)}
						onPress={() => toggleOption(currentStep, option)}
						style={currentStep.columnStyle}
					/>
				))}
			</ScrollView>

			<Button onPress={handleContinue} style={{ width: "100%" }}>
				Continue
			</Button>
		</PageWithIcons>
	);
}
