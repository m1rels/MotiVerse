import React, {useEffect, useState} from "react";
import { Modal, View, Image, StyleSheet, SafeAreaView } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";
import Screen from "./Screen";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AppModal(props) {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    checkFirstTime();
    
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasVisitedBefore = await AsyncStorage.getItem("hasVisited");
      if (!hasVisitedBefore) {
        setShowModal(true);
        await AsyncStorage.setItem("hasVisited", "true");
      }
    } catch (error) {
      logger.log("Error reading/writing to AsyncStorage:", error);
    }
  };

  return ( 
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <Screen style={{backgroundColor: colors.background,}}>
      <View
        style={{
          flex: 1,
          alignItems: "center",  
          paddingHorizontal: 10,
        }}
      >
        <AppText
          style={{
            fontFamily: "NunitoBold",
            color: colors.text,
            fontSize: 21,
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          Welcome to MotiVerse!
        </AppText>
        <View style={styles.logo}>
          <Image style={styles.image} source={require("../assets/logo.png")} />
          <AppText style={[styles.text, styles.slogan]}>
            Elevate your mindset. Elevate your life. 
          </AppText>
        </View>
        <View style={{ marginVertical: 20 }}>
          <AppText style={styles.intro}>
            Get ready to kickstart each day with a motivational quote to fuel
            your journey towards success. Join our community, share the
            positivity, and let's make every day extraordinary together!
          </AppText>
        </View>
        <View style={styles.button}>
          <AppButton label="Let's Go!" onPress={() => setShowModal(false)} />
        </View>
      </View>
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginVertical: 10,
    textAlign: "center",
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
})

export default AppModal;
