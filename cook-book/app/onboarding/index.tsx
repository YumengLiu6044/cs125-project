import PageWithIcons from "@/components/PageWithIcons";
import { Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import Text from "@/components/Text"

export default function Index() {
	return (
		<PageWithIcons
			leftIcon={<ArrowLeft></ArrowLeft>}
		>
			<Text>Onboarding</Text>
		</PageWithIcons>
	);
}
