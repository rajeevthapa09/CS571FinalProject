import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import GlobalContext from "./context"
import Constants from 'expo-constants';
import NavigationFood from './components/NavigationFood';
import NavigationNotes from './components/NavigationNotes';
import NavigationProfile from './components/NavigationProfile';

const Tab = createBottomTabNavigator();
export default function App() {
  const [state, setState] = useState({ course: [] });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen name="notes" component={NavigationNotes} options={{
             headerShown: false, tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="microsoft-onenote" color={color} size={26} />
            )
          }} />
          <Tab.Screen name="foods" component={NavigationFood} options={{
            headerShown: false, tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="food-apple" color={color} size={26} />
            )
          }} />
          <Tab.Screen name="profile" component={NavigationProfile} options={{
            headerShown: false, tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="information" color={color} size={26} />
            )
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
