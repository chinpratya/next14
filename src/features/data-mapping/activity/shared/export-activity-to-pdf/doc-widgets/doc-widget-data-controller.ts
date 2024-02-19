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
    key: 'name',
    title: `${t(
      'dataMapping.activity.preview.dataInfo.fullName'
    )}`,
  },
  {
    key: 'personalType',
    title: `${t(
      'dataMapping.activity.preview.dataInfo.personalType'
    )}`,
  },
  {
    key: 'address',
    title: `${t(
      'dataMapping.activity.preview.dataInfo.address'
    )}`,
  },
  {
    key: 'country',
    title: `${t(
      'dataMapping.activity.preview.dataInfo.country'
    )}`,
  },
  {
    key: 'phone',
    title: `${t(
      'dataMapping.activity.preview.dataInfo.tel'
    )}`,
  },
  {
    key: 'email',
    title: `${t(
      'dataMapping.activity.preview.dataInfo.email'
    )}`,
  },
];

export const docWidgetDataController = (
  data: ActivityPreview,
  doc: jsPDF
) => {
  if (!data?.dataController?.length) return null;

  doc.text(
    `${t('consentManagement.receipts.dataController')}`,
    14,
    50
  );

  autoTable(doc, {
    styles: {
      font: 'Prompt-Medium',
      fontStyle: 'normal',
    },
    startY: 55,
    columns,
    body: data?.dataController.map((item, index) => ({
      ...item,
      index: index + 1,
      address: !!item.address ? item.address : '-',
      country: !!item.country ? item.country : '-',
      phone: !!item.phone ? item.phone : '-',
      email: !!item.email ? item.email : '-',
    })),
    rowPageBreak: 'avoid',
    bodyStyles: { valign: 'top' },
  });
};
