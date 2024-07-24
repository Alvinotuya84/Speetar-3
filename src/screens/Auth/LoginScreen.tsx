import {View, Text} from 'react-native';
import React from 'react';
import Page from '@/src/components/reusables/Page';
import ImageWrapper from '@/src/components/reusables/ImageWrapper';
import Box from '@/src/components/reusables/Box';
import ThemedText from '@/src/components/reusables/ThemedText';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {scale} from '@/src/constants/scaler.constants';
import AuthStepIndicator from '@/src/components/reusables/AuthStepIndicator';
import ThemedTextInput, {
  ThemedEmailInput,
  ThemedPasswordInput,
  ThemedPhoneNumberInput,
} from '@/src/components/reusables/ThemedTextInput';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import {sWidth} from '@/src/constants/dimensions.constants';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';
import ThemedIcon from '@/src/components/reusables/ThemedIcon';
import Spacer from '@/src/components/reusables/Spacer';

type Props = {};

const LoginScreen = (props: Props) => {
  const theme = useTheme();
  const navigation = useSafeNavigation();
  return (
    <Page px={scale(20)}>
      <ImageWrapper
        source={require('@/assets/logo-light.png')}
        height={100}
        width={100}
        resizeMode="contain"
      />
      <Box flex={1} justify="space-evenly" align="center">
        <ThemedText
          weight="bold"
          color={theme.primary}
          fontWeight="bold"
          size={'xxl'}>
          Login here
        </ThemedText>

        <ThemedText>
          Welcome back stay informed with personalized news tailored just for
          you
        </ThemedText>
        <Box width={'100%'} my={scale(20)}>
          <AuthStepIndicator currentStep={1} />
        </Box>

        <ThemedEmailInput
          wrapper={{
            width: '100%',
          }}
          placeholder="Enter your email address"
        />

        <Box align="flex-end" width={'100%'}>
          <ThemedPasswordInput
            wrapper={{
              width: '100%',
            }}
          />
          <ThemedButton
            type="text"
            label={'Forgot Password?'}
            labelProps={{
              color: theme.primary,
            }}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          />
        </Box>

        <ThemedButton width={'100%'} label={'Login'} />

        <ThemedButton
          width={'100%'}
          onPress={() => navigation.navigate('LoginScreen')}
          type="primary-outlined">
          <Box direction="row" pa={10} align="center">
            <ThemedIcon source="AntDesign" size={'md'} name="google" />
            <Spacer width={10} />
            <ThemedText size={'sm'}>Sign-in using google</ThemedText>
          </Box>
        </ThemedButton>
      </Box>
    </Page>
  );
};

export default LoginScreen;
