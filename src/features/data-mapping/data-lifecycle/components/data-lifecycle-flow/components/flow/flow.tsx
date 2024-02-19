import { useElementSize } from '@mantine/hooks';
import { useMemo } from 'react';
import ReactFlow, { NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';

import { DataLifecycleFlowType } from '../../../../types';
import { Edge } from '../edge';
import { Node } from '../node';

import { useFlow } from './use-flow';

export type FlowProps = {
  columns?: string[];
  flow?: DataLifecycleFlowType;
};

const NODE_WIDTH = 185;

export const Flow = ({
  columns = [],
  flow,
}: FlowProps) => {
  const { ref, width } = useElementSize();

  const { nodes, edges, maxNode, maxRows } = useFlow({
    columns,
    flow,
    width,
  });

  const nodeTypes = useMemo(
    (): NodeTypes => ({ custom: Node }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      lineArrow: Edge,
    }),
    []
  );

  return (
    <div
      ref={ref}
      style={{
        minHeight: maxNode * NODE_WIDTH,
        height: 'calc(100vh - 345px)',
        minWidth: maxRows * 150 + 40,
        width: '100%',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        elementsSelectable={false}
        panOnDrag={false}
      />
    </div>
  );
};
