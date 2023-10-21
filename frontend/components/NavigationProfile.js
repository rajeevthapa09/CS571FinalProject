
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from "./FoodList";
import Notes from "./Notes";
import Profile from "./Profile";

export default function NavigationProfile() {
    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator initialRouteName="food">
                <Stack.Screen name="food" component={FoodList} options={{ headerShown: false }} />
                <Stack.Screen name="notes" component={Notes} options={{ title: "Notes" }} />
                <Stack.Screen name="profile" component={Profile} options={{ title: "Profile" }} />
            </Stack.Navigator>
    )
}