import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthStack from './AuthStack';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* {null ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : null ? (
          <Stack.Screen name="App" component={AppStack} />
        ) : ( */}
        <Stack.Screen name="Tabs" component={TabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
