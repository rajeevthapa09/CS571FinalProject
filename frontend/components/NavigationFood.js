
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from "./FoodList";
import PlaceOrder from './PlaceOrder';

export default function NavigationFood() {
    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator initialRouteName="food">
                <Stack.Screen name="food" component={FoodList} options={{ headerShown: false }} />
                <Stack.Screen name="order" component={PlaceOrder} options={{ title: "Place an Order" }} />
            </Stack.Navigator>
    )
}