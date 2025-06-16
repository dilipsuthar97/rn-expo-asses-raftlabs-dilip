import React, { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';

interface EmptyViewProps {
  title?: string;
  text?: string;
  style?: StyleProp<ViewStyle>;
}
const EmptyView: React.FC<EmptyViewProps> = ({ title, text, style }) => {
  return (
    <View style={[tw`justify-center items-center w-full h-full`, style]}>
      <ThemedText type="defaultSemiBold">{title ?? `Ooops! It's Empty`}</ThemedText>
      <ThemedText type="default">{text ?? 'You have no items at this moment'}</ThemedText>
    </View>
  );
};
export default memo(EmptyView);
