import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
        animation: "none"
			}}
		>
			<Stack.Screen name="index"></Stack.Screen>
			<Stack.Screen name="login"></Stack.Screen>
			<Stack.Screen name="register"></Stack.Screen>
		</Stack>
	);
}
