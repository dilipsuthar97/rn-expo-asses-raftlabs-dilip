import { PropertyList } from '@/components/PropertyList';
import { Searchbar } from '@/components/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { memo, useState } from 'react';
import tw from 'twrnc';

const HomeScren = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemedView style={tw`flex-1`}>
      <Searchbar searchQuery={searchQuery} onSearchQuery={setSearchQuery} />
      <PropertyList searchQuery={searchQuery} />
    </ThemedView>
  );
};
export default memo(HomeScren);
