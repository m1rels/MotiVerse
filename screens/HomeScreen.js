import React, { useState, useEffect, useContext } from "react";
import Screen from "../components/Screen";
import { View, Text, StyleSheet, Alert, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

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
      if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false &&
      (!lastAPIFetchDate || lastAPIFetchDate < currentDate)) {
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
                inspired by ZenQuotes
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
       <View style={{flex: 1, backgroundColor: colors.background}}>
         <AppText style={{ fontFamily: "NunitoBold", color: colors.text, fontSize: 21, textAlign: "center", marginVertical: 20 }}>
           Welcome to MotiVerse!
         </AppText>
         <AppText style={styles.intro}>
           Elevate your mindset. Elevate your life.
         </AppText>
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
  intro: {
    marginVertical: 10,
    textAlign: "center"
  },
  image: {
    backgroundColor: "grey",
    height: 100,
    width: 100,
    borderRadius: 100,
    marginVertical: 20,
  },
  button: {
    marginVertical: 50,
    alignItems: "center",
  },
  loader: {
    marginTop: 150,
  },
});

export default HomeScreen;
