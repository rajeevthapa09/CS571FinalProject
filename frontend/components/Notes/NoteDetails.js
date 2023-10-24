
import { Text, View } from "react-native"

export default function NoteDetails({ route }) {
    const note = route.params;
    return (
        <View>
            <Text style={{marginBottom: 0, marginTop: 20, fontWeight: "bold"}}>Title: </Text><Text style={{marginBottom: 10, marginTop: 5}}>{note.title}</Text>
            <Text style={{marginBottom: 0, marginTop: 10, fontWeight: "bold"}}>Comment:</Text><Text style={{marginBottom: 10, marginTop: 5}}>{note.comment}</Text>
            <Text style={{marginBottom: 0, marginTop: 10, fontWeight: "bold"}}>Date:</Text><Text style={{marginBottom: 10, marginTop: 5}}>{note.date}</Text>
        </View>
    )
}