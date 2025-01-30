import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './app/MainScreen';
import FlashcardScreen from './app/FlashcardScreen';
import SelectionScreen from './app/SelectionScreen';
import TrueOrFalseScreen from './app/TrueOrFalseScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FlashcardScreen" component={FlashcardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrueOrFalseScreen" component={TrueOrFalseScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
