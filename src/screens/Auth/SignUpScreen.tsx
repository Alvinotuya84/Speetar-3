import {View, Text} from 'react-native';
import React from 'react';
import Page, {BackButton} from '@/src/components/reusables/Page';
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
import {useMutation, useQuery} from '@tanstack/react-query';
import useForm from '@/src/hooks/useForm.hook';
import {z} from 'zod';
import {fetchJson, postJson} from '@/src/utils/fetch.utils';
import {BASE_URL} from '@/src/constants/network.constants';
import {
  AuthResponse,
  RegisterResponse,
  UserProfileResponse,
} from '@/src/types/auth';
import {useToast} from '@/src/components/toast-manager';
import useMainStore from '@/src/app/store2';
import useKeyboardVisibility from '@/src/hooks/useKeyboardVisiblity.hook';

type Props = {};

const SignUpScreen = (props: Props) => {
  const theme = useTheme();
  const {showToast} = useToast();
  const navigation = useSafeNavigation();
  const {setAccessToken} = useMainStore();
  const keyboardVisibility = useKeyboardVisibility();

  const {validateForm, setFormValue, formState} = useForm([
    {
      name: 'username',
      value: '',
      schema: z.string(),
    },
    {
      name: 'password',
      value: '',
      schema: z.string().min(8),
    },
  ]);
  const SignUpMutation = useMutation({
    mutationFn: async () => {
      const response = await postJson<RegisterResponse>(
        `${BASE_URL}/users/register`,
        {
          username: formState.username,
          password: formState.password,
        },
      );

      if (response.success) {
        showToast({
          type: 'success',
          title: 'SignUp successful',
        });
        navigation.navigate('LoginScreen');
      } else {
        showToast({
          type: 'error',
          title: response?.message ?? 'Error Signing up',
        });
      }
    },
  });

  return (
    <Box flex={1} pa={scale(20)}>
      <Box direction="row">
        <BackButton />
      </Box>
      <ImageWrapper
        source={require('@/assets/logo-light.png')}
        height={100}
        width={100}
        resizeMode="contain"
      />
      <Box flex={1} justify="space-evenly" align="center">
        {keyboardVisibility ? null : (
          <Box align="center">
            <ThemedText
              weight="bold"
              color={theme.primary}
              fontWeight="bold"
              size={'xxl'}>
              SignUp here
            </ThemedText>
            <ThemedText
              style={{
                textAlign: 'center',
              }}>
              Welcome to Amega DailyDone where you get to manage your tasks and
              resources
            </ThemedText>
          </Box>
        )}
        <Box width={'100%'} my={scale(20)}>
          <AuthStepIndicator currentStep={1} />
        </Box>

        <ThemedTextInput
          onChangeText={text => {
            setFormValue('username', text);
          }}
          wrapper={{
            width: '100%',
          }}
          placeholder="Enter your Username"
        />

        <Box align="flex-end" width={'100%'}>
          <ThemedPasswordInput
            wrapper={{
              width: '100%',
            }}
            onChangeText={text => {
              setFormValue('password', text);
            }}
          />
          <ThemedButton
            type="text"
            label={'Already have an account? Sign In'}
            labelProps={{
              color: theme.primary,
            }}
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </Box>

        <ThemedButton
          width={'100%'}
          loading={SignUpMutation.isPending}
          onPress={() => validateForm(() => SignUpMutation.mutate())}
          label={'Sign Up'}
        />
      </Box>
    </Box>
  );
};

export default SignUpScreen;
