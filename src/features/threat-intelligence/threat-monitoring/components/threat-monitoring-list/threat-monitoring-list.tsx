import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Checkbox } from 'antd';

import data from './mock-data.json';

type ThreatMonitoringListProps = {
  menu: string;
};

export const ThreatMonitoringList = ({
  menu,
}: ThreatMonitoringListProps) => {
  const options =
    data[menu as 'microsoftWindows' | 'linux' | 'unix'];

  return (
    <Flex direction="column" className="px-4">
      <Checkbox.Group
        className={css`
          display: flex;
          flex-direction: column;

          .ant-checkbox-group-item {
            width: 100%;
            padding: 16px 0;
            gap: 14px;
            border-bottom: 1px solid #e6ebf1;
          }
        `}
        options={options}
      />
    </Flex>
  );
};
