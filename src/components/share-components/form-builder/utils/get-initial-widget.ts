import { v4 as uuid } from 'uuid';

const initialWidget = [
  {
    widget: 'input',
    widgetProps: {},
    label: 'ป้อนข้อมูล',
  },
  {
    widget: 'select',
    label: 'ตัวเลือก',
  },
  {
    widget: 'switch',
    label: 'สวิตซ์',
  },
  {
    widget: 'checkbox',
    label: 'ช่องทำเครื่องหมาย',
  },
  {
    widget: 'checkbox-group',
    widgetProps: {
      options: ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2'],
    },
    label: 'กลุ่มช่องทำเครื่องหมายหลายอัน',
  },
  {
    widget: 'radio-group',
    widgetProps: {
      options: ['ตัวเลือกที่ 1', 'ตัวเลือกที่ 2'],
    },
    label: 'กลุ่มช่องทำเครื่องหมายอันเดียว',
  },
  {
    widget: 'textarea',
    label: 'กรอกข้อมูล',
  },
  {
    widget: 'number',
    label: 'ตัวเลข',
  },
  {
    widget: 'date-picker',
    label: 'วันที่',
  },
  {
    widget: 'uploads',
    label: 'อัปโหลดไฟล์',
    widgetProps: {
      uploadStyle: 'button',
    },
  },
];

export const getInitialWidget = (widget: string) => {
  const widgetObj = initialWidget.find(
    (item) => item.widget === widget
  );

  if (widgetObj) {
    return {
      ...widgetObj,
      name: uuid(),
      type: 'field',
    };
  }

  return undefined;
};
