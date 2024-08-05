import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/auth/login_screen";
import SignUpScreen from "./src/screens/auth/sign_up_screen";
import HomeScreen from "./src/screens/root/home/home_screen";
import SearchScreen from "./src/screens/root/search/search_screen";
import PlansListScreen from "./src/screens/dream/plans_list_screen";
import SettingsScreen from "./src/screens/root/settings/settings_screen";
import AddPlanScreen from "./src/screens/dream/add_plan.screen";
import PlanDetailScreen from "./src/screens/dream/plan_detail_screen";
import { HomeTabParamList, RootStackParamList } from "./src/navigation/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const BottomTab = createBottomTabNavigator<HomeTabParamList>();

  function LoginNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    );
  }

  function RootScreen() {
    function getIconName(name: keyof HomeTabParamList) {
      switch (name) {
        case "HomeScreen":
          return "home-outline";

        case "SearchScreen":
          return "search-outline";

        case "PlansListScreen":
          return "grid-outline";

        case "SettingsScreen":
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
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home", headerShown: false }}
        />
        <BottomTab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ title: "Search" }}
        />
        <BottomTab.Screen
          name="PlansListScreen"
          component={PlansListScreen}
          options={{ title: "Plans" }}
        />
        <BottomTab.Screen
          name="SettingsScreen"
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

  return (
    <NavigationContainer>
      {/* <LoginNavigator /> */}

      <Stack.Navigator>
        <Stack.Screen
          name="RootScreen"
          component={RootScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddPlanScreen" component={AddPlanScreen} />
        <Stack.Screen name="PlanDetailScreen" component={PlanDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
