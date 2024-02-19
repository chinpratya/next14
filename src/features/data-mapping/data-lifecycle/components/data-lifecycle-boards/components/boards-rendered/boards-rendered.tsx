import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataLifecycleCollect,
  DataLifecycleDataset,
  DataLifecycleStorage,
  DataLifecycleRights,
  DataLifecycleProcess,
  DataLifecycleTransfer,
  DataLifecycleDataDestruction,
} from '../../../../types';
import { BoardDataset } from '../board-dataset';
import { BoardDescription } from '../board-description';
import { BoardGeneral } from '../board-general';
import { BoardProcess } from '../board-process';
import { BoardTranfer } from '../board-tranfer';

export type BoardsRenderedProps = {
  type: string;
  boards?: Array<
    | DataLifecycleCollect
    | DataLifecycleDataset
    | DataLifecycleStorage
    | DataLifecycleRights
    | DataLifecycleProcess
    | DataLifecycleTransfer
    | DataLifecycleDataDestruction
  >;
};

export const BoardsRendered = ({
  type,
  boards,
}: BoardsRenderedProps) => {
  return (
    <div>
      {boards?.map((board) => {
        switch (type) {
          case 'collect':
            return (
              <BoardGeneral
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.collect" />
                }
                board={board as DataLifecycleCollect}
              />
            );
          case 'dataset':
            return (
              <BoardDataset
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.dataset" />
                }
                board={board as DataLifecycleDataset}
              />
            );
          case 'rights':
            return (
              <BoardDescription
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.rights" />
                }
                board={board as DataLifecycleRights}
              />
            );
          case 'storage':
            return (
              <BoardGeneral
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.storage" />
                }
                board={board as DataLifecycleStorage}
              />
            );
          case 'process':
            return (
              <BoardProcess
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.process" />
                }
                board={board as DataLifecycleProcess}
              />
            );
          case 'tranfer':
            return (
              <BoardTranfer
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.transfer" />
                }
                board={board as DataLifecycleTransfer}
              />
            );
          case 'dataDestruction':
            return (
              <BoardDescription
                key={board.ObjectUUID}
                title={
                  <IntlMessage id="dataMapping.dataLifecycle.detail.dataDestruction" />
                }
                board={
                  board as DataLifecycleDataDestruction
                }
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
