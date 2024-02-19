import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';

import { InputSearch } from '@/components/share-components/input-search';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';

import { useListLastlogReceive } from '../../api/list-lastlog-receive';
import {
  LastlogReceive,
  RefreshState,
  OverviewOption,
} from '../../types';

import { FilterStatus } from './filter-status';

type DashboardLastlogReceiveProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const statusColor = {
  GRAY: '#E6EBF1',
  ORANGE: '#FB8A14',
  GREEN: '#03D182',
} as Record<string, string>;

export const DashboardLastlogReceive = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: DashboardLastlogReceiveProps) => {
  const { t } = useTranslation();

  const [indices, setIndices] = useState({
    list: [] as OverviewOption[],
    preSelectd: [] as string[],
    selected: [] as string[],
    search: '',
  });

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useListLastlogReceive({
    module: 'LM',
    type: 'csv',
    report_type: 'report',
    filter: {
      from: dayjs()
        .startOf('day')
        .subtract(7, 'day')
        .add(7, 'hour')
        .toISOString(),
      to: dayjs()
        .endOf('day')
        .add(7, 'hour')
        .toISOString(),
      indices: indices.selected,
      hosts: [],
      type: 'event',
    },
  });

  const [dataSource, setDataSource] = useState<
    LastlogReceive[]
  >([]);

  const [status, setStatus] = useState<string[]>([]);

  const { disabled, isRefresh, refreshTime } =
    refreshState;

  const columns: ColumnsType<LastlogReceive> = [
    {
      key: 'status',
      title: (
        <IntlMessage id="logManagement.dashboard.status" />
      ),
      filters: FilterStatus,
      render: ({ status, value }: LastlogReceive) => {
        return (
          <Flex align="center" gap={10}>
            <Tooltip
              placement="topLeft"
              title={`ส่งข้อมูลวันแรกในวันที่ ${dayjs(
                value
              )
                .subtract(7, 'h')
                .format('DD/MM/YYYY HH:mm:ss A')}`}
              arrowPointAtCenter
            >
              <span
                className={css`
                  display: block;
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background-color: ${statusColor?.[
                    status
                  ] ?? statusColor.GREEN};
                `}
              />
            </Tooltip>
            <Typography.Text>
              {dayjs(value).fromNow()}
            </Typography.Text>
          </Flex>
        );
      },
    },
    {
      key: 'indice',
      title: (
        <IntlMessage id="logManagement.indices.title" />
      ),
      dataIndex: 'indice',
      filterDropdown: ({
        confirm,
        clearFilters,
        setSelectedKeys,
        close,
      }) => (
        <div className="py-1">
          <InputSearch
            value={indices.search}
            width={230}
            className="m-2"
            placeholder={
              t('logManagement.search') as string
            }
            onSearch={onSearchFilter}
          />

          <Divider className="my-0" />
          {indices.list.length > 0 ? (
            <Scrollbars autoHide autoHeight>
              <Checkbox.Group
                value={indices.preSelectd}
                className={css`
                  display: flex !important;
                  margin: 5px 15px;
                  padding: 8px 20px !important;
                  flex-direction: column;
                  gap: 8px;
                `}
                onChange={(value) => {
                  setIndices((prev) => ({
                    ...prev,
                    preSelectd: value as string[],
                  }));
                  setSelectedKeys(value as string[]);
                }}
                options={indices.list}
              />
            </Scrollbars>
          ) : (
            <p className="text-center pb-2 pt-3 mb-0">
              <IntlMessage id="logManagement.noData" />
            </p>
          )}

          <Divider className="my-1" />

          <Flex justify="end" className="px-2">
            <Button
              type="link"
              size="small"
              onClick={() => {
                clearFilters?.();
                confirm();
                onResetFilter(close);
              }}
            >
              <IntlMessage id="logManagement.reset" />
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                confirm();
                onFilter(close);
              }}
            >
              <IntlMessage id="logManagement.filter" />
            </Button>
          </Flex>
        </div>
      ),
    },
    {
      key: 'host',
      title: (
        <IntlMessage id="logManagement.indices.host" />
      ),
      dataIndex: 'label',
      render: (host: string) => host.split('-').join('.'),
    },
    {
      key: 'event',
      title: (
        <IntlMessage id="logManagement.dashboard.lastlogReceive.event" />
      ),
      dataIndex: 'collected',
      render: (collected: string) => (
        <ShowTagDate date={collected} />
      ),
    },
  ];

  const onFilter = (close: () => void) => {
    setIndices((prev) => ({
      ...prev,
      selected: prev.preSelectd,
    }));
    close();
  };

  const onResetFilter = (close: () => void) => {
    setIndices((prev) => ({
      list: prev.list,
      preSelectd: [],
      selected: [],
      search: '',
    }));
    close();
  };

  const onSearchFilter = (keyword: string) => {
    const result =
      data?.indices.filter((item) =>
        item.label.includes(keyword)
      ) ?? [];
    setIndices((prev) => ({
      ...prev,
      list: result,
      search: keyword,
    }));
  };

  useEffect(() => {
    if (data) {
      const result: LastlogReceive[] = [];

      data.lists.map((item) => {
        Object.entries(item).map(([key, value]) => {
          value.map((currentValue) => {
            result.push({
              id: `${key}-${currentValue.label}`,
              indice: key,
              ...currentValue,
            });
          });
        });
      });

      setDataSource(
        _.orderBy(result, ['value'], ['asc'])
      );

      if (indices.list.length < 1) {
        setIndices((prev) => ({
          ...prev,
          list: data.indices,
        }));
      }
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, refreshTime);

    if (isRefresh) {
      refetch();
      onRefresh();
    }
    if (disabled) clearInterval(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, isRefresh, refreshTime]);

  useEffect(() => {
    if (isRefetching)
      handleChangeRefreshing('lastlogReceive', true);
    else handleChangeRefreshing('lastlogReceive', false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="logManagement.dashboard.lastlogReceive" />
        }
        className="mb-0"
      >
        <Table
          rowKey="id"
          bordered
          dataSource={
            status.length === 0
              ? dataSource
              : dataSource.filter((item) =>
                  status.includes(item.status)
                )
          }
          columns={columns}
          loading={
            isLoading ||
            isRefetching ||
            refreshState.loading
          }
          onChange={(_, filter) => {
            setStatus((filter?.status as string[]) ?? []);
          }}
          pagination={false}
          className={css`
            .ant-table-thead > tr > th {
              background-color: #f7f7f8;
            }

            .ant-table-tbody > tr > td {
              padding: 15px;
            }
          `}
        />
      </Card>
    </FallbackError>
  );
};
