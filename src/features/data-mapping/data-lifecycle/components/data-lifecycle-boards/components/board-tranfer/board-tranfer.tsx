import { Card, Descriptions } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { DataLifecycleTransfer } from '../../../../types';

export type BoardTranferProps = {
  title: string | React.ReactNode;
  board: DataLifecycleTransfer;
};

export const BoardTranfer = ({
  title,
  board,
}: BoardTranferProps) => {
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
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.email" />
          }
          style={{
            display: !board?.email ? 'none' : 'block',
          }}
        >
          {board?.email && board.email !== ''
            ? board.email
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.phone" />
          }
          style={{
            display: !board?.phone ? 'none' : 'block',
          }}
        >
          {board?.phone && board.phone !== ''
            ? board.phone
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.url" />
          }
          style={{
            display: !board?.url ? 'none' : 'block',
          }}
        >
          {board?.url && board.url !== '' ? (
            <a href={board.url} target={'_blank'}>
              {board.url}
            </a>
          ) : (
            '-'
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.personalType" />
          }
          style={{
            display: !board?.personalType
              ? 'none'
              : 'block',
          }}
        >
          {board?.personalType &&
          board.personalType !== ''
            ? board.personalType
            : '-'}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardGeneral.organization" />
          }
          style={{
            display: !board?.organization
              ? 'none'
              : 'block',
          }}
        >
          {board?.organization &&
          board.organization !== ''
            ? board.organization
            : '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
