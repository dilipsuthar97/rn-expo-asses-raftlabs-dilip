import { useBookProperty } from '@/api/hooks/useBookings';
import { useProperty } from '@/api/hooks/useProperties';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import EmptyView from '@/components/ui/EmptyView';
import Loader from '@/components/ui/Loader';
import { Colors } from '@/constants/Colors';
import { useBottomTabOverflow } from '@/hooks/useBottomTabOverflow';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { CarouselRenderItem, ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import tw from 'twrnc';

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

const window = Dimensions.get('window');

const PropertyDetails = () => {
  const _refCarousel = React.useRef<ICarouselInstance>(null);

  const colorScheme = useColorScheme();
  const { title, id } = useLocalSearchParams<{ id: string; title: string }>();
  const navigation = useNavigation();
  const bottomTabHeight = useBottomTabOverflow();
  const tintColor = useThemeColor({}, 'tint');
  const progress = useSharedValue<number>(0);

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
  const address = useMemo(() => {
    if (data) {
      return `${data.location.address}, ${data.location.city}, ${data.location.state}`;
    }

    return '';
  }, [data]);

  // effects
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  useEffect(() => {
    if (isSuccess && data) {
      setCoordinate(s => ({
        ...s,
        latitude: data?.location?.coordinates?.latitude,
        longitude: data?.location?.coordinates?.longitude,
      }));
    }
  }, [data, isSuccess]);

  /**
   *
   */
  const onPressBookProperty = useCallback(() => {
    bookProperty({
      propertyId: id,
      checkIn: dayjs().format('YYYY-MM-DD'),
      checkOut: dayjs().add(3, 'days').format('YYYY-MM-DD'),
      status: 'pending',
      userId: 'user1',
    });
  }, [id]);

  /**
   *
   * @param index
   */
  const onPressPagination = (index: number) => {
    _refCarousel.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  /**
   *
   * @param param0
   * @returns
   */
  const _renderItem = ({ item }: CarouselRenderItem<string>) => {
    return <Image style={tw`w-full h-50 rounded-xl bg-gray-300`} source={{ uri: item }} />;
  };

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
      <ScrollView contentContainerStyle={tw`gap-4`} showsVerticalScrollIndicator={false}>
        <View>
          <Carousel
            ref={_refCarousel}
            autoPlayInterval={2000}
            data={data?.images}
            height={258}
            loop={true}
            pagingEnabled={true}
            snapEnabled={true}
            width={window.width}
            style={tw`w-full h-50`}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            onProgressChange={progress}
            renderItem={_renderItem}
          />
          <Pagination.Basic
            progress={progress}
            data={data?.images}
            dotStyle={tw`rounded-full bg-gray-300 h-2 w-2`}
            containerStyle={tw`gap-1`}
            onPress={onPressPagination}
          />
        </View>
        <View style={tw`px-4`}>
          <ThemedText
            type="subtitle"
            style={{ color: Colors[colorScheme ?? 'light'].tint }}>{`$ ${data?.price}`}</ThemedText>
          <ThemedText type="small" style={tw`text-gray-500`}>
            {address}
          </ThemedText>
        </View>
        <View style={tw`px-4`}>
          <ThemedText type={'defaultSemiBold'}>{'Location'}</ThemedText>
          <MapView style={tw`w-full h-40 mt-2 rounded-xl`} initialRegion={coordinate} scrollEnabled={false}>
            <Marker title={title} draggable={false} coordinate={coordinate} />
          </MapView>
        </View>
        <View style={tw`px-4`}>
          <ThemedText type={'defaultSemiBold'}>{'Features'}</ThemedText>
          <View>
            {data?.features?.map((feature: string, index: number) => {
              return (
                <ThemedText
                  key={`feature-${Math.random() * data?.features?.length}`}
                  style={tw`text-gray-500`}
                  type={'small'}>
                  {`- ${feature}`}
                </ThemedText>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Button label="Book Now" style={tw`m-4`} onPress={onPressBookProperty} />
      <Loader visible={isPendingBookProperty} />
    </ThemedView>
  );
};
export default memo(PropertyDetails);
