import React from 'react';
import {View} from 'react-native';
import Box from './Box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '@/src/constants/scaler.constants';
import {useTheme} from '@/src/hooks/useTheme.hook';
import ThemedText from './ThemedText';

interface AuthStepIndicatorProps {
  currentStep: number;
}

const AuthStepIndicator: React.FC<AuthStepIndicatorProps> = ({currentStep}) => {
  const theme = useTheme();

  const renderStepContent = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return (
        <AntDesign name="check" size={scale(18)} color={theme.background} />
      );
    } else if (stepNumber === currentStep) {
      return (
        <ThemedText color={theme.primary} size={'xs'}>
          {stepNumber}
        </ThemedText>
      );
    } else return <ThemedText size={'xs'}>{stepNumber}</ThemedText>;
  };

  return (
    <View style={{position: 'relative', width: '100%', alignItems: 'center'}}>
      {[1, 2].map(index => (
        <Box
          key={index}
          color={currentStep > index ? theme.primary : theme.border}
          width="47%"
          height={2}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${scale(7) + scale(40) * index + -scale(40)}%`,
            zIndex: 0,
          }}
        />
      ))}
      <Box
        direction="row"
        align="center"
        justify="space-between"
        style={{width: '100%'}}>
        {[1, 2, 3].map(stepNumber => (
          <Box
            key={stepNumber}
            radius={scale(12.5)}
            height={scale(25)}
            width={scale(25)}
            borderWidth={2}
            color={stepNumber < currentStep ? theme.primary : 'white'}
            borderColor={stepNumber <= currentStep ? theme.primary : 'gray'}
            align="center"
            justify="center"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}>
            {renderStepContent(stepNumber)}
          </Box>
        ))}
      </Box>
    </View>
  );
};

export default AuthStepIndicator;
