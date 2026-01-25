import React from "react";
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import PageWithIcons from "@/components/PageWithIcons";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import Text from "@/components/Text";
import Link from "@/components/Link";
import { Layout, Typography } from "@/constants/theme";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function Register() {
	const router = useRouter();

	return (
		<PageWithIcons
			leftIcon={<ArrowLeft></ArrowLeft>}
			onLeftIconClick={router.back}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={styles.outerView}>
					<Text size={Typography.fontSize["4xl"]} weight="bold">
						Sign Up
					</Text>
					<View>
						<Text style={styles.inputLabel}>Full Name</Text>
						<InputField
							autocomplete="name"
							textContentType="name"
						></InputField>
					</View>
					<View>
						<Text style={styles.inputLabel}>Email</Text>
						<InputField
							autocomplete="email"
							textContentType="emailAddress"
						></InputField>
					</View>

					<View>
						<Text style={styles.inputLabel}>Password</Text>
						<InputField variant="passwordHide"></InputField>
					</View>


					<Button variant="muted" disabled>
						Create an Account
					</Button>

					<View style={styles.notAMember}>
						<Text>
							Already a member?{" "}
							<Link href="/auth/login" replace>
								Login
							</Link>
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</PageWithIcons>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		fontFamily: Typography.fontFamily.semibold,
		margin: Layout.margin.xs,
	},
	outerView: {
		gap: Layout.gap.md,
		flex: 1,
	},
	notAMember: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
});
