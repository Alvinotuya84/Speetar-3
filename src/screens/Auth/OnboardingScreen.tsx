import Box from '@/src/components/reusables/Box';
import Page from '@/src/components/reusables/Page';
import ThemedButton, {
  ThemedIconButton,
} from '@/src/components/reusables/ThemedButton';
import ThemedText from '@/src/components/reusables/ThemedText';
import {sHeight, sWidth} from '@/src/constants/dimensions.constants';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {animateLayout} from '@/src/utils/animation.utils';

import React, {useState} from 'react';
import {ImageSourcePropType, ScrollView} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import FastImage, {Source} from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const onboardingSlidesData = [
  {
    title: 'Expand Your Circle by connecting  with people around the world',
    img: require('@/assets/onboarding/news_one.png'),
    desc: 'Get instant notifications for breaking news and updates.',
  },
  {
    title: 'Chat with strangers and make the your partner',
    img: require('@/assets/onboarding/news_two.png'),
    desc: 'Save articles and read offline at your convenience.',
  },
  {
    title: 'Embark on a Personalized Journey to Discover Your Ideal Connection',
    img: require('@/assets/onboarding/news_three.png'),
    desc: 'Take the first step on your journey to better your life. Get started today!',
  },
];

function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const theme = useTheme();
  const navigation = useSafeNavigation();
  const insets = useSafeAreaInsets();

  const scrollRef = React.useRef<ScrollView>(null);

  return (
    <>
      <Page
        color={theme.primary}
        header={{
          rightComponent: (
            <Box width={'100%'}>
              {currentSlideIndex <= onboardingSlidesData.length - 1 && (
                <ThemedButton
                  label={'Skip'}
                  onPress={() => {
                    scrollRef.current?.scrollToEnd({animated: true});
                    setCurrentSlideIndex(onboardingSlidesData.length + 1);
                  }}
                  type="text"
                  size="sm"
                  labelProps={{
                    color: theme.primary,
                  }}
                />
              )}
            </Box>
          ),
        }}
        align="center"
        px={0}>
        <Box height={sHeight - insets.bottom - 180}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={32}
            onScroll={event => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / sWidth,
              );
              animateLayout();
              setCurrentSlideIndex(slideIndex);

              if (slideIndex === onboardingSlidesData.length) {
                // userStore.setState({onboarded: true});
              }
            }}
            snapToAlignment="center"
            decelerationRate={'fast'}
            style={{
              width: sWidth,
            }}>
            {onboardingSlidesData.map((item, index) => {
              return (
                <OnboardingWrapper
                  img={item.img}
                  title={item.title}
                  content={item.desc}
                  key={index}
                />
              );
            })}
          </ScrollView>
        </Box>

        <Box direction="row" align="center">
          <Box
            direction="row"
            gap={10}
            align="center"
            height={
              currentSlideIndex <= onboardingSlidesData.length - 1 ? 20 : 0
            }
            overflow="hidden">
            {onboardingSlidesData.map((item, index) => {
              return (
                <Box
                  key={index}
                  width={currentSlideIndex === index ? 20 : 10}
                  height={10}
                  radius={10}
                  color={
                    currentSlideIndex === index ? theme.surface : theme.text
                  }
                  style={{
                    alignSelf: 'center',
                  }}
                />
              );
            })}
          </Box>
          <ThemedButton
            onPress={() => navigation.navigate('ChooseAuthTypeScreen')}
            icon={{
              name: "'arrow-forward-circle'",
              source: 'Ionicons',
              size: 'lg',
            }}
          />
        </Box>
      </Page>
    </>
  );
}

export default OnboardingScreen;

const OnboardingWrapper = ({
  title,
  content,
  img,
  isInView,
}: {
  title: string;
  content: string;
  img: Source;
  isInView?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Box align="center" justify="flex-start" gap={40} width={sWidth} px={20}>
      <Box
        width={'100%'}
        height={sHeight / 2}
        align="center"
        justify="center"
        radius={20}>
        <FastImage
          source={img}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <Box align="center" justify="center">
        <ThemedText
          size={22}
          color={theme.text}
          align="center"
          fontWeight="bold">
          {title}
        </ThemedText>
        <ThemedText fontWeight="regular" align="center">
          {content}
        </ThemedText>
      </Box>
    </Box>
  );
};
