import {DimensionValue, FlexStyle, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BoxProps} from './Box';
import FastImage, {ResizeMode, Source} from 'react-native-fast-image';

type Props = {
  source: Source;
  resizeMode?: ResizeMode;
  height: DimensionValue;
  width: DimensionValue;

  p?: DimensionValue;
  px?: DimensionValue;
  py?: DimensionValue;
  pa?: DimensionValue;
  mx?: DimensionValue;
  my?: DimensionValue;
  ma?: DimensionValue;
  pt?: DimensionValue;
  pb?: DimensionValue;
  pl?: DimensionValue;
  pr?: DimensionValue;
  mt?: DimensionValue;
  mb?: DimensionValue;
  ml?: DimensionValue;
  mr?: DimensionValue;
  radius?: number | undefined;
  alignSelf?: FlexStyle['alignSelf'];
  borderColor?: string;
  borderWidth?: number;
};

const ImageWrapper = ({
  source,
  height,
  width,
  borderColor = 'transparent',
  borderWidth = 0,

  resizeMode = 'contain',
  p = 0,
  radius = 0,
  px = 0,
  py = 0,
  pa = 0,
  mx = 0,
  my = 0,
  ma = 0,
  pt = 0,
  pb = 0,
  pl = 0,
  pr = 0,
  mt = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  alignSelf = 'center',
  ...viewProps
}: Props) => {
  return (
    <FastImage
      {...viewProps}
      source={source}
      style={{
        borderWidth,
        borderColor,
        width: width,
        height: height,
        padding: p,
        paddingHorizontal: px,
        paddingVertical: py,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
        margin: ma,
        marginHorizontal: mx,
        marginVertical: my,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginBottom: mb,
        borderRadius: radius,
      }}
      resizeMode={resizeMode}
    />
  );
};

export default ImageWrapper;
