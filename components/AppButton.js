import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useTheme } from "@react-navigation/native";

function AppButton({ label, onPress }) {
  const { colors } = useTheme();

  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.button_backgroundColor },
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="bell-outline"
          size={30}
          color={colors.button_text}
        />
        <Text
          style={{
            fontFamily: "Nunito",
            fontSize: 18,
            color: colors.button_text,
          }}
        >
          {label}
        </Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={colors.button_text}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between",
    columnGap: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default AppButton;
