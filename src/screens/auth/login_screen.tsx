import { Button, Input } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import CustomTextInput from "../../components/auth/custom_input";
import {
  RootStackParamList,
  RootStackScreenProps,
} from "../../navigation/types";
import { useState } from "react";
import { AccountDataType } from "../../data/types";
import { auth } from "../../services/auth";
import { AuthMode } from "../../data/enums";
import { useDispatch } from "react-redux";
import { store } from "../../store/store";
import { set } from "../../store/session_slice";

function LoginScreen({
  navigation,
  route,
}: RootStackScreenProps<"LoginScreen">) {
  const initAccountData: AccountDataType = {
    email: "",
    password: "",
  };

  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const [accountData, setAccountData] =
    useState<AccountDataType>(initAccountData);

  const [loading, setLoading] = useState<boolean>(false);

  function updateEmailField(text: string) {
    setAccountData({ ...accountData, ["email"]: text });
  }

  function updatePasswordField(text: string) {
    setAccountData({ ...accountData, ["password"]: text });
  }

  function navigateToSignUp(): void {
    navigation.navigate("SignUpScreen");
  }

  async function onPressHandler() {
    setLoading(true);
    try {
      const user = await auth(
        accountData.email,
        accountData.password,
        AuthMode.signIn,
      );
      dispatch(set({ token: user.token, uid: user.id })); // Dispatch the action with the token
    } catch (error) {
      console.log("Login error:", error); // Handle errors
    }
    setLoading(false);
  }

  return (
    <View style={styles.view}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Leafboard</Text>
        <Text style={styles.subtitle}>Work for your dreams</Text>
      </View>
      <View>
        <View style={styles.inputWrapper}>
          <CustomTextInput
            label="Your email address"
            props={{
              placeholder: "hello@gmail.com",
              onChangeText: updateEmailField,
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <CustomTextInput
            label="Your password"
            props={{
              placeholder: "********",
              secureTextEntry: true,
              onChangeText: updatePasswordField,
            }}
          />
        </View>
      </View>
      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: "#f9fffd" }}
        radius="xl"
        title="Sign in"
        loading={loading}
        onPress={onPressHandler}
      />
      <Pressable onPress={navigateToSignUp}>
        <Text style={styles.signUpText}>Or sign up</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 14,
  },

  view: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  inputWrapper: {
    marginBottom: 30,
  },

  signUpText: {
    fontSize: 14,
    textAlign: "center",
    color: "#000000",
    fontWeight: "200",
    textDecorationLine: "underline",
  },

  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    paddingHorizontal: 23,
    backgroundColor: "#0cdc8c",
  },
});
export default LoginScreen;
