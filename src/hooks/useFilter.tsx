import {
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Empty,
  Input,
  Row,
} from 'antd';
import { ColumnType } from 'antd/es/table';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { InputSearch } from '@components/input-search';
import { Scrollbars } from '@components/scrollbars';

export const useFilter = <T,>() => {
  const [filters, setFilters] = useSetState<
    Record<string, unknown>
  >({});

  const router = useRouter();

  const [search, setSearch] = useState<string>('');

  const onSearch = (value: string) => setSearch(value);

  const filterDropdown = (
    key: string,
    type?: 'filter' | 'search' | undefined
  ) => {
    const SearchComponent = ({
      prefixCls,
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => {
      const onSearch = () => {
        setFilters({ [key]: selectedKeys });
        confirm();
      };

      const onChange = (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        if (e.target.value === '') {
          setFilters({ [key]: undefined });
          clearFilters?.();
          confirm();
          return;
        }
        setSelectedKeys([e.target.value]);
      };
      const onReset = () => {
        setSelectedKeys([]);
      };

      return (
        <div
          style={{
            padding: 12,
            width: 230,
          }}
          className={prefixCls}
        >
          <Input
            size="small"
            // enterButton
            value={selectedKeys?.[0]?.toString() ?? ''}
            // onSearch={onSearch}
            onChange={onChange}
            className="mb-2"
          />
          <Flex justify={'space-between'}>
            <Button
              type="primary"
              className="w-50 mr-1"
              onClick={onSearch}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
            <Button
              onClick={onReset}
              className="w-50 ml-1"
            >
              Reset
            </Button>
          </Flex>
        </div>
      );
    };

    if (type === 'search') {
      SearchComponent.displayName = `SearchDropdown(${key})`;
      return SearchComponent;
    }

    const FilterComponent = ({
      filters,
      prefixCls,
      selectedKeys,
      setSelectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => {
      const onFilter = () => {
        setFilters({ [key]: selectedKeys });
        confirm();
      };

      const onClearFilter = () => {
        setFilters({ [key]: undefined });
        clearFilters?.();
        confirm();
      };

      const searchedOptions = filters?.filter((filter) =>
        filter?.text
          ?.toString()
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

      return (
        <div
          style={{
            padding: 12,
            width: 230,
          }}
          className={prefixCls}
        >
          <InputSearch
            width="100%"
            size="small"
            value={search}
            className="mb-2"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Scrollbars
            style={{
              height: 125,
            }}
          >
            {searchedOptions?.length === 0 ? (
              <Empty />
            ) : (
              <Checkbox.Group
                style={{
                  width: '100%',
                  overflowY: 'auto',
                }}
                value={selectedKeys as string[]}
                onChange={(value) => {
                  setSelectedKeys(value as string[]);
                }}
              >
                <Row>
                  {searchedOptions?.map((filter) => (
                    <Col
                      key={filter.value as string}
                      span={24}
                    >
                      <Checkbox value={filter.value}>
                        {filter.text}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            )}
          </Scrollbars>
          <Divider className="mt-0 mb-1" />
          <Flex align="center" justify="space-between">
            <Button type="link" onClick={onClearFilter}>
              ล้างการกรอง
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={onFilter}
            >
              ตกลง
            </Button>
          </Flex>
        </div>
      );
    };

    FilterComponent.displayName = `FilterDropdown(${key})`;

    return FilterComponent;
  };

  const convertFilter = (
    filters: Record<string, unknown>
  ) => {
    const filterParams: Record<string, unknown> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        filterParams[key] = value.join(',');
        return;
      }
      filterParams[key] = value;
    });
    return filterParams;
  };

  const onFilterDropdownOpenChange = (open: boolean) => {
    if (!open) {
      setSearch('');
    }
  };

  const columnFilter = (type?: 'filter' | 'search') => {
    const filterIcon = (filtered: boolean) => {
      return type === 'search' ? (
        <SearchOutlined
          style={{
            color: filtered ? '#3e79f7' : undefined,
          }}
        />
      ) : (
        <FilterOutlined
          style={{
            color: filtered ? '#3e79f7' : undefined,
          }}
        />
      );
    };

    return {
      onFilterDropdownOpenChange,
      filterIcon,
    } as ColumnType<T>;
  };

  useEffect(() => {
    setFilters({
      ...router.query,
    });
  }, [router.query, setFilters]);

  return {
    filters: convertFilter(filters),
    filterDropdown,
    columnFilter,
  };
};
