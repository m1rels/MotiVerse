import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

function AppText({ children, style }) {
  const [fontsLoaded] = useFonts({
    "Nunito": require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <View onLayout={onLayoutRootView} style={style}><Text style={{fontFamily: "Nunito", fontSize: 16}}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  
});

export default AppText;
