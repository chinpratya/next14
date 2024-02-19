import { css } from '@emotion/css';
import { Card, Empty } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { BarChart } from '@/components/chart-components/bar-chart';
import utils from '@/utils';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetDsarDashboardTypeOfRequest } from '../../api/get-dsar-dashboard-type-of-request';

export type DashboardDsarTypeOfRequestsProps = {
  duration?: string;
};

export const DashboardDsarTypeOfRequests = ({
  duration,
}: DashboardDsarTypeOfRequestsProps) => {
  const router = useRouter();

  const { data, isLoading, isError } =
    useGetDsarDashboardTypeOfRequest({
      duration,
    });

  const modifyData = _.map(data, (v) => {
    return {
      indexKey: v?.key,
      [v?.key]: v?.value,
      colors: utils.useRandomColor(),
    };
  });

  const onViewRequestType = (type: string[]) =>
    router.push(
      `/apps/datafence/dsar-automation/request?typeOfRequest=${type}`,
      undefined,
      {
        shallow: true,
      }
    );

  const keys = _.map(data, (v) => v?.key);

  return (
    <Card title="ประเภทคำขอ" loading={isLoading}>
      <FallbackError isError={isError}>
        {data && data.length ? (
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
                    onClick={() =>
                      onViewRequestType([v?.indexKey])
                    }
                    key={v.indexKey}
                    className={css`
                      margin: 0 10px;
                      height: 40px;
                      display: flex !important;
                      flex-direction: row !important;
                      align-items: center;
                      white-space: nowrap;
                      cursor: pointer;
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
