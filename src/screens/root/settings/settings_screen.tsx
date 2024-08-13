import { StyleSheet, View } from "react-native";
import { BTButton } from "../../../components/globals/button";
import { useDispatch, useSelector } from "react-redux";
import { clearSession, selectUser } from "../../../store/session_slice";

function SettingsScreen() {
  const sessionSelector = useSelector(selectUser);
  const sessionDispatch = useDispatch();
  function onCloseSession() {
    sessionDispatch(clearSession());
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
