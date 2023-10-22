import React, { useState } from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/myStyles';
import { deleteFood } from "../../utils/network";

const Food = ({ food, onRefresh }) => {
    const { index, _id, name, origin, price, quantity, date, image} = food;

    const navigation = useNavigation();

    const handleDetail = () => {
        navigation.navigate('fooddetails', { food })
    };

    const handleEdit = () => {
        navigation.navigate('editfood', { food, onRefresh })
    }

    const handleDelete = async () => {
  

        await deleteFood(_id);
        onRefresh()

    }

    return (
        <View
            style={{ backgroundColor: index % 2 === 0 ? 'green' : '#008000' }}>
            <View style={styles.row}>

                <View style={styles.name}>
                    <Text>Name: {name}</Text>
                    <Text>Origin: {origin}</Text>
                    <Text>Price: {price}</Text>
                    <Text>Quantity: {quantity}</Text>
                    <Text>Date: {date}</Text>
                    <Text>Image: {image}</Text>

                </View>

                <View style={styles.edges}>
                    <TouchableHighlight
                        onPress={handleDetail}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Details</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={handleEdit}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableHighlight><TouchableHighlight
                        onPress={handleDelete}
                        style={styles.button}
                        underlayColor="#5398DC">
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default Food;
