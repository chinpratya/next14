import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';

const columns = [
  {
    key: 'index',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.purpose.index'
    )}`,
  },
  {
    key: 'name',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.purpose.name'
    )}`,
  },
  {
    key: 'destroy',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.remove.name'
    )}`,
  },
];

export const docWidgetPrivacyPolicyDataRetentionMethod = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  if (!data?.privacyPolicy?.dataRetentionMethod?.length)
    return null;

  doc.text(
    `${t(
      'dataMapping.activity.preview.privacyPolicy.purpose.title'
    )}`,
    14,
    positionY === 0 ? 20 : positionY + 30
  );
  autoTable(doc, {
    styles: {
      font: 'Prompt-Medium',
      fontStyle: 'normal',
      fontSize: 10,
    },
    startY: positionY === 0 ? 25 : positionY + 35,
    rowPageBreak: 'avoid',
    bodyStyles: { valign: 'top' },
    columns: columns,
    body: data?.privacyPolicy.dataRetentionMethod.map(
      (item, index) => ({
        ...item,
        index: index + 1,
        destroy: data?.privacyPolicy?.removeOrDelete
          ?.map((destroy) => destroy.name)
          ?.join(', '),
      })
    ),
    didParseCell: (cellData) => {
      if (
        cellData.section === 'body' &&
        cellData.row.index === 0
      ) {
        if (cellData.column.index === 2) {
          cellData.cell.rowSpan =
            data?.privacyPolicy.dataRetentionMethod.length;
          cellData.cell.styles.valign = 'middle';
        }
      }
    },
  });
};
