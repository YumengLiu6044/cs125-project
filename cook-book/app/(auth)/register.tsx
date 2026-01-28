import React, { useCallback, useEffect, useState } from "react";
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
import InputField, { InputStyles } from "@/components/InputField";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { toast } from "sonner-native";
import { supabase } from "@/lib/supabase";

export default function Register() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	// Form states
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Error states
	const [fullNameError, setFullNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [passwordFieldVariant, setPasswordFieldVariant] =
		useState<keyof typeof InputStyles>("passwordHide");

	const handlePasswordToggle = useCallback(() => {
		setPasswordFieldVariant((prev) =>
			prev === "passwordHide" ? "passwordShow" : "passwordHide",
		);
	}, []);

	const handleRegister = useCallback(() => {
		Keyboard.dismiss();

		router.navigate("/welcome")
		return

		// Reset errors
		setFullNameError(false);
		setEmailError(false);
		setPasswordError(false);

		let hasError = false;

		if (!fullName.length) {
			setFullNameError(true);
			toast.error("Full name is required");
			hasError = true;
		}
		if (!email.length) {
			setEmailError(true);
			toast.error("Email is required");
			hasError = true;
		}
		if (!password.length) {
			setPasswordError(true);
			toast.error("Password is required");
			hasError = true;
		} else if (password.length < 6) {
			setPasswordError(true);
			toast.error("Password must be at least 6 characters");
			hasError = true;
		}

		if (hasError) return;

		setIsLoading(true);

		supabase.auth
			.signUp({
				email,
				password,
				options: {
					data: {
						full_name: fullName,
					},
				},
			})
			.then((res) => {
				if (res.error) {
					toast.error(res.error.message);
					return;
				}

				router.navigate("/welcome");
			})
			.catch((e) => {
				toast.error(e?.message ?? "Something went wrong");
			})
			.finally(() => setIsLoading(false));
	}, [fullName, email, password]);

	const handleFullNameChange = useCallback((text: string) => {
		setFullName(text);
		setFullNameError(false);
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
		<PageWithIcons leftIcon={<ArrowLeft />} onLeftIconClick={router.dismissAll}>
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
							value={fullName}
							onChangeText={handleFullNameChange}
							hasError={fullNameError}
							autocomplete="name"
							textContentType="name"
						/>
					</View>

					<View>
						<Text style={styles.inputLabel}>Email</Text>
						<InputField
							value={email}
							hasError={emailError}
							onChangeText={handleEmailChange}
							autocomplete="email"
							textContentType="emailAddress"
						/>
					</View>

					<View>
						<Text style={styles.inputLabel}>Password</Text>
						<InputField
							hasError={passwordError}
							variant={passwordFieldVariant}
							value={password}
							onChangeText={handlePasswordChange}
							onPressIcon={handlePasswordToggle}
						/>
					</View>

					<Button
						onPress={handleRegister}
						disabled={isLoading}
						icon={isLoading && <Spinner />}
					>
						Create an Account
					</Button>

					<View style={styles.notAMember}>
						<Text>
							Already a member?{" "}
							<Link href="/(auth)/login" replace>
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
