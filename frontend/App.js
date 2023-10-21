import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigaor } from '@react-navigation/stack';

import FoodList from './FoodList'; // Import your FoodList component
import EditFood from './EditFood'; // Import your EditFood component

const Stack = createStackNavigor();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FoodList">
        <Stack.Screen name="FoodList" component={FoodList} options={{ title: 'Food List' }} />
        <Stack.Screen name="EditFood" component={EditFood} options={{ title: 'Edit Food' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
