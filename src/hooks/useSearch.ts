import React, { useState } from 'react';
import { useDebounce } from 'react-use';

export type UseSearch = {
  initialSearch?: string;
  debounce?: number;
};

export const useSearch = ({
  initialSearch = '',
  debounce = 1000,
}: UseSearch = {}) => {
  const [search, setSearch] =
    useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] =
    useState<string>('');

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (typeof e === 'string') {
      setSearch(e);
      return;
    }

    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    debounce,
    [search]
  );

  return {
    search,
    debouncedSearch,
    onSearch,
  };
};
