import { Property } from '@/types/Property';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Button } from './ui/Button';
import Separator from './ui/Separator';

interface PropertyListingProps {
  property: Property;
}

export const PropertyListing: FC<PropertyListingProps> = ({ property }) => {
  return (
    <ThemedView style={tw`border border-gray-300 mx-4 rounded-xl overflow-hidden`}>
      <Image style={tw`h-50 w-full`} source={property.images[0]} />
      <View style={tw`p-4`}>
        <ThemedText type="title">{property.title}</ThemedText>
        <ThemedText type="defaultSemiBold">{`${property.location.address}, ${property.location.city}, ${property.location.state}`}</ThemedText>
        <Separator height={15} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <ThemedText type="default">{`$ ${property.price}`}</ThemedText>
            <ThemedText type="default">{`${property.features.length - 1}+ Features`}</ThemedText>
          </View>
          <Link
            href={{
              pathname: '/details',
              params: {
                id: property.id,
                title: property.title,
              },
            }}
            asChild>
            <Button label="Book" />
          </Link>
        </View>
      </View>
    </ThemedView>
  );
};
