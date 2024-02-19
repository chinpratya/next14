import { Select } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useSearch } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListDomain } from '../../../domain';

export type DomainSelectProps = {
  isMobile: boolean;
};

export const DomainSelect = ({
  isMobile,
}: DomainSelectProps) => {
  const router = useRouter();

  const domainId = router.query.domainId as string;

  const { search, debouncedSearch, onSearch } = useSearch(
    {
      initialSearch: domainId,
    }
  );

  const { data, isLoading, isError } = useListDomain({
    search: debouncedSearch,
  });

  if (isMobile) {
    return null;
  }

  const options = data?.data?.map((domain) => ({
    label: domain.name,
    value: domain.domainID,
  }));

  const onSelectDomain = (domainId: string) => {
    router.push({
      query: {
        domainId,
      },
    });
  };

  const dropdownRender = (
    menu: React.ReactElement
  ): React.ReactElement => {
    if (isError) {
      return <FallbackError borderLess />;
    }

    return menu;
  };

  return (
    <div className="d-flex align-items-center">
      <Select
        style={{
          width: 300,
        }}
        value={isLoading ? 'Loading...' : domainId}
        showSearch
        searchValue={search}
        loading={isLoading}
        placeholder="Select a domain"
        onSearch={onSearch}
        options={options}
        onSelect={onSelectDomain}
        dropdownRender={dropdownRender}
      />
    </div>
  );
};
