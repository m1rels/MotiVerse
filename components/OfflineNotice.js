import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";

import AppText from "./AppText";
import { useTheme } from "@react-navigation/native";

function OfflineNotice(props) {
  const { colors } = useTheme();
  const netInfo = useNetInfo();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Update visibility when network status changes
    if (netInfo.isConnected === false) {
      setIsVisible(true);
    }
  }, [netInfo.isConnected]);

  if (
    isVisible &&
    netInfo.type !== "unknown" &&
    netInfo.isInternetReachable === false
  )
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText>No Internet Connection</AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="close"
            color={colors.text}
            size={20}
            onPress={() => toggleVisibility()}
          />
        </View>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#18d690",
    height: 50,
    position: "absolute",
    alignItems: "center",
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 1,
    paddingHorizontal: 10, // Optional: Add some padding to the right for better spacing
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    flex: 0,
  },
});

export default OfflineNotice;
