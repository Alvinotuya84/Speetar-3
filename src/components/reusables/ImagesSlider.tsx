import React, {useRef, useState} from 'react';
import {FlatList, Dimensions} from 'react-native';
import {Source} from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import ThemedButton from './ThemedButton';
import Box from './Box';
import ImageWrapper from './ImageWrapper';
import {sWidth} from '@/src/constants/dimensions.constants';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {scale} from '@/src/constants/scaler.constants';
import {useToast} from '../toast-manager';

const {width: screenWidth} = Dimensions.get('window');

const ImageSlider = ({
  images,
  onSelecteImage,
}: {
  images: Source[];
  onSelecteImage: (selectedImage: Source) => void;
}) => {
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const scrollX = useSharedValue(0);
  const scrollRef = useRef(null);
  const itemWidth = screenWidth * 0.6; // Adjust width to fit 3 items in view
  const sideSpacing = (screenWidth - itemWidth) / 3.5;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const RenderItem = ({item, index}: {item: Source; index: number}) => {
    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];
    const style = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.8, 1.2, 0.8],
        Extrapolate.CLAMP,
      );
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      );
      return {
        transform: [{scale}],
        opacity,
      };
    });
    const toast = useToast();
    return (
      <ThemedButton
        type="text"
        onPress={() => {
          setSelected(index);
          scrollRef?.current.scrollToOffset({
            offset: index * itemWidth,
            animated: true,
          });
          onSelecteImage(item);
          toast.showToast({
            title: 'Image Selected',
          });
        }}>
        <Animated.View
          style={[
            {
              width: itemWidth,
              height: scale(170),
              marginHorizontal: scale(10),
              borderRadius: scale(20),
              overflow: 'hidden',
            },
            style,
          ]}>
          <ImageWrapper
            resizeMode="cover"
            borderColor={theme.success}
            borderWidth={selected === index ? 4 : 0}
            source={item}
            width={itemWidth}
            height={scale(170)}
          />
        </Animated.View>
      </ThemedButton>
    );
  };

  return (
    <Animated.FlatList
      ref={scrollRef}
      data={images}
      renderItem={({item, index}) => <RenderItem item={item} index={index} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={false} // Disable default paging
      onScroll={scrollHandler}
      scrollEventThrottle={scale(16)}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponentStyle={{
        marginVertical: scale(20),
      }}
      contentContainerStyle={{
        paddingHorizontal: sideSpacing,
        // Center the items in the middle of the screen
      }}
      snapToInterval={itemWidth} // Ensure snapping to each item
      decelerationRate="fast" // Smooth scrolling
    />
  );
};

export default ImageSlider;
