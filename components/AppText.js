import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useTheme } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

function AppText({ children, style }) {
  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} >
      <Text style={[{ fontFamily: "Nunito", fontSize: 16, color: colors.text }, style]} >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AppText;
