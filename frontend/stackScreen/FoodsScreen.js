import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from '../components/FoodList';
import AddFood from '../components/AddFood';
import EditFood from '../components/EditFood';
import FoodDetails from '../components/FoodDetails';
const Stack = createNativeStackNavigator();
export default function FoodsScreen() {

    return (
        <Stack.Navigator 
        initialRouteName="foodlist">
            <Stack.Screen name="foodlist" component={FoodList} options={{ title: 'Foods' }} />
            <Stack.Screen name="addfood" component={AddFood} options={{ title: 'Add Food' }} />
            <Stack.Screen name="editfood" component={EditFood} options={{ title: 'Edit Food'}} />
            <Stack.Screen name="fooddetails" component={FoodDetails} options={{ title: 'Review Food'}} />
        </Stack.Navigator>
    );
}