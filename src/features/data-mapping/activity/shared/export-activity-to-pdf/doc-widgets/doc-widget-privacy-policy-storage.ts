import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';

const columns = [
  {
    key: 'index',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.storage.index'
    )}`,
  },
  {
    key: 'name',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.storage.name'
    )}`,
  },
  {
    key: 'storagesType',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.storageType.name'
    )}`,
  },
];

export const docWidgetPrivacyPolicyStorage = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  doc.text(
    `${t(
      'dataMapping.activity.preview.privacyPolicy.storage.title'
    )}`,
    14,
    positionY === 0 ? 30 : positionY + 40
  );
  autoTable(doc, {
    styles: {
      font: 'Prompt-Medium',
      fontStyle: 'normal',
    },
    startY: positionY === 0 ? 35 : positionY + 45,
    columns: columns,
    body: data?.privacyPolicy.storage.map(
      (item, index) => ({
        ...item,
        index: index + 1,
        storagesType: data?.privacyPolicy?.storageType
          ?.map((storageType) => storageType.name)
          .join(', '),
      })
    ),
    didParseCell: (cellData) => {
      if (
        cellData.section === 'body' &&
        cellData.row.index === 0
      ) {
        if (cellData.column.index === 2) {
          cellData.cell.rowSpan =
            data?.privacyPolicy.storage.length;
          cellData.cell.styles.valign = 'middle';
        }
      }
    },
    rowPageBreak: 'avoid',
    bodyStyles: { valign: 'top' },
  });
};
