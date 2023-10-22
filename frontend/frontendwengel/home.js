import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Profile from "./profile";
import ProfileNavigator from "./profileStackNav";

import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createBottomTabNavigator();

export default function Home() {
  return (
    <Navigator>
      <Screen
        name="profile"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
