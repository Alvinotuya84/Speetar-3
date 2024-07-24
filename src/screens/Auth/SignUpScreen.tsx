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
  ThemedPhoneNumberInput,
} from '@/src/components/reusables/ThemedTextInput';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import {sWidth} from '@/src/constants/dimensions.constants';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';

type Props = {};

const SignUpScreen = (props: Props) => {
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
          Create Account
        </ThemedText>

        <ThemedText>
          Welcome back stay informed with personalized news tailored just for
          you
        </ThemedText>
        <Box width={'100%'} my={scale(20)}>
          <AuthStepIndicator currentStep={1} />
        </Box>

        <ThemedTextInput
          wrapper={{
            width: '100%',
          }}
          placeholder="Enter your email"
        />
        <ThemedPhoneNumberInput
          wrapper={{
            width: '100%',
          }}
          placeholder="Enter your phone number"
        />
        <ThemedEmailInput
          wrapper={{
            width: '100%',
          }}
          placeholder="Enter your email"
        />

        <ThemedButton width={'100%'} label={'Continue'} />
        <ThemedButton
          type="text"
          labelProps={{
            color: theme.primary,
          }}
          onPress={() => navigation.navigate('OTPScreen')}
          width={'100%'}
          label={'Already have an account?'}
        />
      </Box>
    </Page>
  );
};

export default SignUpScreen;
