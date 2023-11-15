import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";


function NotificationScreen(props) {

    const [switchActive, setSwitchActive] = useState(false);

    const [fontsLoaded] = useFonts({
        NunitoSemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
        NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
        BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
      });
    
      if (!fontsLoaded) {
        return null;
      }


  return (
    <Screen>
        <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="notifications" size={40} color="black" style={{ marginRight: 10 }} />
        <Text style={{ fontFamily: "NunitoSemiBold", fontSize: 32 }}>Notifications</Text>
      </View>
      <View style={styles.content}>
      <AppText style={styles.text}>
        Don't miss out on your daily dose of motivation and inspiration! Turn on
        notifications to receive powerful quotes that will kickstart your day
        with positivity and purpose.
      </AppText>
      <AppText style={styles.text}>
        Enable notifications now to stay motivated, stay inspired, and stay
        ahead on your journey to success.
      </AppText>
      <AppText style={styles.text}>
        Get started today and turn on notifications – because your daily
        inspiration is just a tap away:
      </AppText>
      </View>
      <View style={styles.switch}>
        <Text style={{ fontSize: 18, fontFamily: "NunitoSemiBold", marginRight: 20 }}>Send Push Notifications</Text>
        <Switch value={switchActive} onValueChange={() => setSwitchActive(!switchActive)} />
      </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      marginTop: 20
    },
    container: {
      paddingHorizontal: 15
    },
    content: {
      marginVertical: 30
    },
    switch: {
      flexDirection: "row",
      marginVertical: 20
    },
    text: {
        marginVertical: 10,
    }
})

export default NotificationScreen;
