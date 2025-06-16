import { useProfiles } from '@/api/hooks/useProfiles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyView from '@/components/ui/EmptyView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useProfileStore } from '@/store/useProfileStore';
import { memo, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import tw from 'twrnc';

const ProfileScreen = () => {
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');

  // api states
  const { data, isLoading, isError, error, isSuccess, isPending } = useProfiles();

  // store
  const setProfile = useProfileStore(state => state.setProfile);

  // effects
  useEffect(() => {
    if (isSuccess && data && !isPending) {
      setProfile(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, isPending]);

  if (isLoading) {
    return (
      <ThemedView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size={'large'} color={tintColor} />
      </ThemedView>
    );
  }

  if (isError && error) {
    return <EmptyView />;
  }

  return (
    <ThemedView style={[tw`flex-1 p-4`, { paddingBottom: bottomTabHeight }]}>
      <View style={tw`flex-row`}>
        <ThemedText>{'Email: '}</ThemedText>
        <ThemedText style={{ fontWeight: 'bold' }}>{data?.email}</ThemedText>
      </View>
      <View style={tw`flex-row`}>
        <ThemedText>{'Name: '}</ThemedText>
        <ThemedText style={{ fontWeight: 'bold' }}>{data?.name}</ThemedText>
      </View>
      <View style={tw`flex-row`}>
        <ThemedText>{'Total bookings: '}</ThemedText>
        <ThemedText style={{ fontWeight: 'bold' }}>{data?.bookings?.length ?? 0}</ThemedText>
      </View>
    </ThemedView>
  );
};
export default memo(ProfileScreen);
