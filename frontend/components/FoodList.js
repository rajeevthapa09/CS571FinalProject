
import { Text, Button } from "react-native"
import { useNavigation } from '@react-navigation/native';

export default function FoodList() {
    const navigation = useNavigation();
    const submitOrder = () => {
        navigation.navigate("order");
    }
    return (
        <Button title="Place an Order" onPress={submitOrder} />
    )
}