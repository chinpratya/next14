import { Card, Descriptions } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataLifecycleCollect,
  DataLifecycleStorage,
  DataLifecycleTransfer,
} from '../../../../types';

export type BoardGeneralProps = {
  title: string | React.ReactNode;
  board:
    | DataLifecycleCollect
    | DataLifecycleStorage
    | DataLifecycleTransfer;
};

export const BoardGeneral = ({
  title,
  board,
}: BoardGeneralProps) => {
  return (
    <Card title={title}>
      <Descriptions
        labelStyle={{ fontWeight: 'bold' }}
        column={1}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.asset" />
          }
        >
          {board.name && board.name !== ''
            ? board.name
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.group" />
          }
        >
          {board.group && board.group !== ''
            ? board.group
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.country" />
          }
        >
          {board.country && board.country !== ''
            ? board.country
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.address" />
          }
        >
          {board.address && board.address !== ''
            ? board.address
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.owner" />
          }
        >
          {board.owner && board.owner !== ''
            ? board.owner
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.dataset" />
          }
          style={{
            display: !board?.dataset ? 'none' : 'block',
          }}
        >
          {board?.dataset && board.dataset !== ''
            ? board.dataset
            : '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
