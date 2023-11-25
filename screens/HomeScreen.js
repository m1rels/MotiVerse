import React, { useState, useEffect, useContext } from "react";
import Screen from "../components/Screen";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import themeContext from "../theme/themeContext";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import quotesApi from "../api/quotes";
import ActivityIndicator from "../components/ActivityIndicator";

function HomeScreen({ navigation }) {
  const { setTheme, theme } = useContext(themeContext);
  const { colors } = useTheme();
  const [iconType, setIconType] = useState("moon");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

useEffect(() => {
  loadQuotes();
}, [])

  const loadQuotes = async () => {
    setLoading(true);
    const response = await quotesApi.getQuotes();
    setLoading(false);

    if (!response.ok) setError(true);
    
    setError(false);
    setQuotes(response.data);
  }

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
        <Feather
          name={iconType}
          size={25}
          style={{
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors.border,
            padding: 5,
          }}
          onPress={() => {
            setTheme(theme === "Light" ? "Dark" : "Light");
            setIconType(iconType === "moon" ? "sun" : "moon");
          }}
          color={colors.text}
        />
      </View>
      <View style={styles.container}> 
        <AppText style={[{ marginBottom: 10 }, styles.text]}>
          Quote of the day:
        </AppText> 
        {quotes.length > 0 ? (
          <View style={styles.container}>
          <Text
            style={[
              { fontSize: 18, fontFamily: "NunitoBold", color: colors.text },
              styles.text,
            ]}
          >
            {quotes[0].a}
          </Text>
          <View style={{ marginVertical: 40, paddingHorizontal: 20 }}>
            <Text
              style={[
                { fontFamily: "BebasNeue", fontSize: 32, color: colors.text },
                styles.text,
              ]}
            >
             "{quotes[0].q}""
            </Text>   
            <Text
              style={[
                {
                  fontFamily: "NunitoSemiBold",
                  fontSize: 14,
                  color: colors.text,
                },
                styles.text,
              ]}
            >
              inspired by zenquotes.com
            </Text>
          </View>
          <View style={styles.button}>
            <AppButton 
              label="Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />
          </View>
          </View>
        ) : (
        <View style={styles.loader}>
        <ActivityIndicator visible={loading} />
        </View>)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80
  },
  text: {
    textAlign: "center",
  },
  image: {
    backgroundColor: "grey",
    height: 100,
    width: 100,
    borderRadius: 100,
    marginVertical: 20,
  },
  button: {
    marginVertical: 20,
    alignItems: "center"
  },
  loader: {
    marginTop: 120
  },
});

export default HomeScreen;
