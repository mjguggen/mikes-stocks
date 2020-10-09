import React, {useEffect, useState} from 'react';
import { 
  SafeAreaView,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'

//Redux
import { Provider } from 'react-redux';
import returnStoreAndPersistor from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

//Screens
import Home from './Screens/Home'
import NewsBrowser from './Screens/NewsBrowser'

//Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

const App = () => {
  const { store, persistor } = returnStoreAndPersistor()

  return (
    <Provider store={store}>
      <PersistGate 
        loading={null} 
        persistor={persistor}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              headerMode="none"
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="NewsBrowser" component={NewsBrowser} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App