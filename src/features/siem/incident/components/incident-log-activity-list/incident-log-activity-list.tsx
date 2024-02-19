import { css } from '@emotion/css';
import { useSetState } from '@mantine/hooks';
import { Card, Empty } from 'antd';
import { useCallback, useEffect } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useSearch } from '@/hooks';
import { InnerAppLayout } from '@/layouts';
import { getKeysOfObject } from '@/utils';

import {
  IncidentInfoResponse,
  IncidentLogField,
} from '../../types';

import { IncidentLogActivityField } from './incident-log-activity-field';
import { IncidentLogActivityTable } from './incident-log-activity-table';

type IncidentLogActivityListProps = {
  incident: IncidentInfoResponse;
  loading?: boolean;
};

export const IncidentLogActivityList = ({
  incident,
  loading,
}: IncidentLogActivityListProps) => {
  const { debouncedSearch, onSearch } = useSearch({
    debounce: 500,
  });

  const [field, setField] = useSetState<IncidentLogField>(
    {
      list: [],
      selected: ['@timestamp', 'event.original'],
      search: '',
      checkedAll: false,
    }
  );

  const { data } = incident.data;

  const getFields = useCallback(() => {
    return getKeysOfObject(data?.[0]);
  }, [data]);

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

    setField({
      selected: newSelected,
      checkedAll: isCheckedAll,
    });
  };

  const onCheckedAll = (checked: boolean) => {
    const { selected, list } = field;

    if (checked) {
      const value = [...new Set([...selected, ...list])];
      setField({ checkedAll: checked, selected: value });
    } else {
      const value = selected.filter(
        (item) => !list.includes(item)
      );

      setField({ checkedAll: checked, selected: value });
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setField({ list: getFields() });
    }
  }, [data, getFields, setField]);

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
        result = getFields();
      }

      const isCheckedAll = result.every((item) =>
        field.selected.includes(item)
      );

      setField({
        list: result,
        search: debouncedSearch ?? '',
        checkedAll: isCheckedAll,
      });
    };
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, getFields, setField]);

  return (
    <Card
      title={
        <IntlMessage id="siem.incidentManagementDetails.logActivity" />
      }
      className={css`
        margin-top: 23px !important;

        .main-content {
          overflow: hidden;
        }
      `}
      bodyStyle={{ paddingLeft: 0 }}
      loading={loading}
    >
      {!data || data?.length < 1 ? (
        <Empty className="mt-4 mb-5" />
      ) : (
        <InnerAppLayout
          border
          sideContentWidth={300}
          sideContent={
            <IncidentLogActivityField
              field={field}
              onSearch={onSearch}
              onChecked={onChecked}
              onCheckedAll={onCheckedAll}
            />
          }
          mainContent={
            <IncidentLogActivityTable
              loading={loading}
              selected={field.selected}
              data={incident.data.data ?? []}
            />
          }
        />
      )}
    </Card>
  );
};
