import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as Linking from "expo-linking";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/auth/login_screen";
import SignUpScreen from "./src/screens/auth/sign_up_screen";
import HomeScreen from "./src/screens/root/home/home_screen";
import SearchScreen from "./src/screens/root/search/search_screen";
import SettingsScreen from "./src/screens/root/settings/settings_screen";
import { HomeTabParamList, RootStackParamList } from "./src/navigation/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import PlansListScreen from "./src/screens/plans/plans_list_screen";
import PlanDetailScreen from "./src/screens/plans/plan_detail_screen";
import AddPlanScreen from "./src/screens/plans/add_plan.screen";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./src/store/store";
import { selectUser } from "./src/store/session_slice";
import { PersistGate } from "redux-persist/integration/react";

import BudgetDetailScreen from "./src/screens/budget/budget_detail_screen";
import NotFound from "./src/screens/error/not_found/not_found";

const prefix = Linking.createURL("");

/* 
For testing purposes, build in developer mode and run:



npx uri-scheme open budgettrackerstg://budgetDetails --android 
OR
npx uri-scheme open budgettrackerstg://budgetDetails --ios

*/

console.log("prefix", prefix);

const linking = {
  prefixes: [prefix], //from scheme property in app.config.js
  config: {
    screens: {
      Login: "login",
      SignUp: "signup",
      AddPlan: "addPlan",
      PlanDetail: "planDetails/:id",
      BudgetDetail: "budgetDetails",
      Root: {
        path: "",
      },
      NotFound: "*",
    },
  },
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const BottomTab = createBottomTabNavigator<HomeTabParamList>();

  function LoginNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }

  function RootScreen() {
    function getIconName(name: keyof HomeTabParamList) {
      switch (name) {
        case "Home":
          return "home-outline";

        case "Search":
          return "search-outline";

        case "Plans":
          return "grid-outline";

        case "Settings":
          return "settings-outline";
      }
    }
    return (
      <BottomTab.Navigator
        screenOptions={({ navigation, route }) => ({
          tabBarInactiveTintColor: "#767676",
          tabBarActiveTintColor: "#181818",

          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, size }) => {
            const iconName = getIconName(route.name);
            return (
              <Ionicons
                name={iconName}
                size={focused ? size : size - 5}
                color={color}
              />
            );
          },
        })}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <BottomTab.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Search" }}
        />
        <BottomTab.Screen
          name="Plans"
          component={PlansListScreen}
          options={{ title: "Plans" }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </BottomTab.Navigator>
    );
  }

  const [loaded, error] = useFonts({
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  function Screens() {
    const token = useSelector(selectUser).token;

    return (
      <NavigationContainer linking={linking}>
        <StatusBar style="dark" />
        {!token && <LoginNavigator />}
        {token && (
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={RootScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddPlan"
              component={AddPlanScreen}
              options={{
                contentStyle: { backgroundColor: "#fff" },
                title: "Add plan",
              }}
            />
            <Stack.Screen
              name="BudgetDetail"
              component={BudgetDetailScreen}
              options={{ title: "Budget details" }}
            />
            <Stack.Screen
              name="PlanDetail"
              component={PlanDetailScreen}
              options={{ title: "Plan details" }}
            />
            <Stack.Screen
              name="NotFound"
              component={NotFound}
              options={{ title: "Not Found" }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Screens />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
