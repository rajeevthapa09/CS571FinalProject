import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Layout from "./layout";
import Home from "./home";
import Context from "./context";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LayoutorHome() {
  const [state, setState] = useState({ token: null, profile: [] });
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setState({ ...state, token: token });
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage", error);
      }
    };

    getToken();
  }, []);
  return (
    <Context.Provider value={{ state, setState }}>
      {state.token ? <Home /> : <Layout />}
    </Context.Provider>
  );
}
