import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Box, {BoxProps} from './Box';
import Spacer from './Spacer';
import ThemedText from './ThemedText';
import {ThemedIconButton, ThemedToggleButton} from './ThemedButton';
import ThemedButton from './ThemedButton';
import ThemedIcon from './ThemedIcon';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {scale} from '@/src/constants/scaler.constants';
import {useSafeNavigation} from '@/src/hooks/useSafeNavigation';
import {useNavigation} from '@react-navigation/native';
import useMainStore from '@/src/app/store2';

export function BackButton() {
  const platform = Platform.OS;
  const navigation = useNavigation();
  return (
    <>
      {true && (
        <ThemedButton type="text" onPress={() => navigation.goBack()} pa={10}>
          {platform === 'ios' ? (
            <ThemedIcon name="chevron-left" size={'xxl'} />
          ) : (
            <ThemedIcon name="arrow-left" size={'xl'} />
          )}
        </ThemedButton>
      )}
    </>
  );
}

const Page = forwardRef(
  ({children, scrollable = false, ...props}: PageProps, ref) => {
    const {height: ScreenHeight, width: ScreenWidth} = Dimensions.get('window');

    useEffect(() => {
      console.log('Page Rendered: ', props.header?.title);
    }, []);
    const {theme: userTheme, setTheme} = useMainStore();

    const scrollRef = React.useRef<ScrollView>(null);

    function scrollToTop() {
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }

    function scrollToBottom() {
      scrollRef.current?.scrollToEnd({animated: true});
    }

    useImperativeHandle(ref, () => ({
      scrollToTop,
      scrollToBottom,
    }));
    const theme = useTheme();
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            backgroundColor: theme.background,
          }}>
          {!props.disableHeader && (
            <>
              {props.headerComponent ? (
                props.headerComponent
              ) : (
                <Box
                  block
                  // color={Colors.theme.background}
                  style={{minHeight: 60}}
                  justify="space-between"
                  direction="row"
                  align="center"
                  px={5}>
                  {!props.header?.disableBackButton ? (
                    <Box ml={26} align="flex-start">
                      <BackButton />
                    </Box>
                  ) : (
                    <Box align="flex-end">
                      {props.header?.rightComponent
                        ? props.header?.rightComponent
                        : null}
                    </Box>
                  )}
                  {/* <Spacer width={30} /> */}
                  <Box flex={1} align="center">
                    <ThemedText
                      fontWeight="semibold"
                      color={'black'}
                      size={scale(16)}>
                      {props.header?.title || ''}
                    </ThemedText>
                  </Box>

                  <Box align="flex-end">
                    {props.header?.rightComponent ? (
                      props.header?.rightComponent
                    ) : (
                      <>
                        <ThemedIconButton
                          radius={scale(20)}
                          height={scale(40)}
                          width={scale(40)}
                          icon={{
                            name: userTheme === 'light' ? 'moon' : 'sun',
                            color: theme.text,
                            size: 'xxl',
                            source: 'Feather',
                          }}
                          onPress={() => {
                            setTheme(userTheme === 'light' ? 'dark' : 'light');
                          }}
                        />
                      </>
                    )}
                  </Box>
                </Box>
              )}
            </>
          )}
          {scrollable ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
                backgroundColor: theme.background,
              }}>
              <Box
                width={ScreenWidth}
                flex={1}
                color={theme.background}
                //   color={Colors.theme.lightBackground}
                pb={50}
                height={'100%'}
                {...props}>
                {children}
              </Box>
            </ScrollView>
          ) : (
            <Box
              width={ScreenWidth}
              // color={Colors.theme.lightBackground}
              pb={50}
              style={{minHeight: ScreenHeight - scale(70)}}
              {...props}>
              {children}
            </Box>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  },
);

export default Page;

interface PageProps extends BoxProps {
  children: ReactNode;
  scrollable?: boolean;
  headerComponent?: ReactNode;
  header?: {
    title?: string;
    disableBackButton?: boolean;
    rightComponent?: ReactNode;
  };
  disableHeader?: boolean;
}
