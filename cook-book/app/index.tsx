import InputField from "@/components/InputField";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.page}>
      <InputField placeholder="Name" autocomplete="name" textContentType="name"></InputField>
      <InputField placeholder="Name" autocomplete="name" textContentType="name" style="error"></InputField>
      <InputField placeholder="Name" autocomplete="name" textContentType="name" style="success"></InputField>
      <InputField placeholder="Name" autocomplete="name" textContentType="name" style="passwordHide"></InputField>
      <InputField placeholder="Name" autocomplete="name" textContentType="name" style="passwordShow"></InputField>

    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  }
})