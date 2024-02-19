import { t } from 'i18next';
import { jsPDF } from 'jspdf';

export const docWidgetPageTitle = (
  title: string,
  doc: jsPDF
) => {
  doc.setFont('Prompt-Medium', undefined, 400);

  const pageWidth =
    doc.internal.pageSize.width ||
    doc.internal.pageSize.getWidth();

  doc.text(
    'บันทึกกิจกรรมการประมวลผล' + title,
    pageWidth / 2,
    20,
    {
      align: 'center',
    }
  );

  doc.setFontSize(12);

  doc.text(
    `${t(
      'consentManagement.activity.activityDetail.detail.activityName'
    )} : ${title}`,
    14,
    40
  );
};
