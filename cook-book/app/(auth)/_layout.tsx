import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "none",
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					animation: "slide_from_right",
					gestureEnabled: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name="login"
				options={{
					animation: "slide_from_right",
					gestureEnabled: true,
				}}
			></Stack.Screen>
			<Stack.Screen
				name="register"
				options={{
					gestureEnabled: true,
					animation: "slide_from_right",
				}}
			></Stack.Screen>
			<Stack.Screen
				name="forgot-password"
				options={{
					gestureEnabled: true,
					animation: "slide_from_right",
				}}
			></Stack.Screen>
			<Stack.Screen
				name="reset-password"
				options={{
					gestureEnabled: true,
					animation: "slide_from_right",
				}}
			></Stack.Screen>
		</Stack>
	);
}
