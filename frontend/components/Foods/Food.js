import React, { useContext, useState } from "react";
import { Alert, View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/myStyles";
import { deleteFood } from "../../utils/network";
import GlobalContext from "../../utils/context";

const Food = ({ food, onRefresh }) => {
  const { _id, name, origin, price, date, image } = food;
  const { state, setState } = useContext(GlobalContext);

  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate("editfood", { food, onRefresh });
  };

  const handleDelete = async () => {
    await deleteFood(_id);
    onRefresh();
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.name}>
          <Text>Name: {name}</Text>
          <Text>Origin: {origin}</Text>
          <Text>Price: {price}</Text>

          <Text>Date: {date}</Text>
          <Text>Image: {image}</Text>
        </View>

        <View style={styles.edges}>
          <TouchableHighlight
            onPress={handleEdit}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={handleDelete}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Food;
