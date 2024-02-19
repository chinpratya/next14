import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';

const columns = [
  {
    key: 'index',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.index'
    )}`,
  },
  {
    key: 'name',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.name'
    )}`,
  },
  {
    key: 'management',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.management'
    )}`,
  },
  {
    key: 'technical',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.technical'
    )}`,
  },
  {
    key: 'technical',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.technical'
    )}`,
  },
  {
    key: 'physical',
    title: `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.physical'
    )}`,
  },
];

export const docWidgetSecurityMeasuresUnderSection27 = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  if (
    !data.privacyPolicy.securityMeasuresUnderSection37
      .length
  )
    return null;

  doc.text(
    `${t(
      'dataMapping.activity.preview.privacyPolicy.securityMeasures.title'
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
    body: data?.privacyPolicy.securityMeasuresUnderSection37.map(
      (item, index) => ({
        ...item,
        index: index + 1,
      })
    ),
  });
};
