import React, { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import { Button } from './Button';

interface EmptyViewProps {
  title?: string;
  text?: string;
  style?: StyleProp<ViewStyle>;
  onPressRetry?(): void;
}
const EmptyView: React.FC<EmptyViewProps> = ({ title, text, style, onPressRetry }) => {
  return (
    <View style={[tw`justify-center items-center w-full h-full`, style]}>
      <ThemedText type="defaultSemiBold">{title ?? `Ooops! It's Empty`}</ThemedText>
      <ThemedText type="default">{text ?? 'You have no items at this moment'}</ThemedText>
      {onPressRetry && <Button label="Retry" style={tw`h-8 rounded-xl mt-4`} onPress={onPressRetry} />}
    </View>
  );
};
export default memo(EmptyView);
