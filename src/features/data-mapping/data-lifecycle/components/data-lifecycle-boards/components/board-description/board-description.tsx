import { Card, Descriptions } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataLifecycleRights,
  DataLifecycleDataDestruction,
} from '../../../../types';

export type BoardDescriptionProps = {
  title: string | React.ReactNode;
  board:
    | DataLifecycleRights
    | DataLifecycleDataDestruction;
};

export const BoardDescription = ({
  title,
  board,
}: BoardDescriptionProps) => {
  return (
    <Card title={title}>
      <Descriptions
        labelStyle={{ fontWeight: 'bold' }}
        column={1}
        layout="vertical"
      >
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.boardDescription.description" />
          }
        >
          {board.description && board.description !== ''
            ? board.description
            : '-'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
