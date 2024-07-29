import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';
import TabStack from './TabStack';
import useMainStore from '../app/store2';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const {accessToken} = useMainStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!accessToken ? (
          <Stack.Screen name="Onboarding" component={AuthStack} />
        ) : (
          <Stack.Screen name="Tabs" component={TabStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
