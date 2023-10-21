
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from "./FoodList";
import FoodDetails from "./FoodDetails";
import Notes from "./Notes";
import NoteDetails from "./NoteDetails";
import Profile from "./Profile";

export default function NavigationFood() {
    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator initialRouteName="food">
                <Stack.Screen name="food" component={FoodList} options={{ headerShown: false }} />
                <Stack.Screen name="notes" component={Notes} options={{ title: "Notes" }} />
                <Stack.Screen name="profile" component={Profile} options={{ title: "Profile" }} />
                <Stack.Screen name="notesDetails" component={NoteDetails} options={{ title: "Note Details" }} />
                <Stack.Screen name="foodDetails" component={FoodDetails} options={{ title: "Food Details" }} />
            </Stack.Navigator>
    )
}