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
      'dataMapping.activity.preview.purpose.index'
    )}`,
  },
  {
    key: 'name',
    title: `${t(
      'dataMapping.activity.preview.purpose.name'
    )}`,
  },
  {
    key: 'dataRetentionPeriod',
    title: `${t(
      'dataMapping.activity.preview.purpose.time'
    )}`,
  },
  {
    key: 'DataUsingPeriod',
    title: `${t(
      'dataMapping.activity.preview.purpose.DataUsingPeriod'
    )}`,
  },

  {
    key: 'legalBasis',
    title: `${t(
      'dataMapping.activity.preview.purpose.legalBasis'
    )}`,
  },
  {
    key: 'dataRetention',
    title: `${t(
      'dataMapping.activity.preview.purpose.dataRetention'
    )}`,
  },
  {
    key: 'isConsent',
    title: `${t(
      'dataMapping.activity.preview.purpose.consent.isConsent'
    )}`,
  },
  {
    key: 'isTransfer',
    title: `${t(
      'dataMapping.activity.preview.purpose.transfer'
    )}`,
  },
];

export const docWidgetPurposes = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  if (!data?.purposes?.length) return null;

  doc.text(
    `${t('dataMapping.activity.preview.purpose.title')}`,
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
    columnStyles: {
      0: {
        cellWidth: 15,
      },
      1: {
        minCellWidth: 40,
      },
      2: {
        minCellWidth: 40,
      },
      3: {
        minCellWidth: 28,
      },
      4: {
        minCellWidth: 28,
      },
      6: {
        minCellHeight: IMAGE_SIZE * 1.5,
      },
      7: {
        minCellHeight: IMAGE_SIZE * 1.5,
      },
    },
    didDrawCell: (cellData) => {
      const rowIndex = cellData.row.index;
      const currentItem = data?.purposes?.[rowIndex];

      if (
        (cellData.column.index === 6 ||
          cellData.column.index === 7) &&
        cellData.cell.section === 'body'
      ) {
        const isSuccess =
          cellData.column.index === 7
            ? currentItem?.isTransfer
            : currentItem?.consent.isConsent;

        const imageX =
          cellData.cell.x +
          (cellData.cell.width - IMAGE_SIZE) / 2;
        const imageY =
          cellData.cell.y +
          (cellData.cell.height - IMAGE_SIZE) / 2;

        doc.addImage(
          isSuccess ? SuccessIcon : FailedIcon,
          imageX,
          imageY,
          IMAGE_SIZE,
          IMAGE_SIZE
        );
      }
    },
    columns: columns,
    body: data?.purposes.map((item, index) => {
      const {
        DataRetentionPeriod,
        DataUsingPeriod,
        consent,
        ...rest
      } = item;

      const {
        day = 0,
        month = 0,
        year = 0,
        description = '',
      } = DataRetentionPeriod;

      const {
        day: DataUsingDay = 0,
        month: DataUsingMonth = 0,
        year: DataUsingYear = 0,
        description: DataUsingdescription = '',
      } = DataUsingPeriod;

      return {
        ...rest,
        index: index + 1,
        name: item.name,
        dataRetentionPeriod:
          day < 1 && month < 1 && year < 1
            ? description !== ''
              ? description
              : '-'
            : `${day > 0 ? `${day}วัน` : ''} ${
                month > 0 ? `${month}เดือน` : ''
              }  ${year > 0 ? `${year}ปี` : ''}`,
        DataUsingPeriod:
          DataUsingDay < 1 &&
          DataUsingMonth < 1 &&
          DataUsingYear < 1
            ? DataUsingdescription !== ''
              ? DataUsingdescription
              : '-'
            : `${
                DataUsingDay > 0
                  ? `${DataUsingDay}วัน`
                  : ''
              } ${
                DataUsingMonth > 0
                  ? `${DataUsingMonth}เดือน`
                  : ''
              }  ${
                DataUsingYear > 0
                  ? `${DataUsingYear}ปี`
                  : ''
              }`,
        isTransfer: '',
        dataRetention: !!item.dataRetention
          ? item.dataRetention
          : '-',
        exception: !!consent.exception
          ? consent.exception
          : '-',
      };
    }),
  });
};
