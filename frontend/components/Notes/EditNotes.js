
import { Text, View, TextInput, StyleSheet, TouchableHighlight } from "react-native"
import { useContext, useState } from "react";
import { editNotes } from "../../utils/network";
import { useNavigation } from '@react-navigation/native';
import GlobalContext from "../../utils/context";

export default function EditNotes({ route }) {
    console.log(route.params)
    const {state, setState} = useContext(GlobalContext)
    const [notes, setNotes] = useState({ title: route.params.note.title, comment: route.params.note.comment, date: route.params.note.date });
    const navigate = useNavigation();
    const submitEdit = async () => {
        try {
            console.log("editStates", state);
            const res = await editNotes(state.userInfo.email, route.params.note._id.toString(), notes, state.token);
            const setNotes = route.params.setNotes;
            console.log("editNotes", res);
            setNotes(res.data);
            navigate.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         let currentUser = null
    //         try {
    //             try {
    //                 const savedUser = await AsyncStorage.getItem("userInfo");
    //                 currentUser = JSON.parse(savedUser);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //             const res = await getNotes(currentUser.email, state.token);
    //             setNotes((prev) => res.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })()
    // }, [])

    return (
        <View>
            <Text>Title: </Text><TextInput style={styles.input} value={notes.title} onChangeText={(text) => setNotes({ ...notes, title: text })} />
            <Text>Comment:</Text><TextInput style={styles.input} value={notes.comment} multiline numberOfLines={5} onChangeText={(text) => setNotes({ ...notes, comment: text })} />
            <Text>Date:</Text><TextInput style={styles.input} value={notes.date} editable="false" />
            <TouchableHighlight onPress={submitEdit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "white"
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0066cc',
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    }
})