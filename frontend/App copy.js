import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Layout from "./layout";
import Home from "./home";
import context from "./context";
import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
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
    <context.Provider value={{ state, setState }}>
      <NavigationContainer>
        {console.log(state, "token2")}
        {state.token ? <Home /> : <Layout />}
      </NavigationContainer>
    </context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
