import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { ReactNode } from 'react';

import { usePolicyBuilderStore } from '@/stores/policy-builder';

export type DndPolicyContextProps = {
  children: ReactNode;
};

export const PolicyBuilderContext = ({
  children,
}: DndPolicyContextProps) => {
  const { onDropPolicySection } = usePolicyBuilderStore();
  const onDragEnd = (result: DropResult) => {
    if (
      result.destination?.droppableId ===
      'policy-form-fields'
    ) {
      return;
    }

    const draggableId = result.draggableId.split(
      '|'
    )[0] as string;
    if (!draggableId) return;

    onDropPolicySection(
      draggableId,
      result.destination?.index as number
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};
