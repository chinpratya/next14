import { css } from '@emotion/css';
import { Card, Empty } from 'antd';
import _ from 'lodash';

import { BarChart } from '@/components/chart-components/bar-chart';
import utils from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetDsarDashboardRequestsBySubjectType } from '../../api/get-dsar-dashboard-requests-by-subject-type';

export const DashboardDsarRequestsBySubjectType = () => {
  const { data, isLoading, isError } =
    useGetDsarDashboardRequestsBySubjectType();
  const modifyData = _.map(data, (v) => {
    return {
      indexKey: v?.name ?? '',
      [v?.name]: v?.value,
      colors: utils.useRandomColor(),
    };
  });
  const keys = _.map(data, (v) => v?.name);
  return (
    <Card title="คำขอตามประเภทเรื่อง" loading={isLoading}>
      <FallbackError isError={isError}>
        {data && data?.length > 0 ? (
          <>
            <div
              className={css`
                width: 100%;
                height: 300px;
                margin: auto !important;
              `}
            >
              <BarChart
                data={modifyData ?? []}
                keys={keys}
                indexBy="indexKey"
                colors={_.map(
                  modifyData,
                  (v) => v?.colors
                )}
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
              className={css`
                overflow-x: auto;
                overflow-y: hidden;
                height: 40px !important;
                flex-wrap: nowrap;
              `}
              justifyContent="center"
              alignItems={'center'}
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
                      align-items: center;
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
          </>
        ) : (
          <Empty />
        )}
      </FallbackError>
    </Card>
  );
};
