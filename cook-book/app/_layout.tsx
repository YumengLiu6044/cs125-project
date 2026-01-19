import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	useFonts,
	DMSans_300Light,
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_600SemiBold,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { Colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isLoggedIn, _] = useState(false);
	const [fontsLoaded] = useFonts({
		DMSans_300Light,
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_600SemiBold,
		DMSans_700Bold,
	});

	useEffect(() => {
		if (fontsLoaded) SplashScreen.hide();
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: Colors.globalBackground },
				}}
			>
				<Stack.Screen name="auth" />

				<Stack.Protected guard={isLoggedIn}></Stack.Protected>
			</Stack>
			<StatusBar style="dark" />
		</>
	);
}