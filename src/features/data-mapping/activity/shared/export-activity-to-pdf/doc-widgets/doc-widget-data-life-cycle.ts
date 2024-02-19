import html2canvas from 'html2canvas';
import { t } from 'i18next';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import _ from 'lodash';
import React from 'react';

import {
  getDataLifecycleByActivity,
  getCycleOfDataLifecycle,
} from '../../../../data-lifecycle';

const columns = [
  {
    key: 'dataSubject',
    title: `${t(
      'dataMapping.dataLifecycle.detail.dataSubject'
    )}`,
  },
  {
    key: 'collect',
    title: `${t(
      'dataMapping.dataLifecycle.detail.collect'
    )}`,
  },
  {
    key: 'dataset',
    title: `${t(
      'dataMapping.dataLifecycle.detail.dataset'
    )}`,
  },
  {
    key: 'process',
    title: `${t(
      'dataMapping.dataLifecycle.detail.process'
    )}`,
  },
  {
    key: 'storage',
    title: `${t(
      'dataMapping.dataLifecycle.detail.storage'
    )}`,
  },
  {
    key: 'transfer',
    title: `${t(
      'dataMapping.dataLifecycle.detail.transfer'
    )}`,
  },
  {
    key: 'destroy',
    title: `${t(
      'dataMapping.dataLifecycle.detail.dataDestruction'
    )}`,
  },
];

export const docWidgetDataLifeCycle = async (
  activityId: string,
  doc: jsPDF,
  dataLifecycleRef?: React.RefObject<HTMLDivElement>
): Promise<void> => {
  const dataLifecycleByActivity =
    await getDataLifecycleByActivity({
      activityId,
    });

  const dataLifeCycle = await getCycleOfDataLifecycle({
    dataLifecycleId:
      dataLifecycleByActivity.dataLifeCycleID,
  });

  const maxRow = Math.max(
    ...Object.entries(dataLifeCycle)?.map(
      (cycle): number => {
        return cycle?.[1].length ?? 0;
      }
    )
  );

  doc.text(
    `${t('dataMapping.dataLifecycle.title')}`,
    14,
    20
  );

  const dataLifecycleImage = dataLifecycleRef?.current;
  if (dataLifecycleImage) {
    const canvas = await html2canvas(dataLifecycleImage, {
      scale: 10,
    });
    const imageData = canvas.toDataURL('image/png');
    doc.addImage(imageData, 'PNG', 14, 30, 270, 120);
    doc.addPage();
  }

  autoTable(doc, {
    styles: {
      font: 'Prompt-Medium',
      fontStyle: 'normal',
      fontSize: 10,
    },
    startY: dataLifecycleImage ? 20 : 25,
    rowPageBreak: 'avoid',
    bodyStyles: { valign: 'top' },
    columns,
    columnStyles: {
      0: {
        minCellWidth: 35,
      },
      1: {
        minCellWidth: 35,
      },
      2: {
        minCellWidth: 40,
      },
      3: {
        minCellWidth: 40,
      },
      4: {
        minCellWidth: 35,
      },
      5: {
        minCellWidth: 35,
      },
      6: {
        minCellWidth: 40,
      },
    },
    body: Array.from({ length: maxRow }).map(
      (data, index) => {
        return {
          dataSubject: _.get(
            dataLifeCycle,
            `dataSubject[${index}].name`,
            ''
          ) as string,
          collect: _.get(
            dataLifeCycle,
            `collect[${index}].name`,
            ''
          ) as string,
          dataset: _.get(
            dataLifeCycle,
            `dataset[${index}].name`,
            ''
          ) as string,
          process: _.get(
            dataLifeCycle,
            `process[${index}].name`,
            ''
          ) as string,
          storage: _.get(
            dataLifeCycle,
            `storage[${index}].name`,
            ''
          ) as string,
          transfer: _.get(
            dataLifeCycle,
            `tranfer[${index}].name`,
            ''
          ) as string,
          destroy: _.get(
            dataLifeCycle,
            `destroy[${index}].name`,
            ''
          ) as string,
        };
      }
    ),
  });
};
