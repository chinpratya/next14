import { Center } from '@mantine/core';
import { ResponsivePie } from '@nivo/pie';
import { Col, Divider, Row, Typography } from 'antd';
import { ReactNode } from 'react';

import { tokens } from '@/lang';
import { ChartData } from '@/types/dashboard';
import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { Scrollbars } from '@components/scrollbars';
import { IntlMessage } from '@utilComponents/intl-message';

import { ChartTooltipDefault } from '../chart-tooltip-default';
import { PieCenteredMetric } from '../pie-centered-metric';

export type PieChartSidebarProps = {
  title?: ReactNode;
  data?: ChartData[];
  height?: number;
  innerRadius?: number;
};

export const PieChartSidebar = ({
  title,
  data = [],
  height = 350,
  innerRadius = 0.85,
}: PieChartSidebarProps) => {
  const colors = data.map((item) => item.color);
  const total = data.reduce(
    (acc, item) => acc + item.value,
    0
  );

  if (total === 0) {
    return (
      <Center h={height}>
        <Typography.Title level={4} type="secondary">
          <IntlMessage id={tokens.common.chart.noData} />
        </Typography.Title>
      </Center>
    );
  }

  const activeInnerRadiusOffset = innerRadius * 2;
  const activeOuterRadiusOffset = innerRadius * 3.5;

  return (
    <Row gutter={[24, 24]}>
      <Col {...getColLayout([24, 24, 24, 24, 11, 11])}>
        {title}
        <Scrollbars
          style={{
            minHeight: data.length * 30,
            maxHeight: `${height}px`,
            marginTop: 40,
            marginBottom: 40,
          }}
          autoHide
        >
          <Flex flexDirection="column">
            {data.map((item) => (
              <Flex
                key={item.id}
                alignItems="center"
                justifyContent="between"
                className="mb-4"
              >
                <Flex
                  alignItems="center"
                  className="w-75"
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      marginRight: '10px',
                    }}
                  />
                  <Typography.Text
                    type="secondary"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      width: 'calc(100% - 30px)',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Typography.Text>
                </Flex>
                <Typography.Text
                  className="text-right w-25"
                  style={{
                    fontWeight: 800,
                  }}
                >
                  {item.value}
                </Typography.Text>
              </Flex>
            ))}
          </Flex>
        </Scrollbars>
      </Col>
      <Col {...getColLayout([0, 0, 0, 0, 1, 1])}>
        <Divider
          type="vertical"
          style={{ height: '100%' }}
        />
      </Col>
      <Col {...getColLayout([24, 24, 24, 24, 11, 11])}>
        <div
          style={{
            height: `${height}px`,
          }}
        >
          <ResponsivePie
            data={data}
            innerRadius={innerRadius}
            margin={{
              top: 40,
              right: 40,
              bottom: 40,
              left: 40,
            }}
            colors={colors}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            layers={[
              'arcs',
              'arcLabels',
              PieCenteredMetric,
            ]}
            tooltip={ChartTooltipDefault}
            isInteractive={true}
            animate={true}
            activeInnerRadiusOffset={
              activeInnerRadiusOffset
            }
            activeOuterRadiusOffset={
              activeOuterRadiusOffset
            }
          />
        </div>
      </Col>
    </Row>
  );
};
