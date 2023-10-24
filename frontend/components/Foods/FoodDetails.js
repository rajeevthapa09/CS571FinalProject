import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function FoodDetails() {
  const route = useRoute();
  const { food } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <View style={styles.info}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.infoText}>{food.name}</Text>
          <Text style={styles.label}>Origin:</Text>
          <Text style={styles.infoText}>{food.origin}</Text>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.infoText}>{food.price}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.infoText}>{food.date.toString()}</Text>
          <Text style={styles.label}>Image:</Text>
          <Image
            source={{ uri: food.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoHeader: {
    padding: 10,
  },
  info: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 150,
  },
});
