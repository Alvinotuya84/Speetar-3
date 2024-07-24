import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Page from '@/src/components/reusables/Page';
import AuthFancyHeader from '@/src/components/reusables/AuthFancyHeader';
import Box from '@/src/components/reusables/Box';
import FontAwesome5Icon from 'react-native-vector-icons/Entypo';
import ThemedIcon from '@/src/components/reusables/ThemedIcon';
import lightenColor from '@/src/utils/colors.utils';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {scale} from '@/src/constants/scaler.constants';
import ThemedButton from '@/src/components/reusables/ThemedButton';
import ThemedText from '@/src/components/reusables/ThemedText';
import ThemedRadioButton from '@/src/components/reusables/ThemedRadioButton';

type Props = {};

const ForgotPasswordScreen = (props: Props) => {
  const [selectedVerificationType, setSelectedVerificationType] = useState<
    'email' | 'phone'
  >('email');
  return (
    <Page px={20}>
      <Box flex={1}>
        <AuthFancyHeader
          title="Forgot Password"
          subtitle="Please select which contact details we should use to reset your password"
        />
        <VerificationTypeSelector
          type="email"
          onPress={() => setSelectedVerificationType('email')}
          selected={selectedVerificationType === 'email'}
        />
        <VerificationTypeSelector
          type="phone"
          onPress={() => setSelectedVerificationType('phone')}
          selected={selectedVerificationType === 'phone'}
        />
        <ThemedButton mt={scale(20)} label={'Continue'} />
      </Box>
    </Page>
  );
};

export default ForgotPasswordScreen;
const VerificationTypeSelector = (props: {
  type: 'email' | 'phone';
  onPress: () => void;
  selected: boolean;
}) => {
  const theme = useTheme();
  return (
    <ThemedButton onPress={props.onPress} type="text">
      <Box
        my={scale(10)}
        direction="row"
        justify="space-between"
        align="center"
        radius={10}
        borderWidth={1}
        borderColor={
          props.selected ? theme.primary : lightenColor(theme.primary, 0.8)
        }
        pa={10}
        width={'100%'}
        color={!props.selected ? undefined : lightenColor(theme.primary, 0.8)}
        height={80}>
        <Box
          pa={3}
          height={scale(40)}
          borderColor={props.selected ? theme.primary : 'gray'}
          borderWidth={1}
          align="center"
          justify="center"
          width={scale(40)}
          radius={scale(20)}>
          <ThemedIcon
            name={
              props.type === 'email'
                ? 'mail'
                : props.type === 'phone'
                ? 'phone'
                : 'message'
            }
            source="Entypo"
            size={'lg'}
          />
        </Box>
        <Box>
          <ThemedText>Via SMS</ThemedText>
          <ThemedText size={'xs'}>otuyaalvin@gmail.com</ThemedText>
        </Box>

        <ThemedRadioButton checked={props.selected} size="lg" />
      </Box>
    </ThemedButton>
  );
};
