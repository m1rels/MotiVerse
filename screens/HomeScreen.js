import React, { useState, useEffect, useContext } from "react";
import Screen from "../components/Screen";
import { View, Text, StyleSheet, Alert, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { Link, useTheme } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import { A } from '@expo/html-elements';

import themeContext from "../theme/themeContext";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { getQuotes } from "../api/api";
import ActivityIndicator from "../components/ActivityIndicator";

function HomeScreen({ navigation }) {
  const { setTheme, theme } = useContext(themeContext);
  const { colors } = useTheme();
  const [iconType, setIconType] = useState("moon");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const netInfo = useNetInfo();
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    checkFirstTime();
    loadQuotes();
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasVisitedBefore = await AsyncStorage.getItem("hasVisited");
      if (!hasVisitedBefore) {
        setShowModal(true);
        await AsyncStorage.setItem("hasVisited", "true");
      }
    } catch (error) {
      console.error("Error reading/writing to AsyncStorage:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showAlert = () => {
    Alert.alert(
      "No Internet Connection",
      "Quote of the day could not be loaded. Make sure that you are connected to the internet.",
      [{ text: "OK" }]
    );
  };

  const saveTheme = async (themeMode) => {
    try {
      await AsyncStorage.setItem("theme", themeMode);
    } catch (error) {
      console.error("Error saving theme to AsyncStorage:", error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      setIconType(iconType === "moon" ? "sun" : "moon");
      saveTheme(newTheme);
      return newTheme;
    });
  };


  const loadQuotes = async () => {
    setLoading(true);
    const lastAPIFetchDate = await AsyncStorage.getItem("lastAPIFetchDate");
    const currentDate = new Date().toISOString().split("T")[0];

    if (
      netInfo.type === "wifi" &&
      netInfo.isInternetReachable === true &&
      (!lastAPIFetchDate || lastAPIFetchDate < currentDate)
    ) {
      // Mach den API-Aufruf, da entweder noch kein API-Aufruf gemacht wurde oder der letzte vor dem aktuellen Tag war
      const data = await getQuotes();
      if (data) {
        setQuotes(data);
        setLoading(false);
        await AsyncStorage.setItem("lastAPIFetchDate", currentDate);
        // Hier kannst du weiter mit den Daten arbeiten
      }
    } else {
      const storedQuotes = await AsyncStorage.getItem("quotes");
      if (storedQuotes) {
        setQuotes(JSON.parse(storedQuotes));
      }
      setLoading(false);
      if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
        showAlert();
      }
    }
    return;
  };

  const [fontsLoaded] = useFonts({
    NunitoSemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
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
            toggleTheme();
          }}
          color={colors.text}
        />
      </View>
      <View style={styles.container}>
        <AppText style={[{ marginBottom: 10 }, styles.text]}>
          Quote of the day:
        </AppText>
        {quotes.length > 0 ? (
          <View style={styles.quote}> 
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
                "{quotes[0].q}"
              </Text>
              <Text
                style={[
                  {
                    fontFamily: "NunitoSemiBold",
                    fontSize: 14,
                    color: colors.text,
                    marginVertical: 10
                  },
                  styles.text,
                ]}
              >
                inspired by <A href="https://zenquotes.io" style={styles.link}>ZenQuotes</A>
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator visible={loading} />
          </View>
        )}
      </View>
    </Screen>
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <Screen>
       {/* Your modal content goes here */}
       <View style={{flex: 1, alignItems: "center", backgroundColor: colors.background, paddingHorizontal: 10}}>
         <AppText style={{ fontFamily: "NunitoBold", color: colors.text, fontSize: 21, marginVertical: 20, textAlign: "center" }}>
           Welcome to MotiVerse!
         </AppText>
         <View style={styles.logo}>
         <Image style={styles.image} source={require("../assets/logo.png")} />
         <AppText style={[styles.text, styles.slogan]}>
           Elevate your mindset. Elevate your life.
         </AppText>
         </View>
         <View style={{marginVertical: 20}}>
         <AppText style={styles.intro}>
           Get ready to kickstart each day with a motivational quote to
           fuel your journey towards success. Join our community, share the
           positivity, and let's make every day extraordinary together!
         </AppText>
         </View>
         <View style={styles.button}>
         <AppButton label="Let's Go!" onPress={closeModal} />
         </View>
       </View>
       </Screen>
   </Modal>
  </>
  );
}

const styles = StyleSheet.create({ 
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  quote: {
    marginTop: 60,
  },
  text: {
    textAlign: "center",
  },
  slogan: {
    position: "relative",
    top: -20
  },
  intro: {
    marginVertical: 10,
    textAlign: "center"
  },
  logo: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    height: 175,
    width: 175,
  },
  button: {
    marginVertical: 50,
    alignItems: "center",
  },
  loader: {
    marginTop: 150,
  },
  link: {
    color: "#1EF0FF"
  }
});

export default HomeScreen;
