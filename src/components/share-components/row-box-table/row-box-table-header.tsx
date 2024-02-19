import { css } from '@emotion/css';
import { Grid } from '@mantine/core';
import { Card } from 'antd';

import { RowBoxTableType } from './row-box-table-type';

type RowBoxTableHeaderProps = RowBoxTableType;

export const RowBoxTableHeader = ({
  columns,
  columnWidth,
}: RowBoxTableHeaderProps) => {
  return (
    <Card
      className={css`
        margin: 24px 0;
        border-radius: 0;

        color: #1a3353;
        font-weight: 700;

        .ant-card-body {
          padding: 18px;
        }
      `}
    >
      <Grid gutter={0} columns={columnWidth} grow>
        {columns.map((column, index) => (
          <Grid.Col
            className={css`
              text-align: ${column.align ?? 'left'};
            `}
            key={index}
            span={column.width}
          >
            {column.title}
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
};
