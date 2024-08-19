import { Redirect, Slot, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../../src/store/session_slice";

import RootTabLayout from "../(tabs)/_layout";

export default function AppLayout() {
  const token = useSelector(selectUser).token;
  if (!token) {
    return <Redirect href="/signin" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="plan/add"
        options={{
          title: "Add plan",
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      />
      <Stack.Screen name="plan/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="budget" options={{ title: "Budget" }}></Stack.Screen>
    </Stack>
  );
}
