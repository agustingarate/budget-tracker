import { StyleSheet, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { BTButton } from "../../../src/components/globals/button";
import { selectUser, clearSession } from "../../../src/store/session_slice";
import { useRouter } from "expo-router";

function SettingsScreen() {
  const sessionSelector = useSelector(selectUser);
  const router = useRouter();
  const sessionDispatch = useDispatch();
  function onCloseSession() {
    sessionDispatch(clearSession());
    router.replace("/signin");
  }

  return (
    <View style={styles.view}>
      <BTButton text="Close session" onPress={onCloseSession} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
