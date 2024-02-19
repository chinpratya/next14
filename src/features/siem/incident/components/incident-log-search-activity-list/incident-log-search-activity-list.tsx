import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useSetState } from '@mantine/hooks';
import { Button, Card, Empty, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  LogSearchPayload,
  useListField,
  useListLogSearch,
} from '@/features/siem';
import { useSearch } from '@/hooks';
import { InnerAppLayout } from '@/layouts';

import {
  IncidentInfoResponse,
  IncidentLogField,
} from '../../types';
import { IncidentLogActivityField } from '../incident-log-activity-list/incident-log-activity-field';

import { IncidentLogActivityTable } from './incident-log-search-activity-table';
import { LogSearchPagination } from './log-search-pagination';

const { Search } = Input;

type Offset = {
  prevPage: number;
  values: number[];
};

type IncidentLogSearchActivityListProps = {
  incident: IncidentInfoResponse;
  loading?: boolean;
};

export const IncidentLogSearchActivityList = ({
  incident,
}: IncidentLogSearchActivityListProps) => {
  const [payload, setPayload] =
    useSetState<LogSearchPayload>({
      hostname: [],
      indices: `incident_${incident.data.id}`,
      limit: 10,
      page: 1,
      timestamp: {
        from: dayjs(),
        to: dayjs(),
      },
      enabled: true,
      type: 'all',
    });

  const listLog = useListLogSearch({
    payload: {
      ...payload,
      timestamp: {
        from: incident.data.detection_time.start_date,
        to: incident.data.detection_time.end_date,
      },
    },
  });

  const listField = useListField({
    indiceId: `incident_${incident.data.id}`,
  });

  const { debouncedSearch, onSearch } = useSearch({
    debounce: 500,
  });

  const [field, setField] = useSetState<IncidentLogField>(
    {
      list: [],
      selected: ['@timestamp', 'message'],
      search: '',
      checkedAll: false,
    }
  );

  const [offset, setOffset] = useSetState<Offset>({
    prevPage: 1,
    values: [],
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

  const onChangePage = (page: number) => {
    const data = listLog.data;
    const dataOffset =
      data?.data[data.data.length - 1]?.sort ?? [];

    const { prevPage, values } = offset;

    const offsetValue = {
      prevPage: page,
      values:
        page < prevPage
          ? values.slice(0, values.length - 1)
          : [...values, ...dataOffset],
    };

    setOffset(offsetValue);

    setPayload({
      page,
      offset:
        offsetValue.values[offsetValue.values.length - 1],
      enabled: true,
    });
  };

  useEffect(() => {
    const onSearch = () => {
      let result: string[] = [];

      if (!listField.data) return;

      if (debouncedSearch) {
        result = field.list.filter((item) =>
          item
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        );
      } else {
        result = listField.data.map((item) => item.label);
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
  }, [debouncedSearch, setField]);

  useEffect(() => {
    if (listField.data) {
      setField({
        list: listField.data.map((item) => item.label),
      });
    }
  }, [listField.data, setField]);

  return (
    <FallbackError
      isError={listLog.isError || listField.isError}
    >
      <Card
        title={
          <IntlMessage id="siem.incidentManagementDetails.logActivity" />
        }
        extra={
          <Search
            className={css`
              width: 350px;
            `}
            onSearch={(value) =>
              setPayload({ search: value })
            }
            enterButton={
              <Button
                icon={<SearchOutlined className="mr-2" />}
                loading={listLog.isLoading}
                type="primary"
              >
                <IntlMessage id="logManagement.search" />
              </Button>
            }
          />
        }
        className={css`
          margin-top: 23px !important;

          .main-content {
            overflow: hidden;
          }

          .ant-skeleton-paragraph {
            margin-left: 24px;
          }
        `}
        bodyStyle={{ paddingLeft: 0 }}
        loading={listField.isLoading}
      >
        {listField.data && listField.data.length > 0 ? (
          <>
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
                <>
                  <IncidentLogActivityTable
                    loading={
                      listField.isLoading ||
                      listLog.isLoading
                    }
                    selected={field.selected}
                    logSearch={listLog.data}
                  />
                  <LogSearchPagination
                    current={
                      listLog.data?.meta?.current_page ??
                      1
                    }
                    total={
                      listLog.data?.meta?.total_page ?? 1
                    }
                    loading={listLog.isLoading}
                    onChange={onChangePage}
                  />
                </>
              }
            />
          </>
        ) : (
          <Empty className="mt-4 mb-5" />
        )}
      </Card>
    </FallbackError>
  );
};
