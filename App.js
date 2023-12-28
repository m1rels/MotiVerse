import React, { useState, useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import themeContext from "./theme/themeContext";
import { DarkMode, LightMode } from "./navigation/navigationTheme";
import OfflineNotice from "./components/OfflineNotice";
import logger from "./utility/logger";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: false }}
      />
    </Stack.Navigator>
  );
};

logger.start();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    loadTheme(); 
  }, []);

  const themeData = { theme, setTheme };

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      logger.log("Error reading theme from AsyncStorage:", error);
    }
  };

  return (
    <themeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === "light" ? LightMode : DarkMode}>
        <OfflineNotice />
        <StackNavigator />
      </NavigationContainer>
    </themeContext.Provider>
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
