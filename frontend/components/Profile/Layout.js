import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import SignUp from "./Signup";
import Home from "./Home";

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: "login",
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
        options={{
          title: "sign-up",
        }}
      />

      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: "home",
        }}
      />
    </Stack.Navigator>
  );
}
