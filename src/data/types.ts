import Ionicons from "@expo/vector-icons/Ionicons";
import { Plan } from "./models/plan";

export type IonicIcons = keyof typeof Ionicons.glyphMap;

export type AccountDataType = {
  email: string;
  password: string;
};

export type TransactionType = "income" | "expense";

export type firebasePlanObjectType = {
  total: number;
  plan: Plan[];
};
