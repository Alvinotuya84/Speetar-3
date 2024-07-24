import {View, Text, Alert} from 'react-native';
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
import {sWidth} from '@/src/constants/dimensions.constants';
import Spacer from '@/src/components/reusables/Spacer';
import {useToast} from '@/src/components/toast-manager';
import useMainStore from '@/src/app/store2';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';
import ThemedSwitchButton from '@/src/components/reusables/ThemedSwitchButton';
import Geolocation from '@react-native-community/geolocation';
import {NearbyRestaurantsResponse} from '@/src/types/locationinfo';
import Rating from '@/src/components/reusables/Rating';
import ThemedModal from '@/src/components/reusables/ThemedModal';
import {useDispatch} from 'react-redux';
import ThemedActivityIndicator from '@/src/components/reusables/ThemedActivityIndicator';
import {FlashList} from '@shopify/flash-list';

type Props = {};

const DashBoardScreen = (props: Props) => {
  const theme = useTheme();
  const toast = useToast();
  const [ip, setIp] = React.useState<string>('');
  const navigation = useSafeNavigation();
  const {theme: userTheme, setTheme} = useMainStore();
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleSearch = () => {
    const location = `location=${coordinates?.latitude},${coordinates?.longitude}`;
    const radius = '&radius=2000';
    const type = '&keyword=restaurant';
    const key = '&key=AIzaSyCHHzlPfuUD6JyzylB84QHbeoe6iVIgrxA';
    return (
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
      location +
      radius +
      type +
      key
    );
  };

  const {
    data: restaurantData,
    error,
    isLoading: isRestaurantDataLoading,
    refetch,
  } = useQuery({
    queryKey: [coordinates?.latitude, coordinates?.longitude],
    queryFn: async () => {
      const response = await fetchJson<NearbyRestaurantsResponse>(
        handleSearch(),
      );

      if (response.status == 'OK') {
        toast.showToast({
          type: 'success',
          title: 'Restaurant details updated',
        });
      } else {
        toast.showToast({
          type: 'error',
          title: 'IP Address not restaurant details update failed',
        });
      }

      return response;
    },
  });
  useEffect(() => {
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoordinates({latitude, longitude});
        refetch();
      },
      error => {
        console.log(error);
        Alert.alert('Error', 'Failed to get location. Please try again.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <Box flex={1}>
      <Box width={'100%'} color={theme.text} px={scale(10)} align="flex-end">
        <ThemedSwitchButton
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
        />
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
              Get Restaurant
            </ThemedText>
          </Box>

          <ImageWrapper
            source={require('@/assets/home/amega-home.png')}
            height={scale(100)}
            width={scale(100)}
          />
        </Box>
      </LinearGradientBox>

      <Box flex={1} color={theme.background} gap={10} pa={10}>
        {isRestaurantDataLoading && <ThemedActivityIndicator size={'large'} />}
        <FlashList
          estimatedItemSize={50}
          data={restaurantData?.results}
          renderItem={({item}) => <RestaurantItem restaurant={item} />}
          keyExtractor={item => item.name}
        />
      </Box>
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
  const {showToast} = useToast();
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
          <ImageWrapper
            height={scale(150)}
            width={sWidth - scale(40)}
            source={{uri: restaurant.icon_mask_base_uri}}
          />
          <ThemedText>Description: {restaurant.name}</ThemedText>
          <Box direction="row" gap={10}>
            <ThemedButton
              label="Add to Cart"
              onPress={() => {}}
              width={sWidth * 0.5}
              color={theme.danger}
            />
            <ThemedButton
              onPress={() => setAddToCartModal(false)}
              type="primary-outlined"
              label="Cancel"
            />
          </Box>
        </Box>
      </ThemedModal>
      <Box
        borderWidth={1}
        borderColor={theme.text}
        my={10}
        direction="row"
        width={'100%'}
        radius={scale(10)}
        color={theme.background}
        pa={scale(10)}>
        <ImageWrapper
          width={sWidth / 2 - scale(20)}
          source={{uri: restaurant.icon_mask_base_uri}}
          height={scale(150)}
          resizeMode="contain"
        />
        <Box
          height={'100%'}
          px={scale(10)}
          width={sWidth / 2 - scale(20)}
          justify="space-between">
          <ThemedText
            size={'xs'}
            textProps={{
              numberOfLines: 2,
              ellipsizeMode: 'middle',
            }}>
            {restaurant.vicinity}
          </ThemedText>

          <Rating rating={restaurant.rating} />
          <ThemedText size="lg" weight="bold" color={theme.primary}>
            ${restaurant.price_level}
          </ThemedText>
          <ThemedText size="sm" color={theme.primaryGray}>
            Vicinty: {restaurant.vicinity}
          </ThemedText>
        </Box>
      </Box>
    </ThemedButton>
  );
};

export default DashBoardScreen;
