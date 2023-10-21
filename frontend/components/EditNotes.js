
import { Text, View, TextInput, StyleSheet, TouchableHighlight } from "react-native"
import { useState } from "react";
import { editNotes } from "../network";
import { useNavigation } from '@react-navigation/native';

export default function EditNotes({ route }) {
    console.log(route.params)
    const [notes, setNotes] = useState({ title: route.params.note.title, comment: route.params.note.comment, date: route.params.note.date });
    const navigate = useNavigation();
    const submitEdit = async() => {
        const res = await editNotes("test@test.com", route.params.note._id.toString(), notes);
        const setNotes = route.params.setNotes;
        setNotes(res.data);
        navigate.goBack();
    }
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