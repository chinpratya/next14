import { css } from '@emotion/css';
import { Tooltip, Typography } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';
import {
  Handle,
  Position,
  NodeProps,
  NodeToolbar,
} from 'reactflow';

import { DataLifecycleFlowNodeType } from '../../../../types';
import {
  DataSubjectIcon,
  CollectIcon,
  DatasetIcon,
  StorageIcon,
  RightsIcon,
  ProcessIcon,
  TransferIcon,
  DestroyIcon,
} from '../../icons';

const nodeIcons: Record<string, React.FunctionComponent> =
  {
    dataSubject: DataSubjectIcon,
    collect: CollectIcon,
    dataset: DatasetIcon,
    storage: StorageIcon,
    rights: RightsIcon,
    process: ProcessIcon,
    tranfer: TransferIcon,
    destroy: DestroyIcon,
  };

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const Node = ({
  id,
  data,
}: NodeProps<DataLifecycleFlowNodeType>) => {
  const { column, label } = data;

  const Icon = nodeIcons?.[column] ?? null;

  return (
    <div
      className={css`
        .react-flow__handle {
          background-color: #f5f5f5;
        }

        .react-flow__handle-right {
          right: 25px;
          top: 40%;
          background-color: #f5f5f5;
        }

        .react-flow__handle-left {
          left: 25px;
          top: 40%;
          background-color: #f5f5f5;
        }
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={id}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            pointer-events: none;

            .ant-typography {
              min-width: 150px;
              max-width: 150px;
              text-align: center;
            }
          `}
        >
          <div
            className={css`
              background-color: #f5f5f5;
              border-radius: 50%;
              width: 85px;
              height: 85px;
              display: flex;
              align-items: center;
              justify-content: center;

              svg {
                width: 50px;
                height: 50px;
              }
            `}
          >
            {Icon && <Icon />}
          </div>
          <Tooltip title={label}>
            <NodeToolbar
              isVisible
              position={Position.Bottom}
            >
              <Typography.Title
                level={5}
                style={{
                  maxWidth: 110,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography.Title>
            </NodeToolbar>
          </Tooltip>
        </div>
      </motion.div>
      <Handle
        type="source"
        position={Position.Right}
        id={id}
      />
    </div>
  );
};
