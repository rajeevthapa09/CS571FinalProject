import { Text, Pressable, TextInput, View } from "react-native"
import React, { useContext, useState } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { editFoodItem } from "../../utils/network"
import styles from '../../styles/myStyles';
import GlobalContext from "../../utils/context";

export default function EditFood() {
    const navigation = useNavigation();
    const { state, setState } = useContext(GlobalContext);
    const route = useRoute();
    const { food, onRefresh } = route.params;

    const [editFood, setEditState] = useState(
        {
            _id: food._id.toString(),
            name: food.name,
            price: food.price,
            origin: food.origin,
            date: food.date,
            image: food.image
        })

    const handGobackEdit = () => {
        navigation.goBack();
    }

    const handleSubmit = async () => {
        try {
            const res = await editFoodItem(state.userInfo.email, editFood, state.token);
            onRefresh();
            navigation.goBack()
        } catch (error) {

        }
    }

    const handleTextInputChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');

        if (numericValue !== text) {
            window.alert("Invalid Input");
        }
        setEditState({ ...editFood, price: numericValue });
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Edit Course</Text>
            <TextInput
                style={styles.input}
                placeholder="name"
                value={editFood.name}
                onChangeText={(text) => setEditState({ ...editFood, name: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="price"
                keyboardType="numeric"
                value={editFood.price}
                onChangeText={handleTextInputChange}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="origin"
                value={editFood.origin}
                onChangeText={(text) => setEditState({ ...editFood, origin: text })}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="yyyy-mm-dd"
                keyboardType="numeric"
                value={editFood.date}

            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Image"
                value={editFood.image}
                onChangeText={(text) => setEditState({ ...editFood, image: text })}
            ></TextInput>
            <Pressable style={styles.submitButton} >
                <Text style={styles.submitButtonText} onPress={handleSubmit}>Save</Text>
            </Pressable>
            <Pressable style={styles.submitButton}>
                <Text style={styles.submitButtonText} onPress={handGobackEdit}>
                    Go Back
                </Text>
            </Pressable>
        </View>
    )
}