import React, { useEffect } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	Easing,
} from "react-native-reanimated";
import { Loader2 } from "lucide-react-native";
import { Colors } from "@/constants";

type SpinnerProps = {
	size?: number;
	color?: string;
	duration?: number;
};

export default function Spinner({
	size = 24,
	color = Colors.black,
	duration = 1000,
}: SpinnerProps) {
	const rotation = useSharedValue(0);

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration,
				easing: Easing.linear,
			}),
			-1,
			false,
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<Animated.View style={animatedStyle}>
			<Loader2 size={size} color={color} />
		</Animated.View>
	);
}
