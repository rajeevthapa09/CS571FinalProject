import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/myStyles";

export default function FoodDetails({ route }) {
  const { food } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <View style={styles.info}>
          <Text style={styles.faculty}>Name: {food.name}</Text>
          <Text style={styles.faculty}>Origin: {food.origin}</Text>
          <Text style={styles.faculty}>Price: {food.price}</Text>
          <Text style={styles.faculty}>Quantity:{food.quantity}</Text>
          <Text style={styles.faculty}>Date: {food.date.toString()}</Text>
          {/* <Text style={styles.faculty}>Image: {food.image}</Text> */}
        </View>
      </View>
    </View>
  );
}
