import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Layout from "./Layout";
import Home from "./Home";
import GlobalContext from "../../utils/context";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LayoutorHome() {
  const [state, setState] = useState({ token: null, profile: {}, userInfo: {} });
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // setState({ ...state, token: token });
        try {
          const userInfo = await AsyncStorage.getItem("userInfo");
          setState({ ...state, token: token, userInfo: JSON.parse(userInfo) });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage", error);
      }

    };

    getToken();
  }, []);
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {state.token ? <Home /> : <Layout />}
    </GlobalContext.Provider>
  );
}
