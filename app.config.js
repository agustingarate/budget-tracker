const IS_PROD = process.env.APP_VARIANT === "production";

export default {
  expo: {
    name: IS_PROD ? "budget-tracker" : "budget-tracker STG",
    slug: "budget-tracker",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: IS_PROD ? "#28ff3a" : "#ff0000",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_PROD
        ? "com.agarate.budget_tracker"
        : "com.agarate.budget_tracker.stg",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: IS_PROD ? "#31ef07" : "#ff0000",
      },
      package: IS_PROD
        ? "com.agarate.budget_tracker"
        : "com.agarate.budget_tracker.stg",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Nunito-Bold.ttf",
            "./assets/fonts/Nunito-Light.ttf",
            "./assets/fonts/Nunito-Medium.ttf",
            "./assets/fonts/Nunito-Regular.ttf",
          ],
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "6831b123-72fa-4689-9937-ba424e64389d",
      },
    },
  },
};
