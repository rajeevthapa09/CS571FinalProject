import { useContext, useState } from 'react';
import { View, Text, TouchableHighlight, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { addFood } from '../../utils/network';

import {
  StyleSheet,
} from 'react-native';
import GlobalContext from '../../utils/context';

const AddFood = ({ route }) => {
  const { state, setState } = useContext(GlobalContext);
  const [name, setName] = useState();
  const [origin, setOrigin] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [date, setDate] = useState(new Date().toLocaleString());
  const [image, setImage] = useState();

  const navigate = useNavigation();

  const addFoodsBtn = async () => {
    try {
      const res = await addFood("rahel@gggg", { name, origin, price, quantity, date, image });
          const setNotes = route.params;
  // setNotes(res.data);
  //     navigate.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add Food</Text>
      <TextInput placeholder="name" value={name} style={styles.input} onChangeText={(text) => setName(text)} />
      <TextInput placeholder="origin" value={origin} style={styles.input} onChangeText={(text) => setOrigin(text)} />
      <TextInput placeholder="price" value={price} style={styles.input} onChangeText={(text) => setPrice(text)} />
      <TextInput placeholder="quantity" value={quantity} style={styles.input} onChangeText={(text) => setQuantity(text)} />
      <TextInput placeholder="Date" value={date} style={styles.input} editable={false} />
      <TextInput placeholder="image" value={image} style={styles.input} onChangeText={(text) => setImage(text)} />

      <TouchableHighlight onPress={addFoodsBtn}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
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

export default AddFood;
