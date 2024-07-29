import {View, Text, Alert, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from '@/src/components/reusables/Box';
import LinearGradientBox from '@/src/components/reusables/LinearGradientBox';
import {scale} from '@/src/constants/scaler.constants';
import {useTheme} from '@/src/hooks/useTheme.hook';
import ThemedText from '@/src/components/reusables/ThemedText';
import {ThemedSearchInput} from '@/src/components/reusables/ThemedTextInput';
import ImageWrapper from '@/src/components/reusables/ImageWrapper';
import ImageSlider from '@/src/components/reusables/ImagesSlider';
import {useQuery} from '@tanstack/react-query';
import {fetchJson} from '@/src/utils/fetch.utils';
import ThemedButton, {
  ThemedIconButton,
} from '@/src/components/reusables/ThemedButton';
import ThemedIcon from '@/src/components/reusables/ThemedIcon';
import {sHeight, sWidth} from '@/src/constants/dimensions.constants';
import Spacer from '@/src/components/reusables/Spacer';
import {useToast} from '@/src/components/toast-manager';
import useMainStore from '@/src/app/store2';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';
import ThemedSwitchButton from '@/src/components/reusables/ThemedSwitchButton';
import Geolocation from '@react-native-community/geolocation';
import {NearbyRestaurantsResponse} from '@/src/types/locationinfo';
import Rating from '@/src/components/reusables/Rating';
import ThemedModal from '@/src/components/reusables/ThemedModal';
import ThemedActivityIndicator from '@/src/components/reusables/ThemedActivityIndicator';
import {FlashList} from '@shopify/flash-list';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {calculateDistance} from '@/src/utils/functions';
import {UserProfileResponse} from '@/src/types/auth';
import {BASE_URL} from '@/src/constants/network.constants';
import ThemedAvatar from '@/src/components/reusables/ThemedAvatar';

type Props = {};

const DashBoardScreen = (props: Props) => {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useSafeNavigation();
  const {showToast} = useToast();
  const {theme: userTheme, setTheme} = useMainStore();
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const {data: userProfile} = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const response = await fetchJson<UserProfileResponse>(
        `${BASE_URL}/users/profile`,
      );
      if (response.success) {
        return response;
      } else {
        showToast({
          type: 'error',
          title: 'Failed to fetch user profile',
        });
        return null;
      }
    },
  });

  return (
    <Box flex={1}>
      <Box width={'100%'} py={10} px={scale(10)} align="flex-end">
        <ThemedAvatar
          color={theme.primary}
          onPress={() => navigation.navigate('ProfileScreen')}
          size={30}
          url={''}
          username="Alvin Otuya"
        />
        {/* <ThemedSwitchButton
          label={
            userTheme === 'light' || userTheme === 'system'
              ? 'Light Theme'
              : 'Dark Theme'
          }
          labelProps={{
            weight: 'bold',
            color: theme.background,
          }}
          value={userTheme === 'light' || userTheme === 'system' ? false : true}
          onValueChange={() => {
            setTheme(userTheme === 'light' ? 'dark' : 'light');
          }}
        /> */}
      </Box>
      <LinearGradientBox
        colors={[theme.primary, theme.background]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        height={scale(170)}
        px={scale(20)}
        py={scale(50)}
        color={theme.primary}>
        <Box direction="row" align="center" justify="space-between">
          <Box alignSelf="flex-end">
            <ThemedText color={theme.background} size={'xxxl'} weight="bold">
              Hello {userProfile?.data.username}
            </ThemedText>
          </Box>

          {/* <ImageWrapper
            source={require('@/assets/home/amega-home.png')}
            height={scale(100)}
            width={scale(100)}
          /> */}
        </Box>
      </LinearGradientBox>

      <Box flex={1} color={theme.background} gap={10} pa={10}></Box>
    </Box>
  );
};

const RestaurantItem = ({
  restaurant,
}: {
  restaurant: NearbyRestaurantsResponse['results'][0];
}) => {
  const theme = useTheme();
  const [openAddToCartModal, setAddToCartModal] = useState(false);
  const {coordinates} = useMainStore();

  const distance = coordinates
    ? calculateDistance(
        coordinates.lat,
        coordinates.lat,
        restaurant.geometry.location.lat,
        restaurant.geometry.location.lng,
      )
    : null;
  return (
    <ThemedButton onPress={() => setAddToCartModal(true)} type="text">
      <ThemedModal
        visible={openAddToCartModal}
        onRequestClose={() => setAddToCartModal(false)}
        close={() => setAddToCartModal(false)}>
        <Box
          direction="column"
          gap={20}
          color={theme.background}
          pa={20}
          radius={scale(10)}>
          <Box alignSelf="center">
            <ImageWrapper
              height={scale(150)}
              width={sWidth * 0.5}
              source={{uri: restaurant.icon}}
              borderColor={theme.primary}
              radius={9}
              borderWidth={1}
            />
          </Box>
          <ThemedText>Restaurant Name: {restaurant.name}</ThemedText>
          <ThemedText weight="bold">Location: {restaurant.name}</ThemedText>

          <ThemedButton
            onPress={() => setAddToCartModal(false)}
            type="primary-outlined"
            label="Close"
          />
        </Box>
      </ThemedModal>
      <Box
        align="center"
        borderWidth={1}
        borderColor={theme.text}
        my={10}
        height={sHeight * 0.35}
        width={sWidth * 0.45}
        radius={scale(10)}
        color={theme.background}
        pa={scale(10)}>
        <ImageWrapper
          width={sWidth / 2 - scale(20)}
          source={{
            uri: 'https://via.placeholder.com/300',
          }}
          height={scale(150)}
          resizeMode="contain"
        />

        <Box alignSelf="flex-start" px={scale(10)}>
          <ThemedText
            size={'xs'}
            weight="bold"
            color={theme.primary}
            textProps={{
              numberOfLines: 2,
              ellipsizeMode: 'middle',
            }}>
            {restaurant.name}
          </ThemedText>

          <Rating rating={restaurant.rating} />
          {/* <ThemedText size="lg" weight="bold" color={theme.primary}>
            ${restaurant.price_level}
          </ThemedText> */}
          <ThemedText size="xs" color={theme.primaryGray}>
            <ThemedIcon source="Ionicons" name="location" size={'xs'} />:{' '}
            {restaurant.vicinity}
          </ThemedText>
          {distance && (
            <ThemedText size="xs" color={theme.primary}>
              Distance: {distance} km
            </ThemedText>
          )}
        </Box>
      </Box>
    </ThemedButton>
  );
};

export default DashBoardScreen;
