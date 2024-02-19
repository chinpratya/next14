import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';

const columns = [
  {
    key: 'index',
    title: `${t(
      'dataMapping.activity.preview.transfer.index'
    )}`,
  },
  {
    key: 'purpose',
    title: `${t(
      'dataMapping.activity.preview.transfer.purpose'
    )}`,
  },
  {
    key: 'position',
    title: `${t(
      'dataMapping.activity.preview.transfer.position'
    )}`,
  },
  {
    key: 'country',
    title: `${t(
      'dataMapping.activity.preview.transfer.country'
    )}`,
  },
  {
    key: 'isCompanyGroup',
    title: `${t(
      'dataMapping.activity.preview.transfer.isCompanyGroup'
    )}`,
  },
  {
    key: 'destCountry',
    title: `${t(
      'dataMapping.activity.preview.transfer.destCountry'
    )}`,
  },
  {
    key: 'destName',
    title: `${t(
      'dataMapping.activity.preview.transfer.destName'
    )}`,
  },
  {
    key: 'tranferMethod',
    title: `${t(
      'dataMapping.activity.preview.transfer.transferMethod'
    )}`,
  },
  {
    key: 'personalDataProtectionMeasures',
    title: `${t(
      'dataMapping.activity.preview.transfer.personalDataProtectionMeasures'
    )}`,
  },
];

export const docWidgetTransferData = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  doc.text(
    `${t(
      'dataMapping.activity.preview.transfer.title'
    )} : ${data?.isTranfer ? 'มี' : 'ไม่มี'}`,
    14,
    data?.isTranfer === true
      ? positionY === 0
        ? 20
        : positionY + 30
      : positionY === 0
      ? 20
      : positionY + 20
  );
  data?.isTranfer === true &&
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
      body: data?.tranferData.map((item, index) => ({
        ...item,
        index: index + 1,
        purpose: !!item.purpose ? item.purpose : '-',
        position: !!item.position ? item.position : '-',
        country: !!item.country ? item.country : '-',
        destCountry: !!item.destCountry
          ? item.destCountry
          : '-',
        destName: !!item.destName ? item.destName : '-',
        tranferMethod: !!item.tranferMethod
          ? item.tranferMethod
          : '-',
        personalDataProtectionMeasures:
          !!item.personalDataProtectionMeasures
            ? item.personalDataProtectionMeasures
            : '-',
        isCompanyGroup: item.isCompanyGroup
          ? 'ใช่'
          : 'ไม่ใช่',
      })),
    });
};
