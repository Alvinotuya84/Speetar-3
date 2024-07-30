import {
  View,
  Text,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from '@/src/components/reusables/Box';
import LinearGradientBox from '@/src/components/reusables/LinearGradientBox';
import {scale} from '@/src/constants/scaler.constants';
import {useTheme} from '@/src/hooks/useTheme.hook';
import ThemedText from '@/src/components/reusables/ThemedText';
import {ThemedSearchInput} from '@/src/components/reusables/ThemedTextInput';
import ImageWrapper from '@/src/components/reusables/ImageWrapper';
import ImageSlider from '@/src/components/reusables/ImagesSlider';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
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
import {calculateDistance, formatDate} from '@/src/utils/functions';
import {UserProfileResponse} from '@/src/types/auth';
import {BASE_URL} from '@/src/constants/network.constants';
import ThemedAvatar from '@/src/components/reusables/ThemedAvatar';
import {animateLayout} from '@/src/utils/animation.utils';
import {Todo, TodoResponse} from '@/src/types/todo';
import moment from 'moment';
import Page from '@/src/components/reusables/Page';
import ThemedCard from '@/src/components/reusables/ThemedCard';
import Task from '@/src/components/reusables/Task';

type Props = {};

const DashBoardScreen = (props: Props) => {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useSafeNavigation();
  const {showToast} = useToast();
  const [taskCategory, setTaskCategory] = useState('Notes');
  const {theme: userTheme, setTheme} = useMainStore();

  const fetchTodos = async ({pageParam = 1}) => {
    try {
      const response = await fetchJson<TodoResponse>(
        `${BASE_URL}/todos?page=${pageParam}&limit=4`,
      );

      // Check if the response is valid
      if (!response || !Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }

      return response;
    } catch (error) {
      // Handle errors (e.g., log them or rethrow)
      console.error('Error fetching todos:', error);
      throw error;
    }
  };

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

  const {
    data: recentTasks,
    isLoading: recentTasksLoading,
    error: recentTasksError,
  } = useQuery({
    queryKey: ['recent-tasks'],
    queryFn: async () => {
      const response = await fetchJson<TodoResponse>(
        `${BASE_URL}/todos/?page=1&limit=3`,
      );
      return response;
    },
  });

  const {data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status} =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ['tasks'],
      queryFn: fetchTodos,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.pagination.currentPage >= lastPage.pagination.totalPages) {
          return undefined;
        }
        return lastPage.pagination.currentPage + 1;
      },
    });
  const todos = data?.pages.flatMap(page => page.data) || [];

  const taskCategories = ['Health', 'Notes', 'Learning'];
  return (
    <Box flex={1} px={scale(20)} color={theme.background}>
      <Box width={'100%'} py={10} align="flex-end">
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
      <Box gap={scale(5)}>
        <ThemedText size={'xl'}>
          Hello{' '}
          <ThemedText size={'xxxl'} weight="bold">
            {userProfile?.data.username}!
          </ThemedText>
        </ThemedText>
        <ThemedText color={theme.primaryGray}>Have a nice day!</ThemedText>
      </Box>
      {taskCategories && (
        <Box direction="row" py={20} gap={10} wrap="wrap">
          {taskCategories.map(option => (
            <ThemedButton
              radius={20}
              key={option}
              label={option}
              onPress={() => {
                animateLayout();

                setTaskCategory(option);
              }}
              type={taskCategory === option ? 'primary' : 'surface'}
              size="xs"
              width={'30%'}
              height={40}
            />
          ))}
        </Box>
      )}

      {/* <FlatList
        data={recentTasks?.data}
        renderItem={({item}) => <RecentTask {...item} />}
        horizontal
        contentContainerStyle={{
          height: 20, // Set a fixed height
        }}
      /> */}

      <Box direction="row">
        {recentTasks?.data.map(task => (
          <RecentTask {...task} key={task.id} />
        ))}
      </Box>

      <ThemedText weight="bold">Progress</ThemedText>

      {status == 'pending' ? (
        <ThemedActivityIndicator size={'large'} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos}
          renderItem={({item}) => <Task {...item} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5} // Adjust as needed
          ListFooterComponent={() =>
            isFetchingNextPage ? <ThemedActivityIndicator size="large" /> : null
          }
        />
      )}
      {/* <ImageWrapper
            source={require('@/assets/home/amega-home.png')}
            height={scale(100)}
            width={scale(100)}
          /> */}

      {/* <Box flex={1} color={theme.background} gap={10} pa={10}></Box> */}
    </Box>
  );
};

export default DashBoardScreen;

const RecentTask = (props: Todo) => {
  const theme = useTheme();
  return (
    <Box
      pa={20}
      height={200}
      mx={scale(10)}
      width={scale(150)}
      justify="space-between"
      radius={scale(10)}
      color={theme.primary}>
      <Box direction="row" justify="flex-end">
        <ThemedText size="xxs" color={theme.background}>
          {moment(props.createdAt).fromNow()}
        </ThemedText>
      </Box>

      <ThemedText size="md" color={theme.background}>
        {props.title}
      </ThemedText>

      <ThemedIcon
        source="AntDesign"
        color={props.completed ? theme.success : theme.warning}
        name={props.completed ? 'checkcircle' : 'exclamationcircleo'}
      />
    </Box>
  );
};
