import { css } from '@emotion/css';
import { Card, Empty } from 'antd';
import _ from 'lodash';

import { BarChart } from '@/components/chart-components/bar-chart';
import utils from '@/utils';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { PolicyDashboardStatus } from '../../types';

type DashboardStatusPolicyProps = {
  data?: PolicyDashboardStatus[];
};

export const DashboardStatusPolicy = ({
  data,
}: DashboardStatusPolicyProps) => {
  const modifyData = _.map(data, (v) => {
    return {
      indexKey: v?.label,
      [v?.label]: v?.value,
      colors: utils.useRandomColor(),
    };
  });

  const keys = _.map(data, (v) => v?.label);

  return (
    <Card
      title={
        <IntlMessage id="policyManagement.dashboard.policyStatus" />
      }
    >
      {data && data.length > 0 ? (
        <>
          <div
            className={css`
              width: 100%;
              height: 260px;
              margin: auto !important;
            `}
          >
            <BarChart
              data={modifyData}
              keys={keys}
              indexBy="indexKey"
              colors={_.map(modifyData, (v) => v?.colors)}
              layout="vertical"
              margin={{
                top: 10,
                right: 70,
                bottom: 50,
                left: 50,
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
        </>
      ) : (
        <Empty />
      )}
    </Card>
  );
};
