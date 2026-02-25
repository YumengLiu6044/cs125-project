import { useCallback, useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import PageWithIcons from "@/components/PageWithIcons";
import { ArrowLeft } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Text from "@/components/Text";
import { Colors, Layout, Typography } from "@/constants";
import InputField, { InputStyles } from "@/components/InputField";
import Button from "@/components/Button";
import { toast } from "sonner-native";
import Spinner from "@/components/Spinner";
import { AuthApi } from "@/api/authApi";

export default function ResetPassword() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const { token } = useLocalSearchParams<{ token: string }>();

	// Form states
	const [password, setPassword] = useState("");

	// Error states
	const [passwordError, setPasswordError] = useState(false);

	const [passwordFieldVariant, setPasswordFieldVariant] =
		useState<keyof typeof InputStyles>("passwordHide");

	const handlePasswordChange = useCallback((text: string) => {
		setPassword(text);
		setPasswordError(false);
	}, []);

	const handlePasswordToggle = useCallback(() => {
		setPasswordFieldVariant((prev) =>
			prev === "passwordHide" ? "passwordShow" : "passwordHide",
		);
	}, []);

	const updatePassword = useCallback(async () => {
		if (token && token.length) {
			AuthApi.resetPassword(password, token)
				.then((e) => {
					if (e.status === 200) {
						toast.success("Password reset!");
					} else {
						toast.error("Failed to update password");
					}
				})
				.catch((e) => toast.error(e.message));
		} else {
			toast.error("Token is not valid");
		}
	}, [token, password]);

	return (
		<PageWithIcons
			leftIcon={<ArrowLeft></ArrowLeft>}
			onLeftIconClick={() => router.replace("/(auth)")}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={styles.outerView}>
					<Text size={Typography.fontSize["4xl"]} weight="bold">
						Reset password
					</Text>
					<Text color={Colors.gray[600]}>
						Set the new password for your account.
					</Text>
					<View>
						<Text style={styles.inputLabel}>New Password</Text>
						<InputField
							variant={passwordFieldVariant}
							value={password}
							onChangeText={handlePasswordChange}
							hasError={passwordError}
							onPressIcon={handlePasswordToggle}
							onEndEditing={updatePassword}
						></InputField>
					</View>

					<Button
						onPress={updatePassword}
						disabled={isLoading}
						icon={isLoading && <Spinner></Spinner>}
					>
						Reset Password
					</Button>
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
});
