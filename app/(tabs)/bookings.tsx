import { useBookings } from '@/api/hooks/useBookings';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import EmptyView from '@/components/ui/EmptyView';
import Separator from '@/components/ui/Separator';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useBookingsStore } from '@/store/useBookingsStore';
import { usePropertiesStore } from '@/store/usePropertiesStore';
import { Booking } from '@/types/Booking';
import { getReadableDate } from '@/utils/dateUtil';
import { memo, useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import tw from 'twrnc';

const BookingsScreen = () => {
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');

  // api states
  const { data, isLoading, isSuccess, isPending } = useBookings();

  // store
  const properties = usePropertiesStore(state => state.properties);
  const setBookings = useBookingsStore(state => state.setBookings);

  // effects
  useEffect(() => {
    if (isSuccess && data && !isPending) {
      setBookings(data);
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

  /**
   *
   * @param param0
   * @returns
   */
  const _renderItem = ({ item }: ListRenderItemInfo<Booking>) => {
    const property = properties.find(p => p.id === item.propertyId);

    return (
      <ThemedView style={tw`border border-gray-300 mx-4 p-4 rounded-xl overflow-hidden`}>
        <ThemedText type="default">{`Booking ID: ${item.id}`}</ThemedText>
        <ThemedText type="default">{`Property Name: ${property?.title}`}</ThemedText>
        <ThemedText type="default">{`Check in time: ${getReadableDate(item.checkIn)}`}</ThemedText>
        <ThemedText type="default">{`Check out time: ${getReadableDate(item.checkOut)}`}</ThemedText>
      </ThemedView>
    );
  };

  /**
   *
   * @param item
   * @returns
   */
  const _keyExtractor = (item: Booking) => item?.id ?? String(Math.random());

  /**
   *
   * @returns
   */
  const _itemSeparatorComponent = () => <Separator height={15} />;

  return (
    <ThemedView style={tw`flex-1`}>
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        ListEmptyComponent={<EmptyView />}
        contentContainerStyle={[
          tw`flex-grow py-4`,
          {
            paddingBottom: bottomTabHeight + 15,
          },
        ]}
        ItemSeparatorComponent={_itemSeparatorComponent}
      />
    </ThemedView>
  );
};
export default memo(BookingsScreen);
