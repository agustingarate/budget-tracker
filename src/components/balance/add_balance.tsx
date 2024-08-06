import { BottomSheet, Button, Input } from "@rneui/base";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Metrics from "../../theme/metrics";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type AddBalance = {
  visible: boolean;
  mode: "add" | "remove";
  onDismiss: () => void;
};

function AddBalance({ visible, mode, onDismiss }: AddBalance) {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaProvider>
        <BottomSheet
          isVisible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => onDismiss()}
        >
          <View style={styles.container}>
            <Text style={styles.title}>
              {mode == "add" ? "ADD INCOME" : "ADD EXPENSE"}
            </Text>
            <Input
              label={"Amount"}
              inputStyle={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              cursorColor="#868686"
              selectionColor="#bad0b5"
            />
            <Input
              label={"Description (60 max)"}
              inputStyle={[styles.input, styles.descriptionInput]}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              multiline={true}
              maxLength={60}
            />
            <Button
              buttonStyle={styles.button}
              titleProps={{}}
              titleStyle={{ color: "#f9fffd" }}
              radius="xl"
              title="Accept"
            />
          </View>
        </BottomSheet>
      </SafeAreaProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 23,
    backgroundColor: "#141414",
  },
  container: {
    backgroundColor: "white",
    padding: 30,
  },
  title: {
    fontSize: 18,
    fontFamily: "Nunito-Bold",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#ececec",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
  },

  descriptionInput: {
    minHeight: 130,
    maxHeight: 80,

    borderRadius: 15,
  },
  backdrop: {},
});
export default AddBalance;
