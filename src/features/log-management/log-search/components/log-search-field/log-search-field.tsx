import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Checkbox, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useLogSearchStore } from '@/features/log-management';
import { useSearch } from '@/hooks';

import { LogSearchFieldItem } from './log-search-field-item';

export const LogSearchField = () => {
  const { t } = useTranslation();
  const { field, onSetField } = useLogSearchStore();

  const { debouncedSearch, onSearch } = useSearch({
    debounce: 500,
  });

  const onChecked = (checked: boolean, value: string) => {
    let newSelected: string[] = [];

    const { selected, list } = field;

    if (checked) {
      newSelected = [...selected, value];
    } else {
      newSelected = selected.filter(
        (item) => item !== value
      );
    }

    const isCheckedAll = list.every((item) =>
      newSelected.includes(item)
    );

    onSetField({
      ...field,
      selected: newSelected,
      checkedAll: isCheckedAll,
    });
  };

  const onCheckedAll = (checked: boolean) => {
    const { selected, list } = field;

    if (checked) {
      const value = [...new Set([...selected, ...list])];
      onSetField({
        ...field,
        checkedAll: checked,
        selected: value,
      });
    } else {
      const value = selected.filter(
        (item) => !list.includes(item)
      );

      onSetField({
        ...field,
        checkedAll: checked,
        selected: value,
      });
    }
  };

  useEffect(() => {
    const onSearch = () => {
      let result: string[] = [];

      if (debouncedSearch) {
        result = field.list.filter((item) =>
          item
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        );
      } else {
        result = field.default;
      }

      const isCheckedAll = result.every((item) =>
        field.selected.includes(item)
      );

      onSetField({
        ...field,
        list: result,
        search: debouncedSearch ?? '',
        checkedAll: isCheckedAll,
      });
    };
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Flex
      direction="column"
      className={css`
        padding: 24px 20px;
        width: 100%;
      `}
    >
      <Typography.Text strong>
        <IntlMessage id="siem.logSearch.fields" />
      </Typography.Text>

      <Input
        className="mt-3"
        placeholder={t('logManagement.search') as string}
        onChange={onSearch}
      />

      <Checkbox
        name="all"
        className="mt-4"
        checked={field.checkedAll}
        onChange={(e) => onCheckedAll(e.target.checked)}
      >
        Check all
      </Checkbox>

      <Flex
        direction="column"
        gap="6px"
        className=" mt-3"
      >
        {field.list.map((item) => {
          if (item === 'event') return null;
          return (
            <LogSearchFieldItem
              label={item}
              key={item}
              onChecked={onChecked}
              selected={field.selected}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};
