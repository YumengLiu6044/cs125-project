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

export default function WelcomeSlides() {
	const [stepIndex, setStepIndex] = useState(0);
	const router = useRouter();

	const { width: screenWidth } = useDeviceContext();

	const step = welcomeSteps[stepIndex];

	const isLastStep = stepIndex === welcomeSteps.length - 1;

	const handleLeftArrowClick = useCallback(() => {
		if (stepIndex === 0) router.dismissAll();
		setStepIndex((prev) => Math.max(0, prev - 1));
	}, [stepIndex]);

	const handleNextClick = useCallback(() => {
		if (stepIndex === 2) {
			handleSkip();
			return;
		}
		setStepIndex((prev) => prev + 1);
	}, [stepIndex]);

	const handleSkip = useCallback(() => {
		router.navigate("/(onboarding)/select-diet");
	}, []);

	return (
		<PageWithIcons
			leftIcon={<ArrowLeft></ArrowLeft>}
			onLeftIconClick={handleLeftArrowClick}
			style={styles.outerView}
		>
			{/* Image */}
			<Image
				source={step.image}
				resizeMode="contain"
				style={{
					height: screenWidth * 0.8,
					width: screenWidth * 0.8,
				}}
			/>

			{/* Progress dots */}
			<View style={styles.progressionView}>
				{welcomeSteps.map((_, index) => (
					<View
						key={index}
						style={
							index === stepIndex
								? styles.progressDotActive
								: styles.progressDotInactive
						}
					/>
				))}
			</View>

			{/* Messages */}
			<View style={styles.messagesView}>
				<Text weight="bold" size={32} style={{ textAlign: "center" }}>
					{step.title}
				</Text>
				<Text style={{ textAlign: "center" }} color={Colors.gray[600]}>
					{step.subtitle}
				</Text>
			</View>

			{/* Buttons */}
			<View style={styles.buttonView}>
				<Button onPress={handleNextClick}>
					{isLastStep ? "Get Started" : "Continue"}
				</Button>

				<Button
					variant="simple"
					disabled={isLastStep}
					style={{ opacity: isLastStep ? 0 : 1 }}
					onPress={handleSkip}
				>
					Skip
				</Button>
			</View>
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
