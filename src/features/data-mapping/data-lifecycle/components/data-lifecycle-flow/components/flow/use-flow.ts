import { useEffect, useState } from 'react';
import { Edge, MarkerType, Node } from 'reactflow';

import { DataLifecycleFlowType } from '../../../../types';

const NODE_WIDTH = 85;

const edgeEntity = {
  type: 'lineArrow',
  markerEnd: {
    type: MarkerType.Arrow,
    width: 22,
    height: 22,
    color: '#000',
  },
} as Edge;

export type UseFlow = {
  columns?: string[];
  flow?: DataLifecycleFlowType;
  width?: number;
};

export const useFlow = ({
  columns = [],
  flow = {},
  width = 0,
}: UseFlow) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [maxNode, setMaxNode] = useState(0);
  const [maxRows, setMaxRows] = useState(0);

  useEffect(() => {
    const initialNode = [] as Node[];
    const initialEdges = [] as Edge[];
    let maxNode = 0;

    let initialX = 0;
    const columnWidth = Math.trunc(
      width / columns.length
    );

    setMaxRows(columns.length);

    initialX = columnWidth / 2 - NODE_WIDTH / 2;

    columns.forEach((column) => {
      const columnData = flow[column] || [];

      if (columnData.length > maxNode) {
        maxNode = columnData.length;
      }

      let initialY = 30;
      const columnNodes: Node[] = [];

      columnData.forEach((item, nodeIndex) => {
        const sources = initialNode.filter((node) =>
          node.data?.refObjectUUID?.includes(
            item.ObjectUUID
          )
        );

        const maxSource = sources.length
          ? Math.min(
              ...sources.map(
                (source) => source.position.y
              )
            )
          : 0;

        let y = initialY;
        initialY += 175;

        if (maxSource > y) {
          y = maxSource;
        }

        item.refObjectUUID.forEach((ref) => {
          initialEdges.push({
            ...edgeEntity,
            id: `${item.ObjectUUID}/${ref}`,
            source: item.ObjectUUID,
            target: ref,
          });
        });

        const node: Node = {
          id: item.ObjectUUID,
          type: 'custom',
          data: {
            label: item.name,
            nodeIndex,
            column,
            ...item,
          },
          position: {
            x: initialX,
            y,
          },
        };

        columnNodes.push(node);
      });

      initialNode.push(...columnNodes);
      initialX += columnWidth;
    });

    setMaxNode(maxNode);
    setNodes(initialNode);
    setEdges(initialEdges);
  }, [columns, flow, width]);

  return {
    nodes,
    edges,
    maxNode,
    maxRows,
  };
};
