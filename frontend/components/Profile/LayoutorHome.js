import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "./Layout";
import Home from "./Home";
import GlobalContext from "../../utils/context";

export default function LayoutorHome() {
  const [state, setState] = useState({ token: null, profile: [], foods: [] });

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
    <GlobalContext.Provider value={{ state, setState }}>
      {state.token ? <Home /> : <Layout />}
    </GlobalContext.Provider>
  );
}
