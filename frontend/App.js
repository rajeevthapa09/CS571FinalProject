import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import LayoutorHome from "./components/Profile/LayoutorHome";

export default function App() {
  return (
    <NavigationContainer>
      <LayoutorHome />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
});
