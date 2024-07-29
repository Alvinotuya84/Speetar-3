import {View, Text} from 'react-native';
import React from 'react';
import Page from '@/src/components/reusables/Page';
import ThemedSwitchButton from '@/src/components/reusables/ThemedSwitchButton';
import useMainStore from '@/src/app/store2';
import {scale} from '@/src/constants/scaler.constants';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';

type Props = {};

const ProfileScreen = (props: Props) => {
  const {theme: userTheme, setTheme, logout} = useMainStore();
  const theme = useTheme();
  const navigation = useSafeNavigation();
  return (
    <Page pa={scale(20)} gap={20}>
      <ThemedSwitchButton
        onValueChange={() => {
          setTheme(userTheme === 'light' ? 'dark' : 'light');
        }}
        value={userTheme === 'light' || userTheme === 'system'}
        label={
          userTheme === 'light'
            ? 'Light Theme'
            : userTheme === 'system'
            ? 'System Theme'
            : 'Dark Theme'
        }
      />
      <ThemedButton
        color={theme.danger}
        onPress={() => {
          logout();
          navigation.navigate('LoginScreen');
        }}
        label={'Logout'}
      />
    </Page>
  );
};

export default ProfileScreen;
