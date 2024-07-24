import {useTheme} from '@/src/hooks/useTheme.hook';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export default function ThemedIcon({
  name,
  color,
  size = 'md',
  source = 'Feather',
}: ThemedIconProps) {
  const iconSize = () => {
    if (typeof size === 'string') {
      return iconSizes.find(options => options.size === size)!.value;
    } else {
      return size;
    }
  };

  const theme = useTheme();

  return (
    <>
      {source === 'Feather' && (
        <Feather
          name={name as typeof Feather.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'AntDesign' && (
        <AntDesign
          name={name as typeof AntDesign.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'Entypo' && (
        <Entypo
          name={name as typeof Entypo.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'EvilIcons' && (
        <EvilIcons
          name={name as typeof EvilIcons.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'FontAwesome' && (
        <FontAwesome
          name={name as typeof FontAwesome.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'FontAwesome5' && (
        <FontAwesome5
          name={name as typeof FontAwesome.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'FontAwesome6' && (
        <FontAwesome6
          name={name as typeof FontAwesome.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'Fontisto' && (
        <Fontisto
          name={name as typeof Fontisto.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'Foundation' && (
        <Foundation
          name={name as typeof Foundation.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'Ionicons' && (
        <Ionicons
          name={name as typeof Ionicons.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          name={name as typeof MaterialCommunityIcons.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'MaterialIcons' && (
        <MaterialIcons
          name={name as typeof MaterialIcons.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'Octicons' && (
        <Octicons
          name={name as typeof Octicons.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'SimpleLineIcons' && (
        <SimpleLineIcons
          name={name as typeof SimpleLineIcons.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
      {source === 'Zocial' && (
        <Zocial
          name={name as typeof Zocial.name}
          size={iconSize()}
          color={color ? color : theme.text}
        />
      )}
    </>
  );
}

export interface ThemedIconProps {
  source?:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';
  name:
    | typeof Feather.name
    | typeof AntDesign.name
    | typeof Entypo.name
    | typeof EvilIcons.name
    | typeof FontAwesome.name
    | typeof Fontisto.name
    | typeof Foundation.name
    | typeof Ionicons.name
    | typeof MaterialCommunityIcons.name
    | typeof MaterialCommunityIcons.name
    | typeof MaterialIcons.name
    | typeof Octicons.name
    | typeof SimpleLineIcons.name
    | typeof Zocial.name;
  // | keyof typeof FontAwesome5.name;
  size?: number | TextSize;
  color?: string;
}

const iconSizes = [
  {size: 'xxxs', value: 10},
  {size: 'xxs', value: 12},
  {size: 'xs', value: 14},
  {size: 'sm', value: 16},
  {size: 'md', value: 18},
  {size: 'lg', value: 20},
  {size: 'xl', value: 22},
  {size: 'xxl', value: 24},
  {size: 'xxxl', value: 26},
] as const;

type TextSize = (typeof iconSizes)[number]['size'];
