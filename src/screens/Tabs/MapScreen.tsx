import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import Page from '@/src/components/reusables/Page';
import ThemedTextInput from '@/src/components/reusables/ThemedTextInput';
import Box from '@/src/components/reusables/Box';
import ThemedButton, {
  ThemedIconButton,
} from '@/src/components/reusables/ThemedButton';
import ThemedActivityIndicator from '@/src/components/reusables/ThemedActivityIndicator';
import ThemedModal, {
  ThemedModalProps,
} from '@/src/components/reusables/ThemedModal';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {sHeight} from '@/src/constants/dimensions.constants';
import ThemedCard from '@/src/components/reusables/ThemedCard';
import ThemedIcon from '@/src/components/reusables/ThemedIcon';
import {cryptoIcons} from '@/assets-info/Icons/new-crypto-icons/crypto_2';

import {handleErrorResponse} from '@/src/utils/error.utils';
import ThemedText from '@/src/components/reusables/ThemedText';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useMainStore from '@/src/app/store2';
import Geolocation from '@react-native-community/geolocation';

const MapScreenMapScreen = () => {
  const {
    coordinates,
    setCoordinates: setGlobalCoordinates,
    userRestaurants,
  } = useMainStore();

  const _onMapReady = () => {
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setGlobalCoordinates({lat: latitude, lng: longitude});
      },
      error => {
        console.log(error);
        Alert.alert('Error', 'Failed to get location. Please try again.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    _onMapReady;
  }, []);
  return (
    <>
      <Page header={{title: 'Restaurant'}} gap={10}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: coordinates?.lat || 37.7749,
            longitude: coordinates?.lng || -122.4194,
            latitudeDelta: 0.9,
            longitudeDelta: 0.0,
          }}
          showsIndoors={true}
          showsMyLocationButton={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          showsScale={true}
          // showsTraffic={true}
          showsBuildings={true}
          showsCompass={true}
          onMapReady={_onMapReady}
          style={{
            height: Dimensions.get(`window`).height,
            width: Dimensions.get(`window`).width,
          }}>
          {userRestaurants?.map((item, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                }}
              />
            );
          })}
        </MapView>
      </Page>
    </>
  );
};

export default MapScreenMapScreen;
