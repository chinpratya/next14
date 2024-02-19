import { Droppable } from '@hello-pangea/dnd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { DragField } from '@utilComponents/dnd';

export const Identifier = () => {
  const {
    listIdentifiers,
    usedIdentifierIds,
    currentSectionId,
    onAddIdentifier,
    onDeleteComponent,
  } = useConsentBuilderStore();

  return (
    <Droppable
      droppableId="identifier"
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
          {listIdentifiers?.map((field, index) => (
            <DragField
              draggableId={field?.name as string}
              index={index}
              label={field?.label as string}
              key={field?.name as string}
              onAdd={() =>
                onAddIdentifier(field?.name as string)
              }
              isAddDisabled={
                usedIdentifierIds.includes(
                  field?.name as string
                ) || !currentSectionId
              }
              isDeleteDisabled={
                !usedIdentifierIds.includes(
                  field?.name as string
                )
              }
              isDragDisabled={usedIdentifierIds.includes(
                field?.name as string
              )}
              onDelete={() =>
                onDeleteComponent(field?.name as string)
              }
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
