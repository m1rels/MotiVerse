import React from "react";
import Screen from "../components/Screen";
import { View, Text, Image, StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function HomeScreen(props) {
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
        <View style={{ alignItems: "flex-end", paddingHorizontal: 10 }}>
        <Feather name="moon" size={25} style={{ borderWidth: 2, borderRadius: 10, padding: 5 }} />
        </View>
      <View style={styles.container}>
        <AppText style={[{ marginBottom: 20 }, styles.text]}>
          Quote of the day:
        </AppText>
        <Image
          style={styles.image}
        />
        <Text style={[{ fontSize: 18, fontFamily: "NunitoBold" }, styles.text]}>
          David Gobbins
        </Text>
        <View style={{ marginVertical: 40 }}>
          <Text
            style={[{ fontFamily: "BebasNeue", fontSize: 32 }, styles.text]}
          >
            "They don't know me, son!"
          </Text>
          <Text
            style={[
              { fontFamily: "NunitoSemiBold", fontSize: 14 },
              styles.text,
            ]}
          >
            inspired by zenquotes.com
          </Text>
        </View>
        <View style={styles.button}>
        <AppButton label="Notifications" />
        </View>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50
  },  
  text: {
    textAlign: "center",
  },
  image: {
    backgroundColor: "grey",
    height: 100,
    width: 100,
    borderRadius: 100,
    marginVertical: 20
  },
  button: {
    marginVertical: 20
  },
});

export default HomeScreen;
