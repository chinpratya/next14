import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';
import { IMAGE_SIZE } from '../constant';
import { SuccessIcon, FailedIcon } from '../icon';

const columns = [
  {
    key: 'index',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.rightsOfPersonalData.index'
    )}`,
  },
  {
    key: 'name',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.rightsOfPersonalData.name'
    )}`,
  },
  {
    key: 'isGrant',
    title: ``,
  },
];

export const docWidgetRightsOfPersonalData = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  if (!data.privacyPolicy.rightsOfPersonalData.length)
    return null;

  doc.text(
    `${t(
      'dataMapping.activity.preview.privacyPolicy.rightsOfPersonalData.title'
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
    columns,
    body: data?.privacyPolicy.rightsOfPersonalData.map(
      ({ name }, index) => ({
        name: !!name ? name : '-',
        index: index + 1,
        isGrant: '',
      })
    ),
    columnStyles: {
      2: {
        cellWidth: 15,
        minCellHeight: IMAGE_SIZE * 1.5,
      },
    },
    didDrawCell: (dataCell) => {
      if (
        dataCell.column.index === 2 &&
        dataCell.cell.section === 'body'
      ) {
        const rowIndex = dataCell.row.index;
        const currentItem =
          data?.privacyPolicy.rightsOfPersonalData?.[
            rowIndex
          ];
        const icon = currentItem?.isGrant
          ? SuccessIcon
          : FailedIcon;

        const imageX =
          dataCell.cell.x +
          (dataCell.cell.width - IMAGE_SIZE) / 2;
        const imageY =
          dataCell.cell.y +
          (dataCell.cell.height - IMAGE_SIZE) / 2;

        doc.addImage(
          icon,
          imageX,
          imageY,
          IMAGE_SIZE,
          IMAGE_SIZE
        );
      }
    },
  });
};
