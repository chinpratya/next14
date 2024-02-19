import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { ReactNode } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDetailOfDataLifecycle } from '../../api/get-detail-of-data-lifecycle';

import {
  BoardWrapper,
  BoardsRendered,
} from './components';

export type DataLifecycleBoardsProps = {
  dataLifecycleId: string;
};

const boardLabels = [
  {
    key: 'collect',
    label: (
      <IntlMessage id="dataMapping.dataLifecycle.detail.collect" />
    ),
  },
  {
    key: 'dataset',
    label: (
      <IntlMessage id="dataMapping.dataLifecycle.detail.dataset" />
    ),
  },
  {
    key: 'process',
    label: (
      <IntlMessage id="dataMapping.dataLifecycle.detail.process" />
    ),
  },
  {
    key: 'storage',
    label: (
      <IntlMessage id="dataMapping.dataLifecycle.detail.storage" />
    ),
  },
  {
    key: 'tranfer',
    label: (
      <IntlMessage id="dataMapping.dataLifecycle.detail.transfer" />
    ),
  },
  {
    key: 'dataDestruction',
    label: (
      <IntlMessage id="dataMapping.dataLifecycle.detail.dataDestruction" />
    ),
  },
] as Array<{
  key: keyof ReturnType<
    typeof useGetDetailOfDataLifecycle
  >['data'];
  label: string | ReactNode;
}>;

export const DataLifecycleBoards = ({
  dataLifecycleId,
}: DataLifecycleBoardsProps) => {
  const { data, isLoading, isError } =
    useGetDetailOfDataLifecycle({
      dataLifecycleId,
    });

  return (
    <FallbackError isError={isError}>
      <Flex
        justify="start"
        align="start"
        gap={12}
        className={css`
          margin-top: 12px;
          overflow-x: auto;

          .board-parent {
            min-width: 450px;
            background-color: #f0f0f0;
          }
        `}
      >
        {boardLabels.map((boardLabel) => {
          const boardData = data?.[boardLabel.key];

          if (!boardData && !isLoading) {
            return null;
          }

          return (
            <BoardWrapper
              key={boardLabel.key}
              className="board-parent"
              title={boardLabel.label}
              loading={isLoading}
            >
              <BoardsRendered
                type={boardLabel.key}
                boards={boardData}
              />
            </BoardWrapper>
          );
        })}
      </Flex>
    </FallbackError>
  );
};
