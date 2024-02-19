import { css } from '@emotion/css';
import { Grid } from '@mantine/core';
import { Card, Empty } from 'antd';

import {
  ColumnItem,
  RowBoxTableType,
} from './row-box-table-type';

type RowBoxTableBodyProps = RowBoxTableType;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColumnData = (column: ColumnItem, data: any) => {
  if (column.dataIndex) {
    return data[column.dataIndex];
  }
  if (!column.dataIndex) {
    return data;
  }
};

export const RowBoxTableBody = ({
  columns,
  dataSource,
  columnWidth,
  itemBoxBorderColor,
}: RowBoxTableBodyProps) => {
  if (dataSource?.length === 0) {
    return <Empty />;
  }

  return (
    <div
      className={css`
        .mantine-Grid-root {
          align-items: center;
        }

        .ant-card {
          border-left: ${itemBoxBorderColor
            ? `${itemBoxBorderColor} 4px solid`
            : 'auto'};
        }

        .ant-card-body {
          padding: 12px 18px;
          min-height: 54px;
        }
      `}
    >
      {dataSource.map((data, index) => (
        <Card key={index}>
          <Grid gutter={0} columns={columnWidth} grow>
            {columns.map((column, index) => (
              <Grid.Col
                className={css`
                  text-align: ${column.align ?? 'left'};
                `}
                key={index}
                span={column.width}
              >
                {column.render
                  ? column.render(
                      getColumnData(column, data),
                      index
                    )
                  : getColumnData(column, data)}
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      ))}
    </div>
  );
};
