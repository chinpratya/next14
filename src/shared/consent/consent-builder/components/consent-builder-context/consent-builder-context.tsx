import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { ReactNode } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { FormItemWidget } from '@/types';

import { ConsentBuilderActivityTypeSetting } from '../consent-builder-activity-type-setting';
import { ConsentBuilderFormFieldSetting } from '../consent-builder-form-field-setting';
import { ConsentBuilderLabelSetting } from '../consent-builder-label-setting';
import { ConsentBuilderPurposeSetting } from '../consent-builder-purpose-setting';
import { ConsentBuilderRequestTypeDsarSetting } from '../consent-builder-request-type-dsar-setting';
import { ConsentBuilderRequestTypeSetting } from '../consent-builder-request-type-setting';
import { ConsentBuilderSectionSetting } from '../consent-builder-section-setting';

export type DndConsentContextProps = {
  children: ReactNode;
};

export const ConsentBuilderContext = ({
  children,
}: DndConsentContextProps) => {
  const {
    onDropField,
    onMoveComponent,
    onDropPurpose,
    onDropActivity,
    onDropLabel,
    onDropIdentifier,
  } = useConsentBuilderStore();

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      !result.source ||
      !result.draggableId
    ) {
      return;
    }

    if (
      result.source.droppableId ===
        result.destination.droppableId ||
      (result.source.droppableId !== 'fields' &&
        result.source.droppableId !== 'purposes' &&
        result.source.droppableId !== 'activities' &&
        result.source.droppableId !== 'label' &&
        result.source.droppableId !== 'identifier')
    ) {
      onMoveComponent(
        result.source.droppableId,
        result.source.index,
        result.destination.droppableId,
        result.destination.index
      );
      return;
    }

    if (
      result.source.droppableId === 'label' &&
      result.reason === 'DROP'
    ) {
      onDropLabel(
        result.destination.droppableId,
        result.destination.index
      );
      return;
    }

    if (
      result.source.droppableId === 'activities' &&
      result.reason === 'DROP'
    ) {
      onDropActivity(
        result.destination.droppableId,
        result.draggableId,
        result.destination.index
      );
      return;
    }

    if (
      result.source.droppableId === 'purposes' &&
      result.reason === 'DROP'
    ) {
      onDropPurpose(
        result.destination.droppableId,
        result.draggableId,
        result.destination.index
      );
      return;
    }

    if (
      result.source.droppableId === 'fields' &&
      result.reason === 'DROP'
    ) {
      onDropField(
        result.destination.droppableId,
        result.draggableId as FormItemWidget,
        result.destination.index
      );
    }

    if (
      result.source.droppableId === 'identifier' &&
      result.reason === 'DROP'
    ) {
      onDropIdentifier(
        result.destination.droppableId,
        result.draggableId as FormItemWidget,
        result.destination.index
      );
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {children}
      </DragDropContext>
      <ConsentBuilderFormFieldSetting />
      <ConsentBuilderRequestTypeDsarSetting />
      <ConsentBuilderRequestTypeSetting />
      <ConsentBuilderLabelSetting />
      <ConsentBuilderPurposeSetting />
      <ConsentBuilderSectionSetting />
      <ConsentBuilderActivityTypeSetting />
    </>
  );
};
