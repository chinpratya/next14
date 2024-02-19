import { Card, Descriptions } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { DataLifecycleProcess } from '../../../../types';

export type BoardProcessProps = {
  title: string | React.ReactNode;
  board: DataLifecycleProcess;
};

export const BoardProcess = ({
  title,
  board,
}: BoardProcessProps) => {
  return (
    <Card title={title}>
      <Descriptions
        labelStyle={{ fontWeight: 'bold' }}
        column={1}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardProcess.purpose" />
          }
        >
          {board.name && board.name !== ''
            ? board.name
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardProcess.group" />
          }
        >
          {board.group && board.group !== ''
            ? board.group
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardProcess.legalBasis" />
          }
        >
          {board.legalBasis && board.legalBasis !== ''
            ? board.legalBasis
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardProcess.dataUsagePeriod" />
          }
        >
          {board?.dataUsagePeriod?.day > 0
            ? `${board?.dataUsagePeriod?.day} วัน `
            : null}
          {board?.dataUsagePeriod?.month > 0
            ? `${board?.dataUsagePeriod?.month} เดือน `
            : null}
          {board?.dataUsagePeriod?.year > 0
            ? `${board?.dataUsagePeriod?.year} ปี `
            : null}
          {board?.dataUsagePeriod?.day === 0 &&
          board?.dataUsagePeriod?.month === 0 &&
          board?.dataUsagePeriod?.year === 0
            ? board?.dataUsagePeriod?.description
            : null}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
