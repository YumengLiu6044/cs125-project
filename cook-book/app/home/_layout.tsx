import { Colors } from "@/constants";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				animation: "none",
			}}
		>
			<Stack.Screen name="index"></Stack.Screen>
		</Stack>
	);
}
