import { useBookProperty } from '@/api/hooks/useBookings';
import { useProperty } from '@/api/hooks/useProperties';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import EmptyView from '@/components/ui/EmptyView';
import Loader from '@/components/ui/Loader';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useThemeColor } from '@/hooks/useThemeColor';
import dayjs from 'dayjs';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import tw from 'twrnc';

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

const PropertyDetails = () => {
  const { title, id } = useLocalSearchParams<{ id: string; title: string }>();
  const navigation = useNavigation();
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');

  // api state
  const { data, isLoading, isSuccess, isPending, isError, error } = useProperty(id);
  const { mutate: bookProperty, isPending: isPendingBookProperty } = useBookProperty();

  // local state
  const [coordinate, setCoordinate] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  // effects
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  useEffect(() => {
    if (isSuccess && data && !isPending) {
      setCoordinate(s => ({
        ...s,
        latitude: data?.location?.coordinates?.latitude,
        longitude: data?.location?.coordinates?.longitude,
      }));
    }
  }, [data, isSuccess, isPending]);

  const onPressBookProperty = useCallback(() => {
    bookProperty({
      propertyId: id,
      checkIn: dayjs().format('YYYY-MM-DD'),
      checkOut: dayjs().add(3, 'days').format('YYYY-MM-DD'),
      status: 'pending',
      userId: 'user1',
    });
  }, [id]);

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
    <ThemedView style={[tw`flex-1`, { paddingBottom: bottomTabHeight }]}>
      <MapView style={tw`w-full h-60`} initialRegion={coordinate} scrollEnabled={false}>
        <Marker title={title} draggable={false} coordinate={coordinate} />
      </MapView>
      <View style={tw`flex-1 p-4`}>
        <ThemedText type={'subtitle'}>{'Features'}</ThemedText>
        <View style={tw`p-2`}>
          {data?.features?.map((feature: string, index: number) => {
            return (
              <ThemedText key={`feature-${Math.random() * data?.features?.length}`} type={'default'}>
                {feature}
              </ThemedText>
            );
          })}
        </View>
      </View>
      <Button label="Book Now" style={tw`m-4`} onPress={onPressBookProperty} />
      <Loader visible={isPendingBookProperty} />
    </ThemedView>
  );
};
export default memo(PropertyDetails);
