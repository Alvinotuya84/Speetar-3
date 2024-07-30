import {NavigationProp} from '@react-navigation/native';

export const NavigationRoutes = {
  Auth: {
    LoginScreen: 'LoginScreen',
    SignUpScreen: 'SignUpScreen',
    OnBoardingScreen: 'OnBoardingScreen',
    ChooseAuthTypeScreen: 'ChooseAuthTypeScreen',
    OTPScreen: 'OTPScreen',
    ConnectSocialScreen: 'ConnectSocialScreen',
    ForgotPasswordScreen: 'ForgotPasswordScreen',
  },
  HomeTabs: {
    DashboardScreen: 'DashboardScreen',
    TasksScreen: 'TasksScreen',
    ProfileScreen: 'ProfileScreen',
  },
};
type AuthStackParamList = {
  [K in keyof typeof NavigationRoutes.Auth]: undefined;
};

type HomeStackParamList = {
  [K in keyof typeof NavigationRoutes.HomeTabs]: undefined;
};

export type RootStackParamList = AuthStackParamList & HomeStackParamList;
export type StackNavigationTypes = NavigationProp<RootStackParamList>;
