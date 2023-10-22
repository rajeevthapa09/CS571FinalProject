import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodList from '../components/Foods/FoodList';
import AddFood from '../components/Foods/AddFood';
import EditFood from '../components/Foods/EditFood';
import FoodDetails from '../components/Foods/FoodDetails';
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