
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from "../components/Notes/Notes";
import NoteDetails from "../components/Notes/NoteDetails";
import AddNotes from "../components/Notes/AddNotes"
import EditNotes from '../components/Notes/EditNotes';

export default function NavigationNotes() {
    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator initialRouteName="notes">
                <Stack.Screen name="notes" component={Notes} options={{ title: "Notes" }} />
                <Stack.Screen name="addNotes" component={AddNotes} options={{ title: "Add Notes" }} />
                <Stack.Screen name="editNotes" component={EditNotes} options={{ title: "Edit Notes" }} />
                <Stack.Screen name="notesDetails" component={NoteDetails} options={{ title: "Note Details" }} />
            </Stack.Navigator>
    )
}