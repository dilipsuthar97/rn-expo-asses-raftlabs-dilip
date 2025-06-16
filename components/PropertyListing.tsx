import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Property } from '@/types/Property';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { FC, useMemo } from 'react';
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
  const colorScheme = useColorScheme();

  const address = useMemo(() => {
    return `${property.location.address}, ${property.location.city}, ${property.location.state}`;
  }, [property]);

  return (
    <ThemedView style={tw`border border-gray-300 mx-4 rounded-xl overflow-hidden`}>
      <Image style={tw`h-50 w-full`} source={property.images[0]} />
      <View style={tw`p-4`}>
        <ThemedText type="title">{property.title}</ThemedText>
        <ThemedText type="defaultSemiBold" style={tw`text-gray-500`}>
          {address}
        </ThemedText>
        <Separator height={15} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: Colors[colorScheme ?? 'light'].tint }}>{`$ ${property.price}`}</ThemedText>
            <ThemedText
              type="default"
              style={tw`text-gray-500`}>{`${property.features.length - 1}+ Features`}</ThemedText>
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
