import {View, Text} from 'react-native';
import React from 'react';
import ThemedCard from './ThemedCard';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {Todo} from '@/src/types/todo';
import {scale} from '@/src/constants/scaler.constants';
import Box from './Box';
import ThemedIcon from './ThemedIcon';
import ThemedText from './ThemedText';
import moment from 'moment';
import ThemedButton from './ThemedButton';

type Props = {};

const Task = (props: Todo) => {
  const theme = useTheme();
  return (
    <ThemedCard
      pa={scale(10)}
      align="center"
      height={scale(67)}
      my={scale(10)}
      direction="row"
      justify="space-between"
      radius={scale(5)}>
      <Box
        height={'100%'}
        align="center"
        radius={scale(5)}
        justify="center"
        width={scale(30)}
        color={theme.primary}>
        <ThemedIcon name="book" source="Entypo" color={theme.background} />
      </Box>
      <Box>
        <ThemedText size="md" weight="bold">
          {props.title}
        </ThemedText>
        <ThemedText size="xxs" color={theme.text}>
          {moment(props.createdAt).fromNow()}
        </ThemedText>
      </Box>
      <ThemedButton
        size="xxs"
        disabled={props.completed}
        onPress={() => {
          props.onPress?.();
        }}
        icon={{
          name: props.completed ? 'check' : 'dots-three-vertical',
          size: 'lg',
          color: props.completed ? theme.success : theme.warning,
          source: 'Entypo',
        }}
        type="text"
      />
    </ThemedCard>
  );
};

export default Task;
