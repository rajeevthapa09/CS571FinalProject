import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Profile from "./Profile";
import ProfileNavigator from "../../stackScreen/ProfileStackNav";
import NavigationNotes from '../../stackScreen/NavigationNotes';
import FoodsScreen from "../../stackScreen/FoodsScreen"
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator >
            
            <Tab.Screen name="notes" component={NavigationNotes} options={{
                headerShown: false, tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="microsoft-onenote" color={color} size={26} />
                )
            }} />
            <Tab.Screen
                name="foods"
                component={FoodsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="food-apple" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="profile"
                component={ProfileNavigator}
                options={{ headerShown: false ,tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="information" color={color} size={26} />
                )
            }} />
        </Tab.Navigator>
    );
}
