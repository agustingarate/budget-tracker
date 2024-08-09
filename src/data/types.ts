import Ionicons from "@expo/vector-icons/Ionicons";

export type IonicIcons = keyof typeof Ionicons.glyphMap;

export type AccountDataType = {
  email: string;
  password: string;
};

export type TransactionType = "income" | "expense";
