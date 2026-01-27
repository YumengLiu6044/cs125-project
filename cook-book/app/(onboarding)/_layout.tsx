import { Stack } from "expo-router";

export default function OnboardingLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="welcome"
				options={{
					animation: "slide_from_right",
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name="select-options"
				options={{
					animation: "slide_from_right",
					gestureEnabled: false,
				}}
			/>
		</Stack>
	);
}
