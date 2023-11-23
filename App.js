import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import themeContext from "./theme/themeContext";
import { DarkMode, LightMode } from "./navigation/navigationTheme";

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

export default function App() {
  const [theme, setTheme] = useState("Light");

  const themeData = { theme, setTheme };

  return (
    <themeContext.Provider value={themeData}>
      <NavigationContainer theme={theme === "Light" ? DarkMode : LightMode}>
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
