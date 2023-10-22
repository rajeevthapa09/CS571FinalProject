
import { Text, View } from "react-native"

export default function NoteDetails({ route }) {
    const note = route.params;
    return (
        <View>
            <Text>Title: </Text><Text>{note.title}</Text>
            <Text>Comment:</Text><Text>{note.comment}</Text>
            <Text>Date:</Text><Text>{note.date}</Text>
        </View>
    )
}