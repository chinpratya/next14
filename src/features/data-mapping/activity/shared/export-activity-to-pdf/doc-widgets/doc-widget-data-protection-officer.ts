import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';

const columns = [
  {
    key: 'index',
    title: `${t(
      'dataMapping.activity.preview.dataCategory.index'
    )}`,
  },
  {
    key: 'purposeName',
    title: `${t(
      'dataMapping.activity.preview.dataCategory.purpose'
    )}`,
  },
  {
    key: 'dataClassification',
    title: `${t(
      'dataMapping.activity.preview.dataCategory.categoryClassification'
    )}`,
  },
  {
    key: 'dataElement',
    title: `${t(
      'dataMapping.activity.preview.dataCategory.dataElement'
    )}`,
  },
  {
    key: 'DataCategory',
    title: `${t(
      'dataMapping.activity.preview.dataCategory.dataCategory'
    )}`,
  },
  {
    key: 'dataSubject',
    title: `${t(
      'dataMapping.activity.preview.dataCategory.dataSubject'
    )}`,
  },
];

export const docWidgetDataProtectionOfficer = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  doc.text(
    `${t(
      'dataMapping.activity.preview.dataInfo.dataProtectionOfficer'
    )} : ไม่มี`,
    14,
    positionY === 0 ? 20 : positionY + 20
  );

  if (!data?.dataCategories?.length) {
    return null;
  }

  doc.text(
    `${t(
      'dataMapping.activity.preview.dataCategory.title'
    )}`,
    14,
    positionY === 0 ? 30 : positionY + 30
  );
  autoTable(doc, {
    styles: {
      font: 'Prompt-Medium',
      fontStyle: 'normal',
      fontSize: 10,
    },
    columnStyles: {
      0: {
        cellWidth: 12,
      },
      1: {
        cellWidth: 58,
      },
      3: {
        cellWidth: 79,
      },
    },
    startY: positionY === 0 ? 35 : positionY + 35,
    rowPageBreak: 'avoid',
    bodyStyles: { valign: 'top' },
    columns,
    body: data?.dataCategories.map((item, index) => ({
      index: index + 1,
      ...item,
      dataClassification:
        item.dataClassification.join(','),
      dataElement: item.dataElement.join(','),
      dataSubject: item.dataSubject.join(','),
    })),
  });
};
