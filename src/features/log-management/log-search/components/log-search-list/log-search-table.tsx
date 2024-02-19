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

import { LogSearch } from '../../types';
import { LogSearchTextEventOriginal } from '../log-search-text-event-original';
import { LogSearchTextExpand } from '../log-search-text-expand';

type LogSearchTableProps = {
  loading?: boolean;
  selected: string[];
  data?: LogSearch[];
};

export const LogSearchTable = ({
  data,
  loading,
  selected,
}: LogSearchTableProps) => {
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
        ellipsis: ['event.original', 'message'].includes(
          item
        )
          ? false
          : true,
        render: (value: Record<string, unknown>) => {
          const label = (_.get(value, item) ??
            '-') as string;

          if (
            item === 'event.original' &&
            label !== '-'
          ) {
            return (
              <LogSearchTextEventOriginal text={label} />
            );
          } else if (
            item === 'message' &&
            label.length > 100
          ) {
            return <LogSearchTextExpand text={label} />;
          }

          return label;
        },
      };

      // return {
      //   title: item,
      // width: ['event.original', 'message'].includes(
      //   item
      // )
      //   ? 'auto'
      //   : 220,
      //   ellipsis: false,
      //   key: index,
      //   render: (value: Record<string, unknown>) => {
      //     const label = (_.get(value, item) ??
      //       '-') as string;

      //     if (
      //       item === 'event.original' &&
      //       label !== '-'
      //     ) {
      //       return (
      //         <LogSearchTextEventOriginal text={label} />
      //       );
      //     }

      //     return label;
      //   },
      // };
    });
  }, [selected]);

  useEffect(() => {
    if (data) {
      startTransition(() => {
        const dataSourceValue = data.map((item) => ({
          ...item._source,
          id: item._id,
        }));
        setDataSource(dataSourceValue);
      });
    }
  }, [data]);

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
      // scroll={
      //   currentModule === 'SIEM' ? { x: true } : undefined
      // }
      pagination={false}
    />
  );
};
