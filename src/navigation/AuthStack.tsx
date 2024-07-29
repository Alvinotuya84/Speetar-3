import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '@/src/screens/Auth/SignUpScreen';
import LoginScreen from '@/src/screens/Auth/LoginScreen';
import {NavigationRoutes} from './NavigationRoutes';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import ChooseAuthTypeScreen from '@/src/screens/Auth/ChooseAuthTypeScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import useMainStore from '../app/store2';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {onboarded} = useMainStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!onboarded && (
        <Stack.Screen
          name={NavigationRoutes.Auth.OnBoardingScreen}
          component={OnboardingScreen}
        />
      )}
      <Stack.Screen
        name={NavigationRoutes.Auth.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NavigationRoutes.Auth.SignUpScreen}
        component={SignUpScreen}
      />
      <Stack.Screen
        name={NavigationRoutes.Auth.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
