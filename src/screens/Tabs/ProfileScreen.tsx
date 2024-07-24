import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import SettingsStore from '@/src/app/store2';
import Page from '@/src/components/reusables/Page';
import Box from '@/src/components/reusables/Box';
import {scale} from '@/src/constants/scaler.constants';
import {useTheme} from '@/src/hooks/useTheme.hook';
import ThemedText from '@/src/components/reusables/ThemedText';

type Props = {};

const ProfileScreen = (props: Props) => {
  const {userIpDetails} = SettingsStore();
  const theme = useTheme();

  const IpDetailsWrapper = ({
    title,
    value,
  }: {
    title: string;
    value: string | null | undefined;
  }) => {
    return (
      <Box
        width={'45%'}
        borderWidth={1}
        radius={10}
        ma={5}
        pa={10}
        justify={'center'}
        color={theme.primary}
        borderColor={theme.background}
        align={'center'}>
        <ThemedText weight="bold" color={theme.background}>
          {title}
        </ThemedText>
        <ThemedText color={theme.background}>{value}</ThemedText>
      </Box>
    );
  };
  return (
    <Page>
      <ImageBackground
        style={styles.container}
        source={userIpDetails?.image as ImageSourcePropType}>
        <Box wrap="wrap" direction="row" justify="space-around">
          <IpDetailsWrapper title="IP Address" value={userIpDetails?.ip} />
          <IpDetailsWrapper
            title="TimeZone"
            value={`${userIpDetails?.timezone?.abbr}/UTC ${userIpDetails?.timezone?.utc}`}
          />
          <IpDetailsWrapper title="Location" value={userIpDetails?.country} />
          <IpDetailsWrapper title="ISP" value={userIpDetails?.region} />
        </Box>
      </ImageBackground>
    </Page>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: scale(50),
  },
  gridItem: {
    width: '45%', // for two items per row
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
