import { useProperties } from '@/api/hooks/useProperties';
import { useBottomTabOverflow } from '@/hooks/useBottomTabOverflow';
import { useFilteredData } from '@/hooks/useFilteredData';
import { useThemeColor } from '@/hooks/useThemeColor';
import { usePropertiesStore } from '@/store/usePropertiesStore';
import { Property } from '@/types/Property';
import React, { FC, useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import tw from 'twrnc';
import { PropertyListing } from './PropertyListing';
import { ThemedView } from './ThemedView';
import EmptyView from './ui/EmptyView';
import Separator from './ui/Separator';

interface PropertyListProps {
  searchQuery: string;
}

export const PropertyList: FC<PropertyListProps> = ({ searchQuery }) => {
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');

  // api states
  const { data, isLoading, isSuccess, isPending, refetch } = useProperties();

  // store
  const setProperties = usePropertiesStore(state => state.setProperties);

  // hook to get filtered data based on search query
  const { filteredData, setData } = useFilteredData<Property>(searchQuery, [
    'title',
    'location.address',
    'location.city',
    'location.state',
  ]);

  // effects
  useEffect(() => {
    if (isSuccess && data && !isPending) {
      setData(data);
      setProperties(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, isPending]);

  /**
   *
   * @param param0
   * @returns
   */
  const _renderItem = ({ item }: ListRenderItemInfo<Property>) => {
    return <PropertyListing property={item} />;
  };

  /**
   *
   * @param item
   * @returns
   */
  const _keyExtractor = (item: Property) => item.id;

  /**
   *
   * @returns
   */
  const _itemSeparatorComponent = () => <Separator height={15} />;

  if (isLoading) {
    return (
      <ThemedView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size={'large'} color={tintColor} />
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={filteredData}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      ItemSeparatorComponent={_itemSeparatorComponent}
      contentContainerStyle={{
        paddingBottom: bottomTabHeight + 15,
        flexGrow: 1,
      }}
      ListEmptyComponent={<EmptyView onPressRetry={refetch} />}
    />
  );
};
