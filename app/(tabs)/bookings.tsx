import { useBookings } from '@/api/hooks/useBookings';
import { BookingListing } from '@/components/BookingListing';
import { ThemedView } from '@/components/ThemedView';
import EmptyView from '@/components/ui/EmptyView';
import Separator from '@/components/ui/Separator';
import { useBottomTabOverflow } from '@/hooks/useBottomTabOverflow';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useBookingsStore } from '@/store/useBookingsStore';
import { Booking } from '@/types/Booking';
import { memo, useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import tw from 'twrnc';

const BookingsScreen = () => {
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');

  // api states
  const { data, isLoading, isSuccess, isPending, refetch } = useBookings();

  // store
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
    return <BookingListing booking={item} />;
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
        ListEmptyComponent={<EmptyView onPressRetry={refetch} />}
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
