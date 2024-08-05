import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  // Home: NavigatorScreenParams<HomeTabParamList>;
  // PostDetails: { id: string };
  // NotFound: undefined;
  //
  RootScreen: NavigatorScreenParams<HomeTabParamList>;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  AddPlanScreen: undefined;
  PlanDetailScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  PlansListScreen: undefined;
  SettingsScreen: undefined;
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
