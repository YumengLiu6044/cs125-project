import React, { useCallback, useState } from "react";
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
import { Colors, Layout, Typography } from "@/constants/theme";
import InputField, { InputStyles } from "@/components/InputField";
import Button from "@/components/Button";
import { toast } from "sonner-native";
import Spinner from "@/components/Spinner";
import { supabase } from "@/lib/supabase";

export default function Login() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	// Form states
	const [email, setEmail] = useState("");

	// Error states
	const [emailError, setEmailError] = useState(false);

	const handleSubmit = useCallback(() => {
    if (!email.length) {
      setEmailError(true);
      toast.error("Email address is required");
      return;
    }

    setIsLoading(true);

		supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "cookbook://reset-password"
    })
      .then((e) => {
        if (e.error !== null) {
          toast.error(e.error.message);
        } else {
          toast.success("Password reset link sent!");
        }
      })
      .finally(() => setIsLoading(false))
	}, [email]);

	const handleEmailChange = useCallback((text: string) => {
		setEmail(text);
		setEmailError(false);
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
						Forgot password
					</Text>
					<Text color={Colors.gray[600]}>
						Enter your email for the verification process.
					</Text>
					<View>
						<Text style={styles.inputLabel}>Email Address</Text>
						<InputField
							value={email}
							onChangeText={handleEmailChange}
							hasError={emailError}
							autocomplete="email"
							textContentType="emailAddress"
							onEndEditing={handleSubmit}
						></InputField>
					</View>

					<Button
						onPress={handleSubmit}
						disabled={isLoading}
						icon={isLoading && <Spinner></Spinner>}
					>
						Send Reset Email
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
