import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../components/Profile/Profile";
import UpdateProfile from "../components/Profile/UpdateProfile";

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
