import { Colors, Layout } from "@/constants/theme";
import { useDeviceContext } from "@/context/useDeviceContext";
import { useCallback, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { useRouter } from "expo-router";
import PageWithIcons from "@/components/PageWithIcons";
import { ArrowLeft } from "lucide-react-native";

const welcomeSteps = [
	{
		image: require("@/assets/images/welcome-slide-1.png"),
		title: "Personalized meal planning",
		subtitle:
			"Pick your week's meals in minutes. With over 200 personalization options, eat exactly how you want to eat.",
	},
	{
		image: require("@/assets/images/welcome-slide-2.png"),
		title: "Simple, stress-free grocery shopping",
		subtitle:
			'Grocery shop once per week with an organized "done for you" shopping list.',
	},
	{
		image: require("@/assets/images/welcome-slide-3.png"),
		title: "Delicious, healthy meals made easy",
		subtitle:
			"Easily cook healthy, delicious meals in about 30 minutes, from start to finish.",
	},
];

export default function SelectDiet() {
	const [stepIndex, setStepIndex] = useState(0);
	const router = useRouter();

	const handleLeftArrowClick = useCallback(() => {
		if (stepIndex === 0) router.back();
		setStepIndex((prev) => Math.max(0, prev - 1));
	}, [stepIndex]);

	return (
		<PageWithIcons
			leftIcon={<ArrowLeft></ArrowLeft>}
			onLeftIconClick={handleLeftArrowClick}
			style={styles.outerView}
		>
			
		</PageWithIcons>
	);
}

const styles = StyleSheet.create({
	outerView: {
		flex: 1,
		gap: Layout.gap.md,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
	},
	buttonView: {
		width: "100%",
	},
	messagesView: {
		gap: Layout.gap.sm,
		flex: 1,
		justifyContent: "center",
	},
	progressionView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: Layout.gap.md,
	},
	progressDotActive: {
		width: 10,
		height: 10,
		borderRadius: 99,
		backgroundColor: Colors.orange[500],
	},
	progressDotInactive: {
		width: 10,
		height: 10,
		borderRadius: 99,
		backgroundColor: Colors.gray[200],
	},
});
