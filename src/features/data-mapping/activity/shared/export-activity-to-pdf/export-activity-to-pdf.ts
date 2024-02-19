import { t } from 'i18next';
import jsPDF from 'jspdf';
import _ from 'lodash';
import React from 'react';

import { ActivityPreview } from '../../types';

import { docWidgetDataController } from './doc-widgets/doc-widget-data-controller';
import { docWidgetDataLifeCycle } from './doc-widgets/doc-widget-data-life-cycle';
import { docWidgetDataProtectionOfficer } from './doc-widgets/doc-widget-data-protection-officer';
import { docWidgetPageTitle } from './doc-widgets/doc-widget-page-title';
import { docWidgetPrivacyPolicyDataRetentionMethod } from './doc-widgets/doc-widget-privacy-policy-data-retention-method';
import { docWidgetPrivacyPolicyStorage } from './doc-widgets/doc-widget-privacy-policy-storage';
import { docWidgetPurposes } from './doc-widgets/doc-widget-purposes';
import { docWidgetRightsAndAccess } from './doc-widgets/doc-widget-rights-and-access';
import { docWidgetRightsOfPersonalData } from './doc-widgets/doc-widget-rights-of-personal-data';
import { docWidgetSecurityMeasuresUnderSection27 } from './doc-widgets/doc-widget-security-measures-under-section27';
import { docWidgetTransferData } from './doc-widgets/doc-widget-transfer-data';
import { font } from './font';

export const exportActivityToPdf = async (
  activityId: string,
  data: ActivityPreview,
  dataLifecycleRef?: React.RefObject<HTMLDivElement>
): Promise<URL> => {
  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
  });
  doc.addFileToVFS('Prompt-Medium-normal.ttf', font);
  doc.addFont(
    'Prompt-Medium-normal.ttf',
    'Prompt-Medium',
    'normal'
  );
  doc.setFontSize(12);

  docWidgetPageTitle(data?.name, doc);

  docWidgetDataController(data, doc);

  let finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
  let positionY = finalY;
  if (finalY > 125) {
    doc.addPage();
    positionY = 0;
  }

  docWidgetDataProtectionOfficer(data, positionY, doc);

  if (data?.dataCategories?.length) {
    finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
    positionY = finalY;
    if (finalY > 125) {
      doc.addPage();
      positionY = 0;
    }
  }

  docWidgetPurposes(data, positionY, doc);

  if (data?.tranferData?.length) {
    finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
    positionY = finalY;
    if (finalY > 125) {
      doc.addPage();
      positionY = 0;
    }

    docWidgetTransferData(data, positionY, doc);
  }

  finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
  positionY = finalY;
  if (finalY > 125) {
    doc.addPage();
    positionY = 0;
  }

  doc.text(
    `${t(
      'dataMapping.activity.preview.privacyPolicy.title'
    )}`,
    14,
    positionY === 0 ? 20 : positionY + 30
  );

  docWidgetPrivacyPolicyStorage(data, positionY, doc);

  if (data?.privacyPolicy?.dataRetentionMethod?.length) {
    finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
    positionY = finalY;
    if (finalY > 125) {
      doc.addPage();
      positionY = 0;
    }
  }

  docWidgetPrivacyPolicyDataRetentionMethod(
    data,
    positionY,
    doc
  );

  if (
    data.privacyPolicy.securityMeasuresUnderSection37
      .length
  ) {
    finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
    positionY = finalY;
    if (finalY > 125) {
      doc.addPage();
      positionY = 0;
    }
  }

  docWidgetSecurityMeasuresUnderSection27(
    data,
    positionY,
    doc
  );

  if (data.access.length) {
    finalY = _.get(doc, 'lastAutoTable.finalY') ?? 10;
    positionY = finalY;
    if (finalY > 125) {
      doc.addPage();
      positionY = 0;
    }
  }

  docWidgetRightsAndAccess(data, positionY, doc);

  if (data.privacyPolicy.rightsOfPersonalData.length) {
    doc.addPage();
    positionY = 0;
  }

  docWidgetRightsOfPersonalData(data, positionY, doc);

  doc.addPage();

  await docWidgetDataLifeCycle(
    activityId,
    doc,
    dataLifecycleRef
  );

  return doc.output('bloburl');
};
