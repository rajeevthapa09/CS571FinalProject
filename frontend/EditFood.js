import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditFood = ({ route, navigation }) => {
  const { foodItem } = route.params; // Get the food item passed from the previous screen

  const [editedFood, setEditedFood] = useState(foodItem);

  const handleSave = async () => {
    try {
      // Assuming you have an API endpoint for updating a food item, e.g., '/food/:id'
      const response = await fetch(`/food/${foodItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFood),
      });
  
      if (response.ok) {
        // Successfully updated the food item in the backend
        console.log('Food item updated successfully:', editedFood);
  
        // You can choose how you want to handle the navigation.
        // For this example, we'll navigate back to the FoodList screen.
        navigation.navigate('FoodList');
      } else {
        console.error('Failed to update food item');
      }
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Food Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editedFood.name}
        onChangeText={(text) => setEditedFood({ ...editedFood, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={editedFood.origin}
        onChangeText={(text) => setEditedFood({ ...editedFood, origin: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={editedFood.price}
        onChangeText={(text) => setEditedFood({ ...editedFood, price: text })}
      />
      {/* Add more input fields for other food details like date and image */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default EditFood;
