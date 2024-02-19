import { Droppable } from '@hello-pangea/dnd';
import { Empty, Skeleton } from 'antd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { DragField } from '@utilComponents/dnd';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetConsentBuilderPurposes } from '../../../../api/get-consent-builder-purposes';

export const Purposes = () => {
  const {
    storeId,
    currentSectionId,
    usedPurposeIds,
    onAddPurpose,
    onDeleteComponent,
  } = useConsentBuilderStore();

  const { data, isLoading, isError } =
    useGetConsentBuilderPurposes({
      collectionPointId: storeId ?? '',
    });

  return (
    <FallbackError isError={isError}>
      <>
        {isLoading ? <Skeleton active /> : null}
        <Droppable
          droppableId="purposes"
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
              {!data?.length && !isLoading ? (
                <Empty description="No purposes found" />
              ) : null}
              {data?.map((field, index) => (
                <DragField
                  draggableId={field.purposeID}
                  index={index}
                  label={field.name}
                  key={field.purposeID}
                  isDragDisabled={usedPurposeIds.includes(
                    field.purposeID
                  )}
                  isAddDisabled={
                    usedPurposeIds.includes(
                      field.purposeID
                    ) || !currentSectionId
                  }
                  onAdd={() =>
                    onAddPurpose(field.purposeID)
                  }
                  isDeleteDisabled={
                    !usedPurposeIds.includes(
                      field.purposeID
                    )
                  }
                  onDelete={() =>
                    onDeleteComponent(field.purposeID)
                  }
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </>
    </FallbackError>
  );
};
