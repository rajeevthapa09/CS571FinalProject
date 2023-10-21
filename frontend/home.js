import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Profile from "./profile";

const { Navigator, Screen } = createBottomTabNavigator();

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
