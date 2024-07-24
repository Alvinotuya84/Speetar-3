import React from 'react';
import ImageWrapper from './ImageWrapper';
import Box from './Box';
import ThemedText from './ThemedText';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {sHeight} from '@/src/constants/dimensions.constants';

type AuthFancyHeaderProps = {
  title: string;
  subtitle: string;
};

const AuthFancyHeader: React.FC<AuthFancyHeaderProps> = ({title, subtitle}) => {
  const theme = useTheme();
  return (
    <Box height={sHeight * 0.3}>
      <ImageWrapper
        source={require('@/assets/logo-light.png')}
        height={120}
        width={120}
        resizeMode="contain"
      />
      <Box flex={1} justify="space-evenly" align="center">
        <ThemedText
          weight="bold"
          color={theme.primary}
          fontWeight="bold"
          size={'xxl'}>
          {title}
        </ThemedText>

        <ThemedText size={'sm'}>{subtitle}</ThemedText>
      </Box>
    </Box>
  );
};

export default AuthFancyHeader;
