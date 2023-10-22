import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./profile";
import UpdateProfile from "./updateProfile";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="update"
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
