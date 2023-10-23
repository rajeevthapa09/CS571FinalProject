import { View, Text, StyleSheet, TouchableHighlight, FlatList, ScrollView } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { getNotes } from "../../utils/network";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../utils/context";
import styles from "../../styles/myStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notes() {
    const { state, setState } = useContext(GlobalContext)

    const [notes, setNotes] = useState([]);

    const navigation = useNavigation();
    const addNote = () => {
        navigation.navigate('addNotes', setNotes);
    }

    useEffect(() => {
        (async () => {
            let currentUser = null
            try {
                try {
                    const savedUser = await AsyncStorage.getItem("userInfo");
                    currentUser = JSON.parse(savedUser);
                } catch (error) {
                    console.log(error);
                }
                const res = await getNotes(currentUser.email, state.token);
                setNotes((prev) => res.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true} style={{ backgroundColor: "white", flex: 1 }}>
        {/* <View style={{ backgroundColor: "white", flex: 1 }}> */}
            <TouchableHighlight style={[styles.buttonNotes, { width: 80, marginLeft: 269, borderRadius: 5 }]} onPress={addNote}>
                <Text style={styles.buttonTextNotes}>Add Note</Text>
            </TouchableHighlight>
            <View style={styles.notes}>
                <View style={{ flex: 1.5 }}><Text style={styles.notesHeader}>Notes</Text></View>
                <View style={{ flex: 1.25 }}><Text style={styles.notesHeader}>Dates</Text></View>
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

        {/* </View> */}
        </ScrollView>
    )
}

function Display({ note, setNotes }) {
    const navigation = useNavigation();
    const viewPressed = () => {
        navigation.navigate('notesDetails', note);
    }

    const editPressed = () => {
        navigation.navigate('editNotes', { note, setNotes });
    }
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={viewPressed}
                    style={[styles.button, { width: 45, borderRadius: 5 }]}
                    underlayColor="#5398DC">
                    <Text style={[styles.buttonText, { fontSize: 10 }]}>View</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={editPressed}
                    style={[styles.button, { width: 45, borderRadius: 5 }]}
                    underlayColor="#5398DC">
                    <Text style={[styles.buttonText, { fontSize: 10 }]}>Edit</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     notes: {
//         flex: 1,
//         flexDirection: "row",
//         padding: 10
//     },
//     button: {
//         borderWidth: 1,
//         borderColor: '#0066cc',
//         borderRadius: 14,
//         paddingHorizontal: 10,
//         paddingVertical: 3,
//         backgroundColor: '#fff',
//         marginTop: 10,
//         width: 90,
//         marginLeft: "75%"
//     },
//     buttonText: {
//         color: '#0066CC',
//         fontSize: 12,
//         textAlign: 'center',
//     },
//     edges: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 5,
//         minWidth: 50,
//     },
//     button: {
//         borderWidth: 1,
//         borderColor: '#0066CC',
//         borderRadius: 14,
//         paddingHorizontal: 10,
//         paddingVertical: 3,
//         backgroundColor: '#fff',
//     },
//     buttonText: {
//         color: '#0066CC',
//         fontSize: 12,
//         textAlign: 'center',
//     },
// })