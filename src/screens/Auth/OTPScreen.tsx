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
  ThemedOTPInput,
  ThemedPhoneNumberInput,
} from '@/src/components/reusables/ThemedTextInput';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import {sWidth} from '@/src/constants/dimensions.constants';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';

type Props = {};

const OTPScreen = (props: Props) => {
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
          OTP
        </ThemedText>

        <ThemedText>
          Please enter the otp sent to your phone number +254797 **3
        </ThemedText>
        <Box width={'100%'} my={scale(20)}>
          <AuthStepIndicator currentStep={2} />
        </Box>

        <ThemedOTPInput
          otpLength={4}
          wrapper={{
            width: '100%',
          }}
        />
        <ThemedButton width={'100%'} type="text" label={'Resend Code in 50s'} />

        <ThemedButton
          width={'100%'}
          onPress={() => navigation.navigate('ConnectSocialScreen')}
          label={'Continue'}
        />
      </Box>
    </Page>
  );
};

export default OTPScreen;
