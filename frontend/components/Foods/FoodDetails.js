import React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "../../styles/myStyles";

export default function FoodDetails() {
  const route = useRoute();
  const { food } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <View style={styles.info}>
          <Text style={styles.faculty}>Name: {food.name}</Text>
          <Text style={styles.faculty}>Origin: {food.origin}</Text>
          <Text style={styles.faculty}>Price: {food.price}</Text>

          <Text style={styles.faculty}>Date: {food.date.toString()}</Text>
          <Text style={styles.faculty}>Image: {food.image}</Text>
          <Image
            source={{ uri: food.image }}
            style={styles.image}
            resizeMode={"contain"}
          />
        </View>
      </View>
    </View>
  );
}
