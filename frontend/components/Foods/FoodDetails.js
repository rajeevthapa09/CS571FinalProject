import { Text, View } from "react-native"

export default function FoodDetails({ route }) {
    const food = route.params;
    return (
        <View>
            <Text>Name: </Text><Text>{food.name}</Text>
            <Text>Origin:</Text><Text>{food.origin}</Text>
            <Text>Price:</Text><Text>{food.price}</Text>
            <Text>Quantity:</Text><Text>{food.quantity}</Text>
            <Text>Date:</Text><Text>{food.date}</Text>
            <Text>Image:</Text><Text>{food.image}</Text>

        </View>
    )
}