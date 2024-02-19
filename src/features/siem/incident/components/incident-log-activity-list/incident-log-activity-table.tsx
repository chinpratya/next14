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

import { TextEventOriginal } from './components/text-event-original';
import { TextExpand } from './components/text-expand';

type IncidentLogActivityTableProps = {
  loading?: boolean;
  selected: string[];
  data?: Record<string, unknown>[];
};

export const IncidentLogActivityTable = ({
  loading,
  selected,
  data,
}: IncidentLogActivityTableProps) => {
  const [isPending, startTransition] = useTransition();

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

          if (item === 'event.original') {
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
    if (selected.length > 0) {
      startTransition(() => {
        const columns = getColumns();
        setColumns(columns);
      });
    }
  }, [selected, getColumns]);

  return (
    <Table
      tableLayout="fixed"
      rowKey="@timestamp"
      className={css`
        td.ant-table-cell {
          vertical-align: top;
        }
      `}
      loading={loading || isPending}
      columns={columns}
      dataSource={data}
      scroll={{ x: true }}
      pagination={false}
    />
  );
};
