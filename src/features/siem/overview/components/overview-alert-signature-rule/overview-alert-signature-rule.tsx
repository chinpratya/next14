import { css } from '@emotion/css';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { PieChart } from '@/components/chart-components/pie-chart';
import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { RefreshState } from '@/features/log-management';

import { constant } from '../../../shared';
import { useListAlertSignatureRule } from '../../api/list-attack-category';

type OverviewAlertSignatureRuleProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const OverviewAlertSignatureRule = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: OverviewAlertSignatureRuleProps) => {
  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

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
      report_type: 'summary',
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
    data?.slice(0, 10).map((item, index) => ({
      ...item,
      id: item.label,
      color: constant.color?.[index],
    })) ?? [];

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
      handleChangeRefreshing('alertSignatureRule', true);
    else
      handleChangeRefreshing('alertSignatureRule', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.overview.topAlertSignatureRule" />
        }
        className={css`
          min-height: 432.5px;
          height: 100%;
          margin-bottom: 0;
        `}
      >
        <LoadingOverlay
          visible={isRefetching || refreshState.loading}
        />
        {dataBar.length < 1 ? (
          <Empty
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 350px;
            `}
          />
        ) : (
          <PieChart
            data={dataBar}
            colors={constant.color}
            innerRadius={0}
            padAngle={0.5}
            cornerRadius={0}
            activeOuterRadiusOffset={5}
            margin={margin}
            loading={isLoading}
            showlegends
            legendItemScroll={false}
          />
        )}
      </Card>
    </FallbackError>
  );
};
