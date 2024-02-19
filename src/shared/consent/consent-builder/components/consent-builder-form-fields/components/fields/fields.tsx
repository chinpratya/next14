import { Droppable } from '@hello-pangea/dnd';

import { useConsentBuilderStore } from '@/stores/consent-builder';
import { DragField } from '@utilComponents/dnd';

export const fields = [
  {
    name: 'ป้อนข้อมูล',
    widget: 'input',
  },
  {
    name: 'ช่องทำเครื่องหมาย',
    widget: 'checkbox',
  },
  {
    name: 'สวิตซ์',
    widget: 'switch',
  },
  {
    name: 'ตัวเลือก',
    widget: 'select',
  },
  {
    name: 'กลุ่มช่องทำเครื่องหมายหลายอัน',
    widget: 'checkbox-group',
  },
  {
    name: 'กลุ่มช่องทำเครื่องหมายอันเดียว',
    widget: 'radio-group',
  },
  {
    name: 'ข้อความ',
    widget: 'textarea',
  },
  {
    name: 'ตัวเลข',
    widget: 'number',
  },
  {
    name: 'อัพโหลด',
    widget: 'uploads',
  },
];

export const Fields = () => {
  const { currentSectionId, onAddField } =
    useConsentBuilderStore();

  const actionAvailable = currentSectionId !== '';

  return (
    <Droppable
      droppableId="fields"
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
          {fields?.map((field, index) => (
            <DragField
              draggableId={field.widget}
              index={index}
              label={field.name}
              key={field.widget}
              onAdd={
                actionAvailable
                  ? () => onAddField(field.widget)
                  : undefined
              }
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
