import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  GestureResponderEvent,
} from "react-native";
import CustomTextInput from "../../components/auth/custom_input";
import { Button } from "@rneui/themed";
import { auth } from "../../services/auth";
import { AuthMode } from "../../data/enums";
import { AccountDataType } from "../../data/types";
import { useDispatch } from "react-redux";
import { set } from "../../store/session_slice";

export default function SignUpScreen() {
  const initAccountData: AccountDataType = {
    email: "",
    password: "",
  };

  const [accountData, setAccountData] =
    useState<AccountDataType>(initAccountData);

  const [loading, setLoading] = useState<boolean>(false);

  function updateEmailField(email: string): void {
    setAccountData({ ...accountData, ["email"]: email });
  }

  function updatePasswordField(password: string): void {
    setAccountData({ ...accountData, ["password"]: password });
  }

  const dispatch = useDispatch();

  async function signUpHandler() {
    setLoading(true);
    try {
      const user = await auth(
        accountData.email,
        accountData.password,
        AuthMode.signUp,
      );
      dispatch(set({ token: user.token, uid: user.id }));
    } catch (e) {
      console.log("Sign up error:" + e);
    }
    setLoading(false);
  }

  return (
    <View style={styles.view}>
      <View style={{ marginVertical: 20 }}>
        <ScrollView>
          <Text style={styles.title}>Lets create your account</Text>

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
                label="Repeat your email"
                props={{
                  placeholder: "hello@gmail.com",
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <CustomTextInput
                label="Choose a password"
                props={{
                  placeholder: "*******",
                  secureTextEntry: true,
                  onChangeText: updatePasswordField,
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomTextInput
                label="Repeat your password"
                props={{
                  secureTextEntry: true,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: "#f9fffd" }}
        radius="xl"
        title="Sign up"
        loading={loading}
        onPress={signUpHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "400",
    paddingBottom: 40,
    paddingTop: 20,
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 14,
  },

  view: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "center",
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  inputWrapper: {
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  button: {
    paddingHorizontal: 23,
    backgroundColor: "#0cdc8c",
  },
});
