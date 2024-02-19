import { css } from '@emotion/css';
import { ResponsivePie } from '@nivo/pie';
import { Row, Badge, Typography, Col } from 'antd';
import _ from 'lodash';

import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';

export type IChartSettingMargin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type IDataPie = {
  id: string;
  label: string;
  value: string | number;
  color: string;
};

export type IChartProps = {
  data: IDataPie[];
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  colors?: string[];
  activeOuterRadiusOffset?: number;
  margin?: IChartSettingMargin;
  loading?: boolean;
  enableArcLinkLabels?: boolean;
  showlegends?: boolean;
  showtextCenter?: boolean;
  textCenter?: string;
  legendItemScroll?: boolean;
};

export const PieChart = ({
  data,
  colors,
  innerRadius = 0.75,
  padAngle = 0.5,
  cornerRadius = 0,
  activeOuterRadiusOffset = 5,
  margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  enableArcLinkLabels = false,
  showlegends = false,
  showtextCenter = false,
  textCenter = 'ข้อมูลทั้งหมด',
  legendItemScroll = true,
}: IChartProps) => {
  return (
    <Row
      justify="space-between"
      align={showtextCenter ? 'top' : 'middle'}
      gutter={[10, 10]}
    >
      {showlegends && (
        <Col {...getColLayout([24, 24, 24, 24, 14, 14])}>
          <div
            className={css`
              width: 100%;
              display: ${showtextCenter
                ? 'flex'
                : 'none'};
              justify-content: center;
              flex-direction: column;
              align-items: start;
              font-size: 18px;
              text-align: center;
              margin-top: 4px;
              margin-bottom: 20px;
            `}
          >
            <span>{textCenter}</span>
            <div>
              <span
                className={css`
                  font-size: 24px;
                  font-weight: bold;
                  margin-right: 10px;
                `}
              >
                {data.length}
              </span>
              <span>รายการ</span>
            </div>
          </div>
          <div
            className={css`
              ${legendItemScroll &&
              ` height: 200px;
              overflow: auto;`}
            `}
          >
            {_.map(data, (v) => {
              return (
                <Flex
                  justifyContent={'between'}
                  alignItems="center"
                  className="my-3 pr-3"
                  key={v.id}
                >
                  <Flex
                    justifyContent={'start'}
                    alignItems="center"
                  >
                    <Badge
                      key={v.color}
                      color={v.color}
                      className={css`
                        margin-bottom: 2px;

                        .ant-badge-status-dot {
                          width: 10px;
                          height: 10px;
                        }
                      `}
                    />
                    <Typography.Text
                      className={css`
                        width: 100%;
                        margin-left: 10px;
                      `}
                    >
                      {v.label}
                    </Typography.Text>
                  </Flex>
                  <Typography.Text
                    strong
                    className="pl-4"
                  >
                    {v.value}
                  </Typography.Text>
                </Flex>
              );
            })}
          </div>
        </Col>
      )}
      <Col
        {...getColLayout([
          24,
          24,
          24,
          24,
          showlegends ? 10 : 24,
          showlegends ? 10 : 24,
        ])}
        className={css`
          width: ${showlegends ? '40%' : '100%'};
          height: 300px;
        `}
      >
        <Row
          justify={'center'}
          align={'middle'}
          className={css`
            height: 300px;
          `}
        >
          <ResponsivePie
            data={data}
            margin={margin}
            innerRadius={innerRadius}
            padAngle={padAngle}
            cornerRadius={cornerRadius}
            activeOuterRadiusOffset={
              activeOuterRadiusOffset
            }
            colors={colors ?? { scheme: 'nivo' }}
            arcLabelsTextColor="#fff"
            enableArcLinkLabels={enableArcLinkLabels}
            arcLabelsSkipAngle={10}
          />
          <div
            className={css`
              position: absolute;
              top: 0;
              right: 30px;
              bottom: 0;
              left: 30px;
              display: ${showtextCenter
                ? 'flex'
                : 'none'};
              justify-content: center;
              flex-direction: column;
              align-items: center;
              font-size: 1.7rem;
              text-align: center;
            `}
          >
            <span>{textCenter}</span>
            <span
              className={css`
                font-size: 1.5rem;
              `}
            >
              {data.length}
            </span>
          </div>
        </Row>
      </Col>
    </Row>
  );
};
