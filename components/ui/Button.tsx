import { useThemeColor } from '@/hooks/useThemeColor';
import React, { FC } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';

interface ButtonProps {
  label: string;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
}

export const Button: FC<ButtonProps> = ({ label, onPress, style }) => {
  const buttonColor = useThemeColor({}, 'tint');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tw`h-10 justify-center rounded-lg px-4 items-center min-w-20`, { backgroundColor: buttonColor }, style]}
      activeOpacity={0.7}>
      <ThemedText type="default" lightColor={'#fff'} darkColor={'#fff'}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};
