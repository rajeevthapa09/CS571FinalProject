import { Text } from "react-native";
import Login from "./Login";
import SignUp from "./signup";
import Home from "./home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: "login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
        options={{
          title: "sign-up",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "home",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
