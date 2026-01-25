import React from "react";
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import PageWithIcons from "@/components/PageWithIcons";
import { ArrowLeft, Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import Text from "@/components/Text";
import Link from "@/components/Link";
import { Layout, Typography } from "@/constants/theme";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function Login() {
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
						Login
					</Text>
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

					<Link href="/auth/forgot">Forgot Password?</Link>

					<Button variant="muted" disabled>
						Login
					</Button>

					<View style={styles.notAMember}>
						<Text>
							Not a member?{" "}
							<Link href="/auth/register" replace>
								Sign Up
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
