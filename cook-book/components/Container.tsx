import { Colors } from "@/constants";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const Container = ({
	children,
	style,
}: {
	children?: React.ReactNode;
	style?: ViewStyle;
}) => {
	return (
		<SafeAreaProvider style={styles.container}>
			<SafeAreaView style={[styles.container, style]}>
				{children}
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.globalBackground,
	},
});
