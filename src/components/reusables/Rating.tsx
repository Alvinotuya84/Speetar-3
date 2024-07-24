import React from 'react';
import {View} from 'react-native';
import ThemedIcon from './ThemedIcon';
import Box from './Box';
import {useTheme} from '@/src/hooks/useTheme.hook';

const Rating = ({rating}: {rating: number}) => {
  const filledStars = Array(Math.floor(rating)).fill('star');
  const halfStars = rating % 1 >= 0.5 ? ['star-half'] : [];
  const emptyStars = Array(5 - Math.ceil(rating)).fill('star-outline');
  const theme = useTheme();
  return (
    <Box direction="row">
      {filledStars.map((type, index) => (
        <ThemedIcon
          source="Ionicons"
          key={index}
          name={type}
          size={24}
          color={theme.primary}
        />
      ))}
      {halfStars.map((type, index) => (
        <ThemedIcon
          source="Ionicons"
          key={index + filledStars.length}
          name={type}
          size={24}
          color={theme.primary}
        />
      ))}
      {emptyStars.map((type, index) => (
        <ThemedIcon
          source="Ionicons"
          key={index + filledStars.length + halfStars.length}
          name={type}
          size={24}
          color={theme.primary}
        />
      ))}
    </Box>
  );
};

export default Rating;
