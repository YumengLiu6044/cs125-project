import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants";
import { SplashScreenController } from "@/components/SplashScreenController";
import useAuthStore from "@/context/authStore";

function RootNavigator() {
	const token = useAuthStore((state) => state.token);
	const isLoggedIn = token !== null && token.length > 0;

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: Colors.globalBackground,
				},
			}}
		>
			<Stack.Screen name="(auth)"></Stack.Screen>
			<Stack.Screen name="(onboarding)"></Stack.Screen>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="home"></Stack.Screen>
			</Stack.Protected>
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<Toaster theme="light"></Toaster>
			<RootNavigator></RootNavigator>
			<SplashScreenController></SplashScreenController>
			<StatusBar style="dark" />
		</GestureHandlerRootView>
	);
}
