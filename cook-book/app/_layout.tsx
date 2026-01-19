import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	useFonts,
	DMSans_300Light,
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_600SemiBold,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		DMSans_300Light,
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_600SemiBold,
		DMSans_700Bold,
	});
	if (!fontsLoaded) return null;

	return (
		<>
			<Stack screenOptions={{ headerShown: false }}></Stack>
			<StatusBar style="dark" />
		</>
	);
}
