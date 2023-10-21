import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FoodList = () => {
  const navigation = useNavigation();
  const [foodData, setFoodData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFood, setNewFood] = useState({ name: '', origin: '', price: '', date: new Date(), image: '' });
  const [searchText, setSearchText] = useState('');

  

  // Function to handle editing a food item
  const handleEdit = (foodItem) => {
    // Navigate to the 'EditFood' screen and pass the selected food item for editing
    navigation.navigate('EditFood', { foodItem });
  };

  // Function to handle deleting a food item
  const handleDelete = async (foodItem) => {
    try {
      // Make a DELETE request to your API to delete the selected food item
      const response = await fetch(`your-api-endpoint-for-deleting-food/${foodItem.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the food data by re-fetching it from the API
        const updatedFoodData = await fetchFoodData();
        setFoodData(updatedFoodData);
      } else {
        console.error('Failed to delete food item');
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Food</Text>
      <TextInput
        placeholder="Search by Food Name"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />
      <Button title="Add Food" onPress={() => setModalVisible(true)} />
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id.toString()} // Use a unique identifier for the key
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodOrigin}>{item.origin}</Text>
              <Text style={styles.foodPrice}>{item.price}</Text>
              <Text style={styles.foodDate}>{item.date.toDateString()}</Text>
            </View>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => handleDelete(item)} />
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Add Food</Text>
          <TextInput
            placeholder="Food Name"
            onChangeText={(text) => setNewFood({ ...newFood, name: text })}
          />
          <TextInput
            placeholder="Origin"
            onChangeText={(text) => setNewFood({ ...newFood, origin: text })}
          />
          <TextInput
            placeholder="Price"
            onChangeText={(text) => setNewFood({ ...newFood, price: text })}
          />
          {/* You can add input fields for other food details, such as the date and image link. */}
          <Button title="Save" onPress={handleSaveFood} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  searchInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  foodImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodOrigin: {
    fontSize: 14,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodDate: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodList;
