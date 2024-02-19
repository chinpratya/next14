import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaDatabase } from 'react-icons/fa';

import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { constant } from '@/features/siem';
import { convertBytesToSize } from '@/utils';

import { useGetTenantStorage } from '../../../setting/api/get-tenant-storage';
import { useGetReport } from '../../api/get-report';
import {
  RefreshState,
  ReportResponse,
} from '../../types';

import { DashboardTotalStorageItem } from './dashboard-total-storage-item';
import { DashboardTotalStorageProgressItem } from './dashboard-total-storage-progress-item';

type DashboardTotalStorageProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const DashboardTotalStorage = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: DashboardTotalStorageProps) => {
  const { disabled, isRefresh, refreshTime } =
    refreshState;
  const [state, setState] = useState({ empty: 0 });

  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useGetReport({
    module: 'LM',
    type: 'csv',
    report_type: 'total_storage',
    filter: {
      from: dayjs()
        .startOf('day')
        .add(7, 'hour')
        .toISOString(),
      to: dayjs()
        .endOf('day')
        .add(7, 'hour')
        .toISOString(),
      indices: [],
      hosts: [],
      type: 'size',
      limit: 30,
    },
  });

  const tenantStorage = useGetTenantStorage();

  useEffect(() => {
    if (data && tenantStorage.data) {
      const used = (data as ReportResponse).reduce(
        (total, { value }) => {
          const currentValue = value ?? 0;
          return total + currentValue;
        },
        0
      );
      const total = tenantStorage.data - used;
      setState({ empty: total });
    }
  }, [data, tenantStorage.data]);

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
      handleChangeRefreshing('totalStorage', true);
    else handleChangeRefreshing('totalStorage', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError
      isError={isError || tenantStorage.isError}
    >
      <Card
        title={
          <IntlMessage id="logManagement.dashboard.totalStorage" />
        }
        loading={isLoading || tenantStorage.isLoading}
      >
        <LoadingOverlay
          visible={isRefetching || refreshState.loading}
        />
        <Flex direction="column" align="center" gap={16}>
          <Flex
            gap="10px"
            align="center"
            className={css`
              max-width: 820px;
              width: 100%;
            `}
          >
            <FaDatabase
              size={49}
              style={{ fill: '#7F61FF' }}
            />
            <div
              className={css`
                position: relative;
                display: flex;
                width: 100%;
                height: 29px;
                background: #ededed;
                border-radius: 10px;
                overflow: hidden;
              `}
            >
              {(data as ReportResponse)?.map(
                (item, index) => (
                  <DashboardTotalStorageProgressItem
                    key={item.label}
                    value={item.value as number}
                    color={constant.color?.[index]}
                    totalStorage={tenantStorage.data ?? 0}
                  />
                )
              )}

              <span
                className={css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  font-weight: 500;
                  flex-grow: 1;
                  height: 100%;
                  background-color: #ededed;
                `}
              >
                <Typography.Text
                  style={{
                    maxWidth: '100%',
                    color: '#72849A',
                  }}
                  ellipsis={{
                    tooltip: state.empty,
                  }}
                >
                  {convertBytesToSize(state.empty)}
                </Typography.Text>
              </span>
            </div>
          </Flex>

          <Flex
            align="center"
            gap={16}
            rowGap={28}
            justify="center"
            wrap="wrap"
          >
            {(data as ReportResponse)?.map(
              (item, index) => (
                <div className="d-flex" key={index}>
                  <DashboardTotalStorageItem
                    label={item.label as string}
                    value={item.value as number}
                    color={constant.color?.[index]}
                  />
                </div>
              )
            )}
            <div className="d-flex">
              <DashboardTotalStorageItem
                label="Empty"
                value={state.empty}
                color="#cdcdcd"
              />
            </div>
          </Flex>
        </Flex>
      </Card>
    </FallbackError>
  );
};
