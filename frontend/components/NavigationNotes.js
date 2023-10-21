
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from "./FoodList";
import FoodDetails from "./FoodDetails";
import Notes from "./Notes";
import NoteDetails from "./NoteDetails";
import AddNotes from "./AddNotes"
import Profile from "./Profile";

export default function NavigationNotes() {
    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator initialRouteName="notes">
                <Stack.Screen name="notes" component={Notes} options={{ title: "Notes" }} />
                <Stack.Screen name="addNotes" component={AddNotes} options={{ title: "Add Notes" }} />
                <Stack.Screen name="editNotes" component={AddNotes} options={{ title: "Edit Notes" }} />
                <Stack.Screen name="notesDetails" component={NoteDetails} options={{ title: "Note Details" }} />
            </Stack.Navigator>
    )
}