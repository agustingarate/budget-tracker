import { Button } from "@rneui/themed";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { useLinkTo } from "@react-navigation/native";
import CustomTextInput from "../../src/components/auth/custom_input";
import { AuthMode } from "../../src/data/enums";
import { AccountDataType } from "../../src/data/types";
import { auth } from "../../src/services/auth";
import { set } from "../../src/store/session_slice";
import { useRouter } from "expo-router";

function login() {
  const initAccountData: AccountDataType = {
    email: "",
    password: "",
  };

  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const linkTo = useLinkTo(); //React navigation for web
  const router = useRouter(); //Expo router

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
    // linkTo("/signup");
    router.navigate("/signup");
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
      router.replace("/");
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
export default login;
