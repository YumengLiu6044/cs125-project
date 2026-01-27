import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SplashScreenController } from "@/components/SplashScreenController";

function RootNavigator() {
	const { isLoggedIn } = useAuth();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: Colors.globalBackground,
				},
			}}
		>
			<Stack.Screen name="index"></Stack.Screen>
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
		<AuthProvider>
			<GestureHandlerRootView>
				<Toaster theme="light"></Toaster>
				<RootNavigator></RootNavigator>
				<SplashScreenController></SplashScreenController>
				<StatusBar style="dark" />
			</GestureHandlerRootView>
		</AuthProvider>
	);
}
