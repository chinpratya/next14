import { css } from '@emotion/css';
import { Tree, TreeProps } from 'antd';

import { PRIMARY_COLOR } from '@/config/color';

export type BeautifulTreeProps = TreeProps;

export const BeautifulTree = ({
  ...treeProps
}: BeautifulTreeProps) => {
  return (
    <div
      className={css`
        width: 100%;

        .ant-tree {
          .ant-tree-treenode {
            padding: 12px 0;
            width: 100%;

            .ant-tree-title {
              margin-left: 8px;
            }
          }

          .ant-tree-treenode:hover {
            .ant-typography {
              color: ${PRIMARY_COLOR} !important;
            }

            background-color: rgba(
              62,
              121,
              247,
              0.1
            ) !important;
          }

          .ant-tree-treenode-selected {
            .ant-typography {
              color: ${PRIMARY_COLOR} !important;
            }

            background-color: rgba(
              62,
              121,
              247,
              0.1
            ) !important;
          }
        }

        .ant-tree-node-content-wrapper {
          width: 100%;
          display: flex;

          .ant-tree-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .ant-typography {
              max-width: 290px;
              text-overflow: ellipsis;
            }
          }
        }

        .ant-tree-node-content-wrapper-normal:hover {
          background-color: rgba(
            62,
            121,
            247,
            0
          ) !important;
        }

        .ant-tree-node-content-wrapper-normal
          .ant-tree-node-selected {
          background-color: rgba(
            62,
            121,
            247,
            0
          ) !important;
        }
      `}
    >
      <Tree showIcon {...treeProps} />
    </div>
  );
};
