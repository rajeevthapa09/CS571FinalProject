import { Text, 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableHighlight 
} from "react-native"
import { useState } from "react";
import { editFood} from "../../utils/network";
import { useNavigation } from '@react-navigation/native';

export default function EditFood({ route }) {
    //console.log(route.params)
    const [foods, setFoods] = useState({ 
        name: route.params.food.name, 
        origin: route.params.food.origin, 
        price: route.params.food.price, 
        quantity: route.params.food.quantity, 
        date: route.params.food.date, 
        image: route.params.food.image 
    });
    const navigate = useNavigation();
    const submitEdit = async () => {
        try {
            const res = await editFood(
                "rahel@gggg.com", 
                route.params.food._id.toString(), 
                foods
                );
                route.params.onRefresh();
                navigate.goBack();
              } catch (error) {
                console.log(error);
              }
            };

    return (
        <View>
            <Text>Name: </Text>
            <TextInput 
            style={styles.input} 
            value={foods.name} 
            onChangeText={(text) => setFoods({ ...foods, name: text })} 

            />
            <Text>Origin: </Text>
            <TextInput 
            style={styles.input} 
            value={foods.origin} 
            onChangeText={(text) => setFoods({ ...foods, origin: text })} 

            />
            <Text>Price: </Text>
            <TextInput 
            style={styles.input} 
            value={foods.price} 
            onChangeText={(text) => setFoods({ ...foods, price: text })} 

            />
            <Text>Quantity: </Text>
            <TextInput 
            style={styles.input} 
            value={foods.quantity} 
            onChangeText={(text) => setFoods({ ...foods, quantity: text })} 

            />
<Text>Date:</Text>
<TextInput 
style={styles.input} 
value={foods.date} editable="false" 

/>
<Text>Image: </Text>
<TextInput 
style={styles.input} 
value={foods.image} 
onChangeText={(text) => setFoods({ ...foods, image: text })} />

            <TouchableHighlight onPress={submitEdit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Save</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "white"
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0066cc',
        borderRadius: 4,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    }
})