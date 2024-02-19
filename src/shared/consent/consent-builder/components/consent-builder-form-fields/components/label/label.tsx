import { Droppable } from '@hello-pangea/dnd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { DragField } from '@utilComponents/dnd';

export const Label = () => {
  const { onAddLabel, currentSectionId } =
    useConsentBuilderStore();

  return (
    <Droppable
      droppableId="label"
      type="field"
      direction="vertical"
      isDropDisabled
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DragField
            draggableId="label"
            index={0}
            label="Label"
            key="label"
            onAdd={() => onAddLabel()}
            isAddDisabled={!currentSectionId}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
