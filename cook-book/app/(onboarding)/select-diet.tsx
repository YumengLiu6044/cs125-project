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
import { UserApi } from "@/api/userApi";
import OptionItem from "@/components/OptionItem";

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
});



const steps = [
	{
		title: "Pick your diet",
		column: "diet_labels",
		isPartial: false,
	},
	{
		title: "Any allergies?",
		column: "cautions",
		isPartial: true,
	},
	{
		title: "Favorite cousines?",
		column: "cuisine_type",
		isPartial: true,
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
		setStepIndex((prev) => {
			if (prev === steps.length - 1) {
				const requestParam = {
					diet_labels: Array.from(selections.diet_labels),
					cautions: Array.from(selections.cautions),
					cuisine_type: Array.from(selections.cuisine_type)
				}
				UserApi.setSearchPreferences(requestParam)
				.then(() => router.replace("/home/recipes"))
				return prev
			} else {
				return prev + 1
			}
		});
	}, [selections]);

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
			leftIcon={<ArrowLeft color={Colors.black}></ArrowLeft>}
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
						isPartial={currentStep.isPartial}
					/>
				))}
			</ScrollView>

			<Button onPress={handleContinue} style={{ width: "100%" }}>
				Continue
			</Button>
		</PageWithIcons>
	);
}
