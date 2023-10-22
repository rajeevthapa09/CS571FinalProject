import { useContext, useState } from 'react';
import { View, Text, TouchableHighlight, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { addNotes } from '../utils/network';

import {
  StyleSheet,
} from 'react-native';
import GlobalContext from '../utils/context';

const AddCourse = ({ route }) => {
  const { state, setState } = useContext(GlobalContext);
  const [title, setTitle] = useState();
  const [comment, setComment] = useState();
  const [date, setDate] = useState(new Date().toLocaleString());
  const navigate = useNavigation();

  const addNotesBtn = async () => {
    try {
      const res = await addNotes("test@test.com", { title, comment, date });
      const setNotes = route.params;
      setNotes(res.data);
      navigate.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add New Note</Text>
      <TextInput placeholder="Title" value={title} style={styles.input} onChangeText={(text) => setTitle(text)} />
      <TextInput placeholder="Comment" value={comment} style={styles.input} multiline numberOfLines={5} onChangeText={(text) => setComment(text)} />
      <TextInput placeholder="Date" value={date} style={styles.input} editable={false} />

      <TouchableHighlight onPress={addNotesBtn}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
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
  },
  button: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  buttonText: {
    color: '#0066CC',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AddCourse;
