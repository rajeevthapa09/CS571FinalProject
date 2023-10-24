import {
  Alert,
  Text,
  Pressable,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import React, { useState, useContext } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import { addFood } from "../../utils/network";
import GlobalContext from "../../utils/context";

export default function AddFood({ route }) {
  const onRefresh = route.params;

  const { state, setState } = useContext(GlobalContext);

  const navigation = useNavigation();
  const [foood, setfoood] = useState({
    name: "",
    origin: "",
    price: "",
    date: "",
    image: null,
  });

  const handleSave = async () => {
    try {
      if (foood === "") {
        alert("all fields are required");
      }

      const ret = await addFood(foood, state.token);

      onRefresh(); // reload FoodList component
      navigation.goBack();
    } catch (error) {}
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Add New Food</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={state.name}
        onChangeText={(text) => setfoood({ ...foood, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={state.origin}
        onChangeText={(text) => setfoood({ ...foood, origin: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={state.price}
        onChangeText={(text) => setfoood({ ...foood, price: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (mm-dd-yyyy)"
        keyboardType="numeric"
        value={state.date}
        onChangeText={(text) => setfoood({ ...foood, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={state.image}
        onChangeText={(text) => setfoood({ ...foood, image: text })}
      />
      <Pressable style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitButtonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#5398DC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
