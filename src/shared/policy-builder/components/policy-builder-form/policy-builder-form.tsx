import { Draggable } from '@hello-pangea/dnd';

import { usePolicyBuilderStore } from '@/stores/policy-builder';

import { PolicyBuilderFormItem } from './components/policy-builder-form-item';

export const PolicyBuilderForm = () => {
  const { policySections } = usePolicyBuilderStore();

  return (
    <>
      {policySections
        ?.filter((policySection) => !policySection?.hide)
        ?.map((policySection, index) => (
          <Draggable
            key={`${policySection?.key}` as string}
            draggableId={
              `${policySection?.key}|drop1` as string
            }
            index={index}
            isDragDisabled={true}
          >
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <PolicyBuilderFormItem
                    policySection={policySection}
                    index={index}
                  />
                </div>
              );
            }}
          </Draggable>
        ))}
    </>
  );
};
