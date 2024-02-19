import { Droppable } from '@hello-pangea/dnd';

import { usePolicyBuilderStore } from '@/stores/policy-builder';
import { DragField } from '@utilComponents/dnd';

export const Header = () => {
  const { policySections, onToggleHidePolicySection } =
    usePolicyBuilderStore();

  return (
    <Droppable droppableId="policy-form-fields">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {policySections.map((policySection, index) => {
            const isDisabled =
              !policySection.hide as boolean;

            return (
              <DragField
                draggableId={`${policySection.key}|drop2`}
                index={index}
                label={policySection.name as string}
                key={policySection.key as string}
                isDragDisabled={isDisabled}
                isAddDisabled={!policySection.hide}
                onAdd={() =>
                  onToggleHidePolicySection(
                    policySection.key
                  )
                }
                isDeleteDisabled={policySection.hide}
                onDelete={() =>
                  onToggleHidePolicySection(
                    policySection.key
                  )
                }
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
