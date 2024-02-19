import { css } from '@emotion/css';
import { useSetState } from '@mantine/hooks';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { useLogSearchStore } from '@/features/log-management';
import { InnerAppLayout } from '@/layouts';

import { useListField } from '../../api/list-field';
import { useListLogSearch } from '../../api/list-log';
import { LogSearchField } from '../log-search-field';
import { LogSearchPagination } from '../log-search-pagination';

import { LogSearchTable } from './log-search-table';

type Offset = {
  prevPage: number;
  values: number[];
};

export const LogSearchList = () => {
  const router = useRouter();
  const logSearchStore = useLogSearchStore();

  const refetchState = logSearchStore.refetch;
  const { timestamp, indices } = logSearchStore.data;
  const [from, to] = timestamp;

  const currentModule =
    router.pathname.split('/')[3] === 'log-management'
      ? 'LM'
      : 'SIEM';

  const {
    data,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useListLogSearch({
    payload: {
      ...logSearchStore.data,
      timestamp: {
        from: from.toISOString(),
        to: to.toISOString(),
      },
      module: currentModule,
    },
    enabled: logSearchStore.isEnabled,
  });

  const listField = useListField({
    indices: indices as string,
    module: currentModule,
    response_type: 'lists',
    enable: !!indices && logSearchStore.isEnabled,
  });

  const [offset, setOffset] = useSetState<Offset>({
    prevPage: 1,
    values: [],
  });

  const onChangePage = (page: number) => {
    const dataOffset =
      data?.data[data.data.length - 1].sort ?? [];

    const { prevPage, values } = offset;

    const offsetValue = {
      prevPage: page,
      values:
        page < prevPage
          ? values.slice(0, values.length - 1)
          : [...values, ...dataOffset],
    };

    setOffset(offsetValue);

    logSearchStore.onSetData({
      ...logSearchStore.data,
      page,
      offset:
        offsetValue.values[offsetValue.values.length - 1],
    });

    logSearchStore.onSetEnabled(true);
  };

  useEffect(() => {
    if (refetchState.isRefetch && !!indices) {
      refetch();

      logSearchStore.onSetRefetch({
        ...refetchState,
        isRefetch: false,
      });
    }

    const interval = setInterval(() => {
      logSearchStore.onSetData({
        ...logSearchStore.data,
        timestamp: [from, dayjs()],
      });

      setTimeout(() => {
        refetch();
      }, 100);
    }, refetchState.refetchTime);

    if (refetchState.disabled || isError)
      clearInterval(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    refetchState.isRefetch,
    refetchState.refetchTime,
    refetchState.disabled,
    refetch,
    isError,
  ]);

  useEffect(() => {
    logSearchStore.onSetLoading(
      isLoading || isRefetching
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isRefetching]);

  useEffect(() => {
    logSearchStore.onSetData({
      ...logSearchStore.data,
      timestamp: [dayjs().add(-15, 'minutes'), dayjs()],
    });

    return () => logSearchStore.onReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listField.data) {
      const list =
        listField.data?.map((item) => item.label) ?? [];

      logSearchStore.onSetField({
        ...logSearchStore.field,
        list,
        default: list,
      });

      logSearchStore.onSetEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listField.data]);

  if (
    !data ||
    (data && data.data.length < 1) ||
    logSearchStore.field.default.length < 1
  ) {
    return (
      <Card
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50vh;
        `}
      >
        <Empty />
      </Card>
    );
  }

  return (
    <FallbackError isError={isError || listField.isError}>
      <div
        className={css`
          .main-content {
            overflow: hidden;
          }
        `}
      >
        <InnerAppLayout
          border
          sideContentWidth={300}
          sideContent={<LogSearchField />}
          mainContent={
            <>
              <LogSearchTable
                data={data?.data ?? []}
                loading={isLoading || isRefetching}
                selected={logSearchStore.field.selected}
              />
              <LogSearchPagination
                current={data?.meta?.current_page ?? 1}
                total={data?.meta?.total_page ?? 1}
                loading={isLoading || isRefetching}
                onChange={onChangePage}
              />
            </>
          }
        />
      </div>
    </FallbackError>
  );
};
