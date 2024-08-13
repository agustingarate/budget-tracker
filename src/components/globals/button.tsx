import { Button } from "@rneui/themed";
import { IonicIcons } from "../../data/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { StringOmit, ThemeSpacing } from "@rneui/base/dist/helpers";

type BTCircleButtonType = {
  iconName: IonicIcons;
  iconColor?: string;
  iconSize?: number;
  backgroundColor: string;
  radius?: number | StringOmit<keyof ThemeSpacing>;
  onPress?: () => void;
  loading?: boolean;
};

export function BTCircleButton({
  onPress,
  backgroundColor,
  radius,
  iconName,
  iconSize,
  iconColor,
  loading,
}: BTCircleButtonType) {
  return (
    <Button
      loading={loading}
      buttonStyle={[
        BTCircleButtonStyles.button,
        { backgroundColor: backgroundColor },
      ]}
      icon={
        <Ionicons
          name={iconName}
          size={iconSize ?? 20}
          color={iconColor}
        ></Ionicons>
      }
      radius={radius ?? "xl"}
      onPress={onPress}
    />
  );
}

type BTButtonProps = {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  radius?: number | StringOmit<keyof ThemeSpacing>;
  loading?: boolean;
  onPress?: () => void;
};

export function BTButton({
  text,
  backgroundColor,
  textColor,
  radius,
  onPress,
  loading,
}: BTButtonProps) {
  return (
    <Button
      loading={loading}
      buttonStyle={
        backgroundColor
          ? [BTButtonStyles.button, { backgroundColor: backgroundColor }]
          : [BTButtonStyles.button]
      }
      titleStyle={
        textColor
          ? [BTButtonStyles.text, { color: textColor }]
          : [BTButtonStyles.text]
      }
      radius={radius ?? "xl"}
      title={text}
      onPress={onPress}
    />
  );
}

const BTCircleButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#303030",
    marginHorizontal: 8,
  },
  text: {
    color: "#f9f9f9",
  },
});

const BTButtonStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 23,
    backgroundColor: "#0cdc8c",
  },
  text: {
    color: "#f9fffd",
  },
});

export default Button;
