import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import {
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';

import {
  LogSearch,
  LogSearchResponse,
} from '@/features/siem';

import { TextEventOriginal } from '../incident-log-activity-list/components/text-event-original';
import { TextExpand } from '../incident-log-activity-list/components/text-expand';

type IncidentLogSearchActivityTableProps = {
  loading?: boolean;
  selected: string[];
  logSearch?: LogSearchResponse;
};

export const IncidentLogActivityTable = ({
  loading,
  selected,
  logSearch,
}: IncidentLogSearchActivityTableProps) => {
  const [isPending, startTransition] = useTransition();

  const [dataSource, setDataSource] = useState<
    Record<string, unknown>[]
  >([]);

  const [columns, setColumns] =
    useState<ColumnsType<Record<string, unknown>>>();

  const getColumns = useCallback(() => {
    return selected?.map((item, index) => {
      return {
        title: item,
        key: index,
        ellipsis:
          item === 'event.original' ? false : true,
        render: (value: Record<string, unknown>) => {
          const label = (_.get(value, item) ??
            '-') as string;

          if (
            item === 'event.original' &&
            label !== '-'
          ) {
            return <TextEventOriginal text={label} />;
          } else if (item === 'message') {
            return <TextExpand text={label} />;
          }

          return label;
        },
      };
    });
  }, [selected]);

  useEffect(() => {
    if (logSearch) {
      startTransition(() => {
        const dataSourceValue = logSearch.data.map(
          (item: LogSearch) => ({
            ...item._source,
            id: item._id,
          })
        );
        setDataSource(dataSourceValue);
      });
    }
  }, [logSearch]);

  useEffect(() => {
    if (selected.length > 0) {
      startTransition(() => {
        const columns = getColumns();
        setColumns(columns);
      });
    }
  }, [selected, getColumns]);

  useEffect(() => {
    const tableContent = document.querySelector(
      '.ant-table-content'
    );

    if (tableContent) {
      tableContent.scrollTo({
        left: tableContent.scrollWidth,
      });
    }
  }, [columns]);

  return (
    <Table
      tableLayout="fixed"
      rowKey="id"
      className={css`
        td.ant-table-cell {
          vertical-align: top;
        }
      `}
      loading={loading || isPending}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: true }}
      pagination={false}
    />
  );
};
