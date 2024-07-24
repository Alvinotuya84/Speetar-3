import React from 'react';
import {View} from 'react-native';
import ThemedIcon from './ThemedIcon';
import Box from './Box';

const Rating = ({rating}: {rating: number}) => {
  const filledStars = Array(Math.floor(rating)).fill('star');
  const halfStars = rating % 1 >= 0.5 ? ['star-half'] : [];
  const emptyStars = Array(5 - Math.ceil(rating)).fill('star-outline');

  return (
    <Box direction="row">
      {filledStars.map((type, index) => (
        <ThemedIcon
          source="Ionicons"
          key={index}
          name={type}
          size={24}
          color="gold"
        />
      ))}
      {halfStars.map((type, index) => (
        <ThemedIcon
          source="Ionicons"
          key={index + filledStars.length}
          name={type}
          size={24}
          color="gold"
        />
      ))}
      {emptyStars.map((type, index) => (
        <ThemedIcon
          source="Ionicons"
          key={index + filledStars.length + halfStars.length}
          name={type}
          size={24}
          color="gold"
        />
      ))}
    </Box>
  );
};

export default Rating;
