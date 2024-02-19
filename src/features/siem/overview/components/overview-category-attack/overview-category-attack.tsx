import { css } from '@emotion/css';
import { Card, Empty, Skeleton } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect } from 'react';

import { BarChart } from '@/components/chart-components/bar-chart';
import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { RefreshState } from '@/features/log-management';

import { useListAlertSignatureRule } from '../../api/list-attack-category';

type OverviewCategoryAttackProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const OverviewCategoryAttack = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: OverviewCategoryAttackProps) => {
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useListAlertSignatureRule({
    payload: {
      type: 'csv',
      module: 'SIEM',
      report_type: 'tags',
      filter: {
        indices: [],
        hosts: [],
        from: dayjs()
          .startOf('d')
          .add(7, 'hour')
          .toISOString(),
        to: dayjs()
          .endOf('d')
          .add(7, 'hour')
          .toISOString(),
        type: 'incident',
        limit: 10,
      },
    },
  });

  const dataBar =
    data?.map(({ label, value }) => {
      return {
        index: `${label}`,
        [`${label}`]: value,
      };
    }) ?? [];

  const keys = _.map(data, 'label') as string[];

  const { disabled, isRefresh, refreshTime } =
    refreshState;

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
      handleChangeRefreshing('categoryAttack', true);
    else handleChangeRefreshing('categoryAttack', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.overview.top10CategoryAttack" />
        }
        className={css`
          min-height: 432.5px;
          height: 100%;
          margin-bottom: 0;

          .ant-card-body {
            display: flex;
            align-items: center;
            height: calc(100% - 40px);
          }
        `}
      >
        <LoadingOverlay
          visible={isRefetching || refreshState.loading}
        />
        {isLoading ? (
          <Skeleton paragraph={{ rows: 6 }} />
        ) : (
          <div
            className={css`
              width: 100%;
              height: 370px;
            `}
          >
            {dataBar.length < 1 ? (
              <Empty className="d-flex flex-column justify-content-center h-100" />
            ) : (
              <BarChart
                data={dataBar}
                keys={keys}
                colors={['#3e79f7']}
                indexBy="index"
                axisBottom={{
                  tickRotation: 40,
                  format: (value: string) => {
                    return value.length > 10
                      ? `${value.slice(0, 10)}...`
                      : value;
                  },
                }}
                margin={{
                  bottom: 55,
                  left: 20,
                  right: 20,
                  top: 10,
                }}
              />
            )}
          </div>
        )}
      </Card>
    </FallbackError>
  );
};
