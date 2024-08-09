import { BottomSheet, Button, Input } from "@rneui/base";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { updateBalance } from "../../services/balance";
import Balance, { Transaction } from "../../data/models/budget";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/session_slice";
import { selectBudget } from "../../store/budget_slice";
import { isLoading } from "expo-font";

type AddBalance = {
  visible: boolean;
  mode: "add" | "remove";
  onDismiss: () => void;
};

function AddBalance({ visible, mode, onDismiss }: AddBalance) {
  const navigation = useNavigation();
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const userSelector = useSelector(selectUser);
  const balanceSelector = useSelector(selectBudget);

  function onChangeAmount(value: string) {
    setAmount(+value);
  }

  function onChangeDescription(value: string) {
    setDescription(value);
  }

  async function onAcceptHandler() {
    setLoading(true);
    const newTransaction = new Transaction(
      +amount,
      description ?? "",
      mode === "add" ? "income" : "expense",
    );

    console.log("balance", balanceSelector.total);

    const amountWithSign =
      newTransaction.type === "income" ? +amount : -+amount;

    await updateBalance(amountWithSign, newTransaction, userSelector.uid ?? "");

    onDismiss();
    setLoading(false);
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <BottomSheet
        isVisible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => onDismiss()}
        modalProps={{ animationType: "fade" }}
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
            onChangeText={onChangeAmount}
            keyboardType="decimal-pad"
          />
          <Input
            label={"Description (60 max)"}
            inputStyle={[styles.input, styles.descriptionInput]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            multiline={true}
            maxLength={60}
            onChangeText={onChangeDescription}
            keyboardType="default"
          />
          <Button
            buttonStyle={styles.button}
            titleProps={{}}
            titleStyle={{ color: "#f9fffd" }}
            radius="xl"
            title="Accept"
            loading={loading}
            onPress={onAcceptHandler}
          />
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
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
