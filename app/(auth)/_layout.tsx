import { Redirect, Slot, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/store/session_slice";

export default function AuthLayout() {
  const token = useSelector(selectUser).token;
  if (token) {
    return <Redirect href="/(app)/(tabs)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: "Sign up" }}></Stack.Screen>
    </Stack>
  );
}
