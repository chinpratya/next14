import { Droppable } from '@hello-pangea/dnd';
import { Empty, Skeleton } from 'antd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { DragField } from '@utilComponents/dnd';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetConsentBuilderActivities } from '../../../../api/get-consent-builder-activities';

export const Activities = () => {
  const {
    storeId,
    currentSectionId,
    usedActivityIds,
    onAddActivity,
    onDeleteComponent,
  } = useConsentBuilderStore();

  const { data, isLoading, isError } =
    useGetConsentBuilderActivities({
      preferenceId: storeId ?? '',
    });

  return (
    <FallbackError isError={isError}>
      <>
        {isLoading ? <Skeleton active /> : null}
        <Droppable
          droppableId="activities"
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
                <Empty description="No activities found" />
              ) : null}
              {data?.map((field, index) => (
                <DragField
                  draggableId={field.activityID}
                  index={index}
                  label={field.activity}
                  key={field.activityID}
                  isDragDisabled={usedActivityIds.includes(
                    field.activityID
                  )}
                  onAdd={() =>
                    onAddActivity(field.activityID)
                  }
                  isAddDisabled={
                    usedActivityIds.includes(
                      field.activityID
                    ) || !currentSectionId
                  }
                  onDelete={() =>
                    onDeleteComponent(field.activityID)
                  }
                  isDeleteDisabled={
                    !usedActivityIds.includes(
                      field.activityID
                    )
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
