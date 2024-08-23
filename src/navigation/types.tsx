import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type PlanDetailsScreenParams = {
  id: string;
  example: number;
};

export type RootStackParamList = {
  // Home: NavigatorScreenParams<HomeTabParamList>;
  // PostDetails: { id: string };
  // NotFound: undefined;
  //
  Root: NavigatorScreenParams<HomeTabParamList>;
  Login: undefined;
  SignUp: undefined;
  AddPlan: undefined;
  PlanDetail: PlanDetailsScreenParams;
  BudgetDetail: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  Home: undefined;
  Search: undefined;
  Plans: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
