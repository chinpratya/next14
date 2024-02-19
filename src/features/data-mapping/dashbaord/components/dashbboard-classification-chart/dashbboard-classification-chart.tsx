import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Card, Slider } from 'antd';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { BarChart } from '@/components/chart-components/bar-chart';
import utils from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardGraphClassification } from '../../api/get-dashboard-graph-classification';

export const DashboardClassificationChart = () => {
  const { data, isLoading, isError } =
    useGetDashboardGraphClassification();

  const [rang, setRang] = useState<[number, number]>([
    0, 10,
  ]);

  useEffect(() => {
    if (data) {
      setRang([0, data.length > 10 ? 10 : data.length]);
    }
  }, [data]);

  const colors = useMemo(() => {
    return _.map(data, () => utils.useRandomColor());
  }, [data]);

  const modifyData = useMemo(() => {
    return _.map(data, (v, index) => {
      return {
        indexKey: `${v?.name}#${index}`,
        [`${v?.name}#${index}`]: v?.activityCount,
        colors: colors[index],
      };
    }).slice(rang[0], rang[1]);
  }, [data, rang, colors]);

  const keys = useMemo(() => {
    return _.map(
      data,
      (v, index) => `${v?.name}#${index}`
    );
  }, [data]);

  const onZoomIn = () => {
    if (data && rang[0] < rang[1] - 10) {
      setRang([
        rang[0],
        rang[1] - 10 <= 10 ? 10 : rang[1] - 10,
      ]);
    }
  };

  const onZoomOut = () => {
    if (data) {
      setRang([
        rang[0],
        rang[1] + 10 < data.length
          ? rang[1] + 10
          : data.length,
      ]);
    }
  };
  const onChangeSlider = (value: [number, number]) => {
    setRang(value);
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.dashboard.classification" />
        }
        loading={isLoading}
        extra={
          <Flex
            justifyContent="end"
            alignItems="center"
            className={css`
              width: 400px;
              gap: 10px;
            `}
          >
            <Slider
              range={{ draggableTrack: true }}
              value={rang}
              max={data?.length}
              onChange={onChangeSlider}
              className="w-75 m-0"
            />
            <Flex>
              <PlusCircleOutlined
                className={css`
                  margin: 0 10px;
                  font-size: 20px;
                  color: ${rang[1] === 10 ||
                  rang[0] >= rang[1] - 10
                    ? '#C4C4C4'
                    : '#455560'};
                `}
                onClick={() =>
                  rang[1] === 10 ? null : onZoomIn()
                }
              />
              <MinusCircleOutlined
                className={css`
                  font-size: 20px;
                  color: ${rang[1] === data?.length
                    ? '#C4C4C4'
                    : '#455560'};
                `}
                onClick={() =>
                  rang[1] === data?.length
                    ? null
                    : onZoomOut()
                }
              />
            </Flex>
          </Flex>
        }
      >
        <div
          className={css`
            width: 100%;
            height: 300px;
            margin: auto !important;
          `}
        >
          <BarChart
            data={modifyData}
            keys={keys}
            indexBy="indexKey"
            colors={_.map(modifyData, (v) => v?.colors)}
            layout="horizontal"
            margin={{
              top: 0,
              right: 70,
              bottom: 50,
              left: 100,
            }}
          />
        </div>
        <Flex
          justifyContent={'center'}
          alignItems="center"
          className={css`
            overflow-x: auto;
            overflow-y: hidden;
            height: 40px !important;
            flex-wrap: nowrap;
          `}
        >
          {_.map(modifyData, (v) => {
            return (
              <div
                key={v.indexKey}
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
                    width: 18px;
                    height: 18px;
                    background: ${v?.colors};
                    margin: 0 5px;
                  `}
                />
                {v?.indexKey}
              </div>
            );
          })}
        </Flex>
      </Card>
    </FallbackError>
  );
};
