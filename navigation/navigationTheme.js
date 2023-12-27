import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const LightMode = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#010101",
    button_backgroundColor: "#18d690",
    button_text: "#f2f2f2",
    card: "#f2f2f2",
  },
};

const DarkMode = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#f2f2f2",
    button_backgroundColor: "#18d690",
    button_text: "#010101",
    card: "#010101",
  },
};

export { LightMode, DarkMode };
