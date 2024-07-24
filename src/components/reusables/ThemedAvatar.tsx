import React, {useEffect, useState} from 'react';
import Box, {BoxProps} from './Box';
import ThemedButton, {ThemedIconButton} from './ThemedButton';
import ThemedText, {ThemedTextProps} from './ThemedText';
import {changeCase} from '@src/utils/text.utils';
import {useTheme, useThemeMode} from '@src/hooks/useTheme.hook';
import FastImage, {FastImageProps} from 'react-native-fast-image';

export default function ThemedAvatar({
  size,
  url,
  username,
  resizeMode = 'cover',
  textProps,
  providedAbriv,
  showSideButton,
  badgeColor,
  showBadge,
  onPress,
  onEditButtonPress,
  ...wrapperProps
}: AvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(url);
  const theme = useTheme();

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(url || '');
        if (!response.ok) {
          // If image URL is not reachable, set imageUrl to null
          setImageUrl(null);
        }
      } catch (error) {
        // Handle network errors or other issues here
        setImageUrl(null);
      }
    };

    if (url) {
      checkImage();
    }
  }, [url]);

  return (
    <Box
      width={size}
      height={size}
      radius={size}
      align="center"
      justify="center"
      position="relative"
      color={theme.surface}
      {...wrapperProps}>
      {imageUrl && imageUrl.startsWith('https') ? (
        <ThemedButton
          type="text"
          width={'100%'}
          height={'100%'}
          radius={size}
          align="center"
          justify="center"
          onPress={() => {
            onPress ? onPress() : () => {};
          }}>
          <FastImage
            source={{uri: imageUrl}}
            style={{width: '100%', height: '100%', borderRadius: size}}
            resizeMode={resizeMode}
          />
        </ThemedButton>
      ) : (
        <ThemedButton
          type="text"
          width={'100%'}
          height={'100%'}
          radius={size}
          align="center"
          justify="center"
          onPress={() => {
            onPress ? onPress() : () => {};
          }}>
          <ThemedText fontWeight="bold" size={size / 2} {...textProps}>
            {changeCase(username.split(' ')[0][0], 'upper')}
            {username.split(' ')[1]?.[0] || providedAbriv || ''}
          </ThemedText>
        </ThemedButton>
      )}
      {showSideButton && (
        <Box
          position="absolute"
          radius={size}
          style={{right: 0, bottom: 0, zIndex: 2, elevation: 2}}>
          <ThemedIconButton
            onPress={() => {
              onEditButtonPress ? onEditButtonPress() : () => {};
            }}
            background={theme.surface}
            icon={{name: 'edit-2'}}
            radius={size}
            size={size / 3.5}
          />
        </Box>
      )}
      {showBadge && (
        <Box
          position="absolute"
          radius={size}
          style={{right: 0, top: 0, zIndex: 2, elevation: 2}}>
          <ThemedButton
            onPress={() => {
              onEditButtonPress ? onEditButtonPress() : () => {};
            }}
            color={badgeColor ?? theme.success}
            width={size / 3.5}
            height={size / 3.5}
            icon={{name: 'edit-2'}}
            radius={size}
          />
        </Box>
      )}
    </Box>
  );
}

export function ThemedHeartAvatar({
  size,
  url,
  username,
  resizeMode = 'cover',
  textProps,
  showSideButton,
  badgeColor,
  showBadge,
  onPress,
  onEditButtonPress,
  ...wrapperProps
}: AvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(url);
  const theme = useTheme();

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(url || '');
        if (!response.ok) {
          // If image URL is not reachable, set imageUrl to null
          setImageUrl(null);
        }
      } catch (error) {
        // Handle network errors or other issues here
        setImageUrl(null);
      }
    };

    if (url) {
      checkImage();
    }
  }, [url]);

  const themeMode = useThemeMode();

  return (
    <Box
      width={size}
      height={size}
      radius={size}
      align="center"
      justify="center"
      position="relative"
      color={theme.surface}
      {...wrapperProps}>
      {imageUrl && imageUrl.startsWith('https') ? (
        <ThemedButton
          type="text"
          onPress={() => {
            onPress ? onPress() : () => {};
          }}
          style={{width: '100%', height: '100%'}}>
          <FastImage
            source={{uri: imageUrl}}
            style={{width: '100%', height: '100%', borderRadius: size}}
            resizeMode={resizeMode}
          />
        </ThemedButton>
      ) : (
        <ThemedButton
          type="text"
          width={'100%'}
          height={'100%'}
          radius={size}
          align="center"
          justify="center"
          onPress={() => {
            onPress ? onPress() : () => {};
          }}>
          <ThemedText fontWeight="bold" size={size / 2} {...textProps}>
            {changeCase(username.split(' ')[0][0], 'upper')}
            {username.split(' ')[1]?.[0] || ''}
          </ThemedText>
        </ThemedButton>
      )}
      {showSideButton && (
        <Box
          position="absolute"
          radius={size}
          style={{right: 0, bottom: 0, zIndex: 2, elevation: 2}}>
          <ThemedIconButton
            onPress={() => {
              onEditButtonPress ? onEditButtonPress() : () => {};
            }}
            background={theme.surface}
            icon={{name: 'edit-2'}}
            radius={size}
            size={size / 3.5}
          />
        </Box>
      )}
      {showBadge && (
        <Box
          position="absolute"
          radius={size}
          style={{right: 0, top: 0, zIndex: 2, elevation: 2}}>
          <ThemedButton
            onPress={() => {
              onEditButtonPress ? onEditButtonPress() : () => {};
            }}
            color={badgeColor ?? theme.success}
            width={size / 3.5}
            height={size / 3.5}
            icon={{name: 'edit-2'}}
            radius={size}
          />
        </Box>
      )}
    </Box>
  );
}

interface AvatarProps extends BoxProps {
  size: number;
  url: string | null;
  username: string;
  textProps?: ThemedTextProps;
  resizeMode?: FastImageProps['resizeMode'];
  showSideButton?: boolean;
  showBadge?: boolean;
  badgeColor?: string;
  onPress?: () => any;
  onEditButtonPress?: () => any;
  providedAbriv?: string;
}
