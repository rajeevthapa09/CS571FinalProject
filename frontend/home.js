import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Profile from "./profile";

import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Home() {
  return (
    <Navigator>
      <Screen
        name="profile"
        component={Profile}
        option={{ headerShown: false }}
      />
    </Navigator>
  );
}
