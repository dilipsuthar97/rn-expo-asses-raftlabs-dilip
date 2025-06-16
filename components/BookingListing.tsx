import { usePropertiesStore } from '@/store/usePropertiesStore';
import { Booking } from '@/types/Booking';
import { getReadableDate } from '@/utils/dateUtil';
import { Image } from 'expo-image';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface BookingListingProps {
  booking: Booking;
}

export const BookingListing: FC<BookingListingProps> = ({ booking }) => {
  const properties = usePropertiesStore(state => state.properties);
  const property = properties.find(p => p.id === booking.propertyId);

  const address = useMemo(() => {
    if (property) {
      return `${property.location.address}, ${property.location.city}, ${property.location.state}`;
    }

    return '';
  }, [property]);

  if (!property) {
    return <></>;
  }

  return (
    <ThemedView style={tw`border border-gray-300 mx-4 rounded-xl overflow-hidden`}>
      <Image style={tw`h-50 w-full`} source={property.images[0]} />
      <View style={tw`p-4`}>
        <ThemedText type="subtitle">{property.title}</ThemedText>
        <ThemedText type="defaultSemiBold" style={tw`text-gray-500 font-normal`}>
          {address}
        </ThemedText>
        <ThemedText type="small" style={tw`mt-4`}>
          {`Check in: ${getReadableDate(booking.checkIn)}`}
        </ThemedText>
        <ThemedText type="small">{`Check out: ${getReadableDate(booking.checkOut)}`}</ThemedText>
        <ThemedText type="subtitle" style={tw`text-green-500 font-medium mt-4`}>
          {`Status: ${booking.status}`}
        </ThemedText>
      </View>
    </ThemedView>
  );
};
