import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { memo } from 'react';

const HomeLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].tint,
        headerTitleStyle: {
          color: Colors[colorScheme ?? 'light'].text,
        },
      }}>
      <Stack.Screen name="index" options={{ headerTitle: 'Property Labs' }} />
      <Stack.Screen name="details" />
    </Stack>
  );
};
export default memo(HomeLayout);
