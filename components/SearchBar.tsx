import { useThemeColor } from '@/hooks/useThemeColor';
import React, { FC } from 'react';
import { Platform, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import tw from 'twrnc';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface SearchBarProps {
  searchQuery: string;
  onSearchQuery: (query: string) => void;
}

export const Searchbar: FC<SearchBarProps> = ({ searchQuery, onSearchQuery }) => {
  const iconColor = useThemeColor({}, 'icon');
  const showClearButton = searchQuery?.length > 0;

  return (
    <ThemedView style={tw`h-18 px-4 py-4`}>
      <View
        style={tw`flex-1 flex-row items-center pl-4 pr-1 rounded-full border border-gray-300 gap-3 overflow-hidden`}>
        <IconSymbol size={24} name="magnifyingglass" color={iconColor} />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchQuery}
          style={tw`flex-1 pt-0 pb-0 pl-0 pr-0`}
          placeholder="Type anything about property..."
          placeholderTextColor={'lightgray'}
        />
        {showClearButton && (
          <AnimatedTouchableOpacity
            style={tw`p-2`}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            entering={SlideInRight.duration(600)}
            exiting={SlideOutRight.duration(600)}
            onPress={() => onSearchQuery('')}>
            <IconSymbol size={Platform.OS === 'ios' ? 14 : 18} name="multiply" color={iconColor} />
          </AnimatedTouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
};
