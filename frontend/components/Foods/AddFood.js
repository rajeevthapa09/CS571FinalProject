import { Alert, Text, Pressable, TextInput, View } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../styles/myStyles";
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

  //   const route = useRoute();
  //   const { onRefresh } = route.params;

  const handleSave = async () => {
    try {
      // Validate input variables
      //   if (!foood.name || typeof foood.name !== "string") {
      //     Alert.alert("Error", "Name must be a non-empty string");
      //     return;
      //   }

      //   if (!foood.price || isNaN(parseFloat(foood.price))) {
      //     Alert.alert("Error", "Price must be a valid number");
      //     return;
      //   }

      //   if (!foood.quantity || isNaN(parseFloat(foood.quantity))) {
      //     Alert.alert("Error", "Price must be a valid number");
      //     return;
      //   }
      //   if (!foood.origin || typeof foood.origin !== "string") {
      //     Alert.alert("Error", "Origin must be a non-empty string");
      //     return;
      //   }

      const ret = await addFood(foood, state.token);

      onRefresh(); // reload FoodList component
      navigation.goBack();
    } catch (error) {
      // setGlobalState({...globalstate, errorMessage:'Unable to save data'})
    }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Add New Food</Text>
      {/* <Text style={styles.errorMsg}>{globalstate.errorMessage} </Text> */}
      <TextInput
        style={styles.input}
        placeholder="name"
        value={state.name}
        onChangeText={(text) => setfoood({ ...foood, name: text })}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="origin"
        value={state.origin}
        onChangeText={(text) => setfoood({ ...foood, origin: text })}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="price"
        keyboardType="numeric"
        value={state.price}
        onChangeText={(text) => setfoood({ ...foood, price: text })}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="mm-dd-yyyy"
        keyboardType="numeric"
        value={state.date}
        onChangeText={(text) => setfoood({ ...foood, date: text })}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="image"
        value={state.image}
        onChangeText={(text) => setfoood({ ...foood, image: text })}
      ></TextInput>
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitButtonText} onPress={handleSave}>
          Save
        </Text>
      </Pressable>
    </View>
  );
}
