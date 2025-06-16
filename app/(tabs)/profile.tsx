import { useProfiles } from '@/api/hooks/useProfiles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyView from '@/components/ui/EmptyView';
import { useBottomTabOverflow } from '@/hooks/useBottomTabOverflow';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useProfileStore } from '@/store/useProfileStore';
import { Image } from 'expo-image';
import { memo, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

const ProfileScreen = () => {
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');

  // api states
  const { data: user, isLoading, isError, error, isSuccess, isPending, refetch } = useProfiles();

  // store
  const setProfile = useProfileStore(state => state.setProfile);

  // effects
  useEffect(() => {
    if (isSuccess && user && !isPending) {
      setProfile(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isSuccess, isPending]);

  if (isLoading) {
    return (
      <ThemedView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size={'large'} color={tintColor} />
      </ThemedView>
    );
  }

  if (isError && error) {
    return <EmptyView onPressRetry={refetch} />;
  }

  return (
    <ThemedView style={[tw`flex-1 p-4 `, { paddingBottom: bottomTabHeight }]}>
      <View style={tw`flex-row items-center gap-4`}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/34.jpg' }} style={tw`h-20 w-20 rounded-full`} />
        <View>
          <ThemedText>{user?.name}</ThemedText>
          <ThemedText>{user?.email}</ThemedText>
        </View>
      </View>
      <ThemedText type="defaultSemiBold" style={tw`mt-4`}>{`Account Details`}</ThemedText>
      <View style={tw`bg-gray-100 p-4 rounded-xl mt-2`}>
        <ThemedText>{`Total bookings: ${user?.bookings?.length ?? 0}`}</ThemedText>
      </View>
    </ThemedView>
  );
};
export default memo(ProfileScreen);
