import { Redirect, SplashScreen, Stack, useRouter } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { persistor, store } from "../src/store/store";
import { useFonts } from "expo-font";

// Componente principal de la aplicación

export default function Root() {
  console.log("() _layout");

  const [loaded, error] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
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
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </Provider>
  );
}
