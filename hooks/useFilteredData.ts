import { useEffect, useMemo, useState } from 'react';

// Helper function to get nested value from object by dot notation
const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

/**
 * Returns a filtered dataset and a function to update the main data source.
 *
 * @param {String} query - Search query.
 * @param {Array} keysToSearch - Dot notation keys to search for value.
 */
export const useFilteredData = <T>(query: string, keysToSearch: string[]) => {
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    const result = data.filter(item =>
      keysToSearch.some(key => {
        const value = getValueByPath(item, key);
        return (value ?? '').toString().toLowerCase().includes(lowerQuery);
      }),
    );

    setFilteredData(result);
    setIsDataReady(true);
  }, [query, data]);

  return useMemo(
    () => ({
      filteredData,
      setData,
      data,
      isDataReady,
    }),
    [filteredData, data, isDataReady],
  );
};
