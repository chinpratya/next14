import { Card } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import { RefreshState } from '@/features/log-management';

import { useListUnresolvedIncident } from '../../../../siem';

import { OverviewTable } from './overview-table';

type OverviewListProps = {
  refreshState: RefreshState;
  onRefresh: () => void;
  handleChangeRefreshing: (
    key: string,
    value: boolean
  ) => void;
};

export const OverviewList = ({
  refreshState,
  onRefresh,
  handleChangeRefreshing,
}: OverviewListProps) => {
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useListUnresolvedIncident({
    module: 'SIEM',
    type: 'csv',
    report_type: 'lists',
    filter: {
      from: dayjs()
        .startOf('d')
        .add(7, 'hour')
        .toISOString(),
      to: dayjs().endOf('d').add(7, 'hour').toISOString(),
      indices: [],
      hosts: [],
      type: 'incident',
      limit: 10,
    },
  });

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
      handleChangeRefreshing('incident', true);
    else handleChangeRefreshing('incident', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetching]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="siem.overview.incident.title" />
        }
      >
        <OverviewTable
          data={data}
          loading={
            isLoading ||
            isRefetching ||
            refreshState.loading
          }
        />
      </Card>
    </FallbackError>
  );
};
