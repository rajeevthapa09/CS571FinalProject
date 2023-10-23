import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import GlobalContext from "./utils/context"
import Constants from 'expo-constants';
import NavigationNotes from './stackScreen/NavigationNotes';
import FoodsScreen from "./stackScreen/FoodsScreen"
import LayoutorHome from "./components/Profile/LayoutorHome";

import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();
export default function App() {

  return (
      <NavigationContainer>
        <LayoutorHome />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});