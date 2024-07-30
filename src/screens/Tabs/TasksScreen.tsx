import {FlashList} from '@shopify/flash-list';
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
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
import moment from 'moment';
import {scale} from '@/src/constants/scaler.constants';
import useForm from '@/src/hooks/useForm.hook';
import {z} from 'zod';
import {fetchJson, patchJson, postJson} from '@/src/utils/fetch.utils';
import {BASE_URL} from '@/src/constants/network.constants';
import {
  CreateToDoResponse,
  EditTaskResponse,
  TodoResponse,
} from '@/src/types/todo';
import Task from '@/src/components/reusables/Task';
import {useToast} from '@/src/components/toast-manager';
import ThemedCheckBox from '@/src/components/reusables/ThemedCheckBox';

const TasksScreen = () => {
  const {} = useMainStore();
  const theme = useTheme();
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [selectedFilterDate, setSelectedFilterDate] = useState('');
  const [selectedTask, setSelectedTask] = useState<
    TodoResponse['data'][0] | null
  >(null);
  const [editMode, setEditModa] = useState(false);
  const {showToast} = useToast();
  const addTaskMutation = useMutation({
    mutationFn: async () => {
      const response = await postJson<CreateToDoResponse>(
        `${BASE_URL}/todos/`,
        {
          title: formState.title,
          description: formState.description,
          completed: formState.completed,
        },
      );
      if (response.success) {
        showToast({
          type: 'success',
          title: 'Task added successfully',
        });
        setOpenAddEditModal(false);
        resetForm();
        refetch();
      } else {
        showToast({
          type: 'error',
          title: 'Failed to add task',
        });
        handleErrorResponse(response);
      }
    },
  });
  const updateTaskMutation = useMutation({
    mutationFn: async () => {
      const response = await patchJson<CreateToDoResponse>(
        `${BASE_URL}/todos/${selectedTask?.id}`,
        {
          title: formState.title,
          description: formState.description,
          completed: formState.completed,
        },
      );
      if (response.success) {
        showToast({
          type: 'success',
          title: 'Task Updated successfully',
        });
        setOpenAddEditModal(false);
        resetForm();
        refetch();
      } else {
        showToast({
          type: 'error',
          title: 'Failed to add task',
        });
        handleErrorResponse(response);
      }
    },
  });

  const {validateForm, formState, setFormValue, resetForm} = useForm([
    {
      name: 'title',
      value: '',
      schema: z.string().min(0),
    },
    {
      name: 'description',
      value: '',
      schema: z.string().min(0),
    },
    {
      name: 'completed',
      value: false,
      schema: z.boolean(),
    },
  ]);

  const fetchTodos = async ({pageParam = 1}) => {
    try {
      const response = await fetchJson<TodoResponse>(
        `${BASE_URL}/todos?page=${pageParam}&limit=7`,
      );

      if (!response || !Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }

      return response;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
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

  const fourDateArrayFromNow = [
    moment().add(1, 'days').format('ddd \nD'),
    moment().add(2, 'days').format('ddd \nD'),
    moment().add(3, 'days').format('ddd \nD'),
    moment().add(4, 'days').format('ddd \nD'),
  ];
  return (
    <Page header={{title: 'Restaurant'}} gap={10}>
      <Box pa={scale(20)} gap={scale(20)}>
        <Box direction="row" align="center" justify="space-between">
          <ThemedText weight="bold" size={'xxl'}>
            {moment(Date.now()).format('MMM, YYYY').toUpperCase()}
          </ThemedText>
          <ThemedButton
            label={'+ Add Task'}
            onPress={() => {
              setOpenAddEditModal(true);
              setEditModa(false);
              resetForm();
            }}
            size="xxs"
          />
        </Box>
        <Box direction="row" justify="space-between" gap={20}>
          {fourDateArrayFromNow.map((date, index) => (
            <ThemedButton
              type={selectedFilterDate == date ? 'primary' : 'primary-outlined'}
              height={scale(70)}
              key={index}
              label={date}
              onPress={() => setSelectedFilterDate(date)}
              size="xxs"
              width={scale(60)}
              radius={20}
            />
          ))}
        </Box>
        {todos.length == 0 && (
          <ThemedText size={'xxl'} weight="bold" color={theme.primary}>
            You have no Tasks created.
          </ThemedText>
        )}
      </Box>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={todos}
        renderItem={({item}) => (
          <Task
            {...item}
            onPress={() => {
              setEditModa(true);
              setOpenAddEditModal(true);
              setSelectedTask(item);
              setFormValue('title', item.title);
              setFormValue('description', item.description);
              setFormValue('completed', item.completed);
            }}
          />
        )}
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

      <ThemedModal
        position="center"
        visible={openAddEditModal}
        containerProps={{
          pa: 20,
          gap: 20,
        }}
        close={() => setOpenAddEditModal(false)}>
        <ThemedTextInput
          placeholder="Title"
          value={formState.title}
          onChangeText={text => setFormValue('title', text)}
        />
        <ThemedTextInput
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={formState.description}
          onChangeText={text => setFormValue('description', text)}
        />
        <ThemedCheckBox
          checked={formState.completed}
          label="Completed?"
          onPress={() => setFormValue('completed', !formState.completed)}
        />
        <ThemedButton
          label={editMode ? 'Edit Task' : 'Create Task'}
          loading={addTaskMutation.isPending || updateTaskMutation.isPending}
          onPress={() => {
            if (editMode) {
              validateForm(() => updateTaskMutation.mutate());
            } else {
              validateForm(() => addTaskMutation.mutate());
            }
          }}
        />
      </ThemedModal>
    </Page>
  );
};

export default TasksScreen;
