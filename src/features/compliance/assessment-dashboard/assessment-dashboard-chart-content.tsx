import { css } from '@emotion/css';
import { Card, Col, Row, Empty, Slider } from 'antd';
import _ from 'lodash';
import { useState, useEffect } from 'react';

import { Line } from '@/components/chart-components/line';
import { CHART_DEFAULT_COLOR_SCHEME } from '@/config/color';
import { ECOption } from '@/types';
import { getColLayout } from '@/utils';

import { DashboardResponse } from '../share/types/dashboard';

type AssessmentDashboardBarContentProps = {
  data: DashboardResponse;
};
export const AssessmentDashboardChartContent = ({
  data,
}: AssessmentDashboardBarContentProps) => {
  const [showIndexBar, setShowIndexBar] = useState<
    [number, number]
  >([0, 5]);
  const [showIndexLine, setShowIndexLine] = useState<
    [number, number]
  >([0, 5]);

  const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const legendBar = _.get(
    _.get(data, `data.echarts.BasicLineChart`, {}),
    'xAxis.data',
    []
  );
  const color = _.map(
    data?.data.echarts?.BasicLineChart.xAxis?.data,
    (v, index) => {
      if (index >= 9) {
        return generateRandomColor();
      }
      return CHART_DEFAULT_COLOR_SCHEME[index];
    }
  );

  useEffect(() => {
    if (data) {
      const lenghtDataBar = _.get(
        data,
        `data.echarts.BasicLineChart.series[0].data`,
        []
      ) as number[];
      const lenghtDataLine = _.get(
        data,
        `data.echarts.lineStackSections.series`,
        []
      ) as number[];
      setShowIndexBar([
        0,
        lenghtDataBar.length > 7
          ? 7
          : lenghtDataBar.length,
      ]);
      setShowIndexLine([
        0,
        lenghtDataLine.length > 7
          ? 7
          : lenghtDataLine.length,
      ]);
    }
  }, [data]);

  const onChangeBar = (value: [number, number]) => {
    setShowIndexBar(value);
  };
  const onChangeLine = (value: [number, number]) => {
    setShowIndexLine(value);
  };
  const getDataGraph = (Graph: string) => {
    const lenghtData = _.get(
      _.get(data, `data.echarts.${Graph}`, {}),
      'series[0].data',
      []
    ) as number[];
    const xAxisData = _.get(
      _.get(data, `data.echarts.${Graph}`, {}),
      'xAxis.data',
      []
    ) as string[];

    return {
      ..._.get(data, `data.echarts.${Graph}`, {}),
      xAxis: {
        ..._.get(data, `data.echarts.${Graph}.xAxis`, {}),
        data: xAxisData.slice(
          Graph !== 'lineStackSections'
            ? showIndexBar[0]
            : showIndexLine[0],
          Graph !== 'lineStackSections'
            ? showIndexBar[1]
            : showIndexLine[1]
        ) as string[],
        axisLabel: {
          rotate: -2,
          formatter: function (value: string) {
            const max = 10;
            if (value.length > max) {
              const text = value.slice(0, max) + '..';

              return null;
            } else {
              return null;
            }
          },
          textStyle: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
        boundaryGap: true,
      },
      series: data
        ? Graph !== 'lineStackSections'
          ? [
              {
                data: lenghtData.slice(
                  Graph !== 'lineStackSections'
                    ? showIndexBar[0]
                    : showIndexLine[0],
                  Graph !== 'lineStackSections'
                    ? showIndexBar[1]
                    : showIndexLine[1]
                ),
                type: 'bar',
                barWidth: '40%',
                itemStyle: {
                  color: function (params: object) {
                    return color[
                      _.get(params, 'dataIndex', 1)
                    ];
                  },
                },

                // barCategoryGap: '50%',
              },
            ]
          : _.map(
              data.data.echarts?.lineStackSections.series,
              (v) => {
                return {
                  ...v,
                  data: v.data
                    ? v.data.slice(
                        Graph !== 'lineStackSections'
                          ? showIndexBar[0]
                          : showIndexLine[0],
                        Graph !== 'lineStackSections'
                          ? showIndexBar[1]
                          : showIndexLine[1]
                      )
                    : [],
                };
              }
            )
        : [],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    };
  };
  return (
    <>
      <Row justify={'space-between'} align={'middle'}>
        <Col
          {...getColLayout([24, 24, 24, 24, 12, 12])}
          className={css`
            margin: 10px 0;
          `}
        >
          <Card
            className={css`
              padding: 10px;
              width: 98%;
              height: 450px;
              margin: auto !important;
            `}
          >
            {data?.data.echarts?.BasicLineChart &&
            data?.data.echarts?.BasicLineChart.series
              .length > 0 ? (
              <>
                <Slider
                  range={{ draggableTrack: true }}
                  value={showIndexBar}
                  max={
                    data?.data.echarts?.BasicLineChart
                      .series[0].data?.length
                  }
                  onChange={onChangeBar}
                />
                <Line
                  {...(getDataGraph(
                    'BasicLineChart'
                  ) as ECOption)}
                />
                <div
                  className={css`
                    display: flex !important;
                    flex-direction: row !important;
                    width: 100% !important;
                    overflow-x: auto;
                    height: 40px !important;
                    flex-wrap: nowrap;
                  `}
                >
                  {_.map(
                    legendBar.slice(
                      showIndexBar[0],
                      showIndexBar[1]
                    ),
                    (v, index) => {
                      return (
                        <div
                          key={index}
                          className={css`
                            margin: 0 10px;
                            height: 40px;
                            display: flex !important;
                            flex-direction: row !important;
                            white-space: nowrap;
                          `}
                        >
                          <div
                            className={css`
                              width: 20px;
                              height: 20px;
                              background: ${color[index]};
                              border-radius: 10px;
                              margin: 0 5px;
                            `}
                          ></div>
                          {v}
                        </div>
                      );
                    }
                  )}
                </div>
              </>
            ) : (
              <div
                className={css`
                  height: 300px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Empty />
              </div>
            )}
          </Card>
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 12, 12])}>
          <Card
            className={css`
              padding: 10px;
              min-height: 350px;
              width: 98%;
              height: 450px;
              margin: auto !important;
            `}
          >
            {data?.data.echarts?.lineStackSections &&
            data?.data.echarts?.lineStackSections.series
              .length > 0 ? (
              <>
                <Slider
                  range={{ draggableTrack: true }}
                  value={showIndexLine}
                  max={
                    data?.data.echarts?.lineStackSections
                      .series?.length
                  }
                  onChange={onChangeLine}
                />
                <Line
                  {...(getDataGraph(
                    'lineStackSections'
                  ) as ECOption)}
                />
                <></>
              </>
            ) : (
              <div
                className={css`
                  height: 300px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Empty />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
