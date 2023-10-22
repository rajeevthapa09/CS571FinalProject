import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";

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
