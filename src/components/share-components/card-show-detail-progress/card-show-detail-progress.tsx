import { css } from '@emotion/css';
import { Progress, Card, Empty, Row, Col } from 'antd';
import _ from 'lodash';

import { CHART_DEFAULT_COLOR_SCHEME } from '@/config/color';
import { getColLayout } from '@/utils';

export type dataType = {
  label: string;
  value: number;
};
export type CardShowDetailProgressProps = {
  title: string;
  data: dataType[] | undefined;
  width?: string;
  height?: string;
};

export const CardShowDetailProgress = ({
  title,
  data,
  width = '100%',
  height = '240px',
}: CardShowDetailProgressProps) => {
  return (
    <Card
      title={title}
      className={css`
        width: ${width};
        height: ${height};
        margin: 10px auto !important;
      `}
    >
      <div
        className={css`
          max-height: 195px;
          overflow-y: scroll;
          padding: 10px;
        `}
      >
        {data ? (
          _.map(data, (value, index) => (
            <Row
              key={index}
              justify={'space-between'}
              align={'middle'}
              className={css`
                padding: 7px 10px 0 10px;
              `}
            >
              <Col
                {...getColLayout([
                  24, 24, 24, 24, 11, 11,
                ])}
              >
                <p
                  className={css`
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}
                >
                  {value.label}
                </p>
              </Col>
              <Col
                {...getColLayout([
                  24, 24, 24, 24, 11, 11,
                ])}
              >
                {' '}
                <Progress
                  percent={value.value}
                  className={css`
                    width: 100%;
                  `}
                  strokeWidth={15}
                  strokeColor={
                    CHART_DEFAULT_COLOR_SCHEME[index]
                  }
                />
              </Col>
            </Row>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Card>
  );
};
