import React, { useCallback, useState } from "react";
import {
	ActivityIndicator,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import PageWithIcons from "@/components/PageWithIcons";
import { ArrowLeft, createLucideIcon, Loader2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import Text from "@/components/Text";
import Link from "@/components/Link";
import { Layout, Typography } from "@/constants/theme";
import InputField, { InputStyles } from "@/components/InputField";
import Button from "@/components/Button";
import { toast } from "sonner-native";
import Spinner from "@/components/Spinner";
import { supabase } from "@/lib/supabase";

createLucideIcon;
export default function Login() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	// Form states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Error states
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [passwordFieldVariant, setPasswordFieldVariant] =
		useState<keyof typeof InputStyles>("passwordHide");

	const handleLogin = useCallback(() => {
		Keyboard.dismiss();

		// Reset errors
		setEmailError(false);
		setPasswordError(false);

		let hasError = false;

		if (!email.length) {
			setEmailError(true);
			toast.error("Email is required");
			hasError = true;
		}
		if (!password.length) {
			setPasswordError(true);
			toast.error("Password is required");
			hasError = true;
		}

		if (hasError) return;

		setIsLoading(true);

		supabase.auth
			.signInWithPassword({ email, password })
			.then((e) => {
				if (e.error !== null) {
					toast.error(e.error.message);
					return;
				}

				router.replace("/home");
			})
			.catch((e) => {
				toast.error(e);
			})
			.finally(() => setIsLoading(false));
	}, [email, password]);

	const handlePasswordToggle = useCallback(() => {
		setPasswordFieldVariant((prev) =>
			prev === "passwordHide" ? "passwordShow" : "passwordHide",
		);
	}, []);

	const handleEmailChange = useCallback((text: string) => {
		setEmail(text);
		setEmailError(false);
	}, []);

	const handlePasswordChange = useCallback((text: string) => {
		setPassword(text);
		setPasswordError(false);
	}, []);

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
							value={email}
							onChangeText={handleEmailChange}
							hasError={emailError}
							autocomplete="email"
							textContentType="emailAddress"
						></InputField>
					</View>

					<View>
						<Text style={styles.inputLabel}>Password</Text>
						<InputField
							variant={passwordFieldVariant}
							value={password}
							onChangeText={handlePasswordChange}
							hasError={passwordError}
							onPressIcon={handlePasswordToggle}
						></InputField>
					</View>

					<Link href="/auth/forgot">Forgot Password?</Link>

					<Button
						onPress={handleLogin}
						disabled={isLoading}
						icon={isLoading && <Spinner></Spinner>}
					>
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
	loaderIcon: {},
});
