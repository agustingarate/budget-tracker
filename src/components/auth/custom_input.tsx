import React, { useState } from "react";
import {
  Pressable,
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type CustomTextInput = {
  label: string;
  props?: TextInputProps;
};
export default function CustomTextInput({ label, props }: CustomTextInput) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(
    props?.secureTextEntry ?? false,
  );

  function onFocus(value: boolean) {
    setIsFocused(value);
  }

  function onIconPressed() {
    setShowText(() => !showText);
  }

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputIconWrapper}>
        {props?.secureTextEntry ? (
          <Pressable style={styles.inputIcon} onPress={onIconPressed}>
            <Ionicons
              style={styles.icon}
              name={showText ? "eye-off-outline" : "eye-outline"}
            />
          </Pressable>
        ) : null}
        <TextInput
          placeholder={props?.placeholder}
          secureTextEntry={showText}
          onBlur={() => onFocus(false)}
          onFocus={() => onFocus(true)}
          onChangeText={props?.onChangeText}
          autoCapitalize={props?.autoCapitalize ?? "none"}
          autoCorrect={props?.autoCorrect ?? false}
          style={[styles.mainInput, isFocused ? styles.focusedInput : null]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputIconWrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    paddingRight: 30,
    zIndex: 10,
  },
  icon: {
    fontSize: 17,
  },
  inputLabel: {
    marginBottom: 10,
    fontWeight: "500",
  },

  mainInput: {
    borderColor: "#bcbcbc",
    borderWidth: 1,
    height: 45,
    borderRadius: 100,
    paddingHorizontal: 15,
    flex: 1,
  },
  focusedInput: {
    borderColor: "#1e1e1e",
  },
});
