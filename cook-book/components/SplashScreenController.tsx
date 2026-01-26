import { useAuth } from "@/context/AuthContext";
import {
	useFonts,
	DMSans_300Light,
	DMSans_400Regular,
	DMSans_500Medium,
	DMSans_600SemiBold,
	DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
	const { loading: isLoadingAuth } = useAuth();
	const [fontsLoaded] = useFonts({
		DMSans_300Light,
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_600SemiBold,
		DMSans_700Bold,
	});

	useEffect(() => {
		if (fontsLoaded && !isLoadingAuth) SplashScreen.hide();
	}, [fontsLoaded, isLoadingAuth]);

	return null;
}
