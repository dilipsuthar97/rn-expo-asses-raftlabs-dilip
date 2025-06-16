import React, { FC, memo } from 'react';
import { View } from 'react-native';

interface SeparatorProps {
  width?: number;
  height?: number;
}

const Separator: FC<SeparatorProps> = ({ width, height }) => {
  return <View style={{ width, height }} />;
};
export default memo(Separator);
