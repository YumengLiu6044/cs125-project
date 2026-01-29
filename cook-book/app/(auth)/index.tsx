import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Text from "@/components/Text";
import { Colors, Layout } from "@/constants";
import Link from "@/components/Link";
import { Image, StyleSheet, View } from "react-native";

export default function Index() {
	return (
		<Container style={styles.outerView}>
			<View style={styles.logoView}>
				<Image
					source={require("@/assets/images/logo.png")}
					style={styles.logoImageStyle}
				></Image>

				<Text size={45} weight="bold">
					Cook Book
				</Text>
			</View>

			<View style={styles.getStartedView}>
				<Link href="/(auth)/register" asChild>
					<Button
						style={styles.getStartedButton}
					>
						Get Started
					</Button>
				</Link>
				<View style={styles.alreadyAMemberView}>
					<Text style={styles.alreadyAMemberText}>
						Already a member?
					</Text>
					<Link href="/(auth)/login">Login</Link>
				</View>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	outerView: {
		flex: 1,
		padding: Layout.padding.md,
	},
	logoView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logoImageStyle: {
		width: 96,
		height: 96,
	},
	logoTextStyle: {
		fontSize: 43,
	},
	getStartedView: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		gap: Layout.gap.sm,
	},
	getStartedButton: {
		width: "100%",
	},
	alreadyAMemberView: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: Layout.gap.xs,
	},
	alreadyAMemberText: {
		color: Colors.gray[500],
	},
});
