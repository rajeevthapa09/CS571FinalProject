import { View, Text, StyleSheet, TouchableHighlight, FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { getNotes } from "../network";
import { useEffect, useState } from "react";

export default function Notes() {

    const [notes, setNotes] = useState([]);

    const navigation = useNavigation();
    const addNote = () => {
        navigation.navigate('addNotes', setNotes);
    }

    useEffect(() => {
        (async () => {
            const res = await getNotes("test@test.com");
            setNotes((prev) => res.data);
        })()
    }, [])

    return (
        <View>
            <TouchableHighlight style={styles.button} onPress={addNote}>
                <Text style={styles.buttonText}>Add Note</Text>
            </TouchableHighlight>
            <View style={styles.notes}>
                <View style={{ flex: 1.5 }}><Text>Notes</Text></View>
                <View style={{ flex: 1.25 }}><Text>Dates</Text></View>
                <View style={{ flex: 1 }}><Text></Text></View>
            </View>
            <FlatList
                data={notes}
                renderItem={({ item, index }) => (<View style={styles.notes}>
                    <View style={{ flex: 1.5 }}><Text>{item.title}</Text></View>
                    <View style={{ flex: 1.25 }}><Text>{item.date}</Text></View>
                    <View style={{ flex: 1 }}>{<Display note={item} setNotes={setNotes} />}</View>
                </View>)}
                keyExtractor={item => item._id.toString()}
                scrollIndicatorInsets={{ right: 3 }}
            />
           
        </View>
    )
}

function Display({note, setNotes}) {
    const navigation = useNavigation();
    const viewPressed = () => {
        navigation.navigate('notesDetails', note);
    }

    const editPressed = () => {
        navigation.navigate('editNotes', {note, setNotes});
    }
    return (
        <View style={{ flexDirection: "column" }}>
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={viewPressed}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>View</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={editPressed}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notes: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066cc',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
        marginTop: 10,
        width: 90,
        marginLeft: "75%"
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 12,
        textAlign: 'center',
    },
    edges: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      minWidth: 50,
    },
    button: {
      borderWidth: 1,
      borderColor: '#0066CC',
      borderRadius: 14,
      paddingHorizontal: 10,
      paddingVertical: 3,
      backgroundColor: '#fff',
    },
    buttonText: {
      color: '#0066CC',
      fontSize: 12,
      textAlign: 'center',
    },
})