import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StringOmit } from "@rneui/base";
import { useSelector } from "react-redux";
import { selectUser } from "../../../src/store/session_slice";

export default function RootTabLayout() {
  function getIconName(name: string) {
    switch (name) {
      case "index":
        return "home-outline";

      case "search":
        return "search-outline";

      case "plans":
        return "grid-outline";

      case "settings":
        return "settings-outline";
    }
  }
  const token = useSelector(selectUser).token;
  console.log("(APP)(TABS) _layout");
  if (!token) {
    return <Redirect href="/signin" />;
  }
  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      ></Tabs.Screen>
      <Tabs.Screen name="plans" options={{ title: "Plans" }}></Tabs.Screen>
      <Tabs.Screen name="search" options={{ title: "Search" }}></Tabs.Screen>
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings" }}
      ></Tabs.Screen>
    </Tabs>
  );
}
