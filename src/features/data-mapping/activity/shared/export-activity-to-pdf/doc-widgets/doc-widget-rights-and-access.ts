import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ActivityPreview } from '../../../types';
import { element } from 'prop-types';

const columns = [
  {
    key: 'organizationName',
    title: `${t(
      'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.org'
    )}`,
  },
  {
    key: 'elements',
    title: `${t(
      'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.purpose'
    )}`,
  },
  {
    key: 'dataElementsName',
    title: `${t(
      'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.element'
    )}`,
  },
  {
    key: 'dataCategoriesName',
    title: `${t(
      'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.dataCategory'
    )}`,
  },
  {
    key: 'description',
    title: `${t(
      'dataMapping.activity.collect.rightsAndMethodAccessPersonalInformation.description'
    )}`,
  },
];

export const docWidgetRightsAndAccess = (
  data: ActivityPreview,
  positionY: number,
  doc: jsPDF
) => {
  if (!data?.access.length) return null;

  doc.text(
    `${t(
      'dataMapping.activity.preview.privacyPolicy.rights.title'
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
    columnStyles: {
      0: {
        minCellWidth: 75,
      },
      1: {
        minCellWidth: 35,
      },
      3: {
        minCellWidth: 35,
      },
      4: {
        minCellWidth: 60,
      },
    },
    body: data?.access.map((item, index) => {
      const dataElementsName = item?.elements
        ?.map(
          (element) => element.subelements.dataElementName
        )
        ?.join(', ');

      const dataCategoriesName = item?.elements
        ?.map(
          (element) =>
            element.subelements.dataCategoryName
        )
        ?.join(',¬ ');

      return {
        organizationName:
          item.organizationName?.join(', '),
        elements: item.elements
          ?.map((element) => element.purposeName)
          .join(', '),
        dataElementsName,
        dataCategoriesName,
        description: item.description,
        index,
      };
    }),
  });
};
