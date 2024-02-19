import { DownloadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Typography,
} from 'antd';
import {
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
} from 'docx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useState } from 'react';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { exportExcelAssessmentSubmissionReport } from '../../../assessment-submission';
import { useGetAssessmentReport } from '../../api/get-assessment-report';

import { AssessmentRankingReport } from './assessment-report-ranking';
import { RadarReport } from './radar-report';
import { TableReport } from './table-report';

export type AssessmentReportProps = {
  assessmentId: string;
};

const dropdownItems = [
  {
    label: 'PDF',
    key: 'pdf',
  },
  {
    label: 'Docx',
    key: 'docx',
  },
  { label: 'Excel', key: 'excel' },
];

const downloadFileAtUrl = (url: string) => {
  const fileName = 'assessment-submission-report';
  const aTag = document.createElement('a');
  aTag.href = url;
  aTag.setAttribute('download', fileName);
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove();
};

export const AssessmentReport = ({
  assessmentId,
}: AssessmentReportProps) => {
  const [state, setState] = useState({
    loading: false,
  });

  const { data, isLoading, isError } =
    useGetAssessmentReport(assessmentId);

  const onExport: MenuProps['onClick'] = async ({
    key,
  }) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      if (key === 'excel') {
        const data =
          await exportExcelAssessmentSubmissionReport({
            assessmentId,
          });
        downloadFileAtUrl(data.url);
      } else if (key === 'pdf') {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const printElement = [
          'pageOne',
          'pageTwo',
          'pageThree',
        ];

        const header = document.getElementById(
          'assessmentHeader'
        ) as HTMLElement;

        const canvasHeader = await html2canvas(header);
        const imgDataHeader =
          canvasHeader.toDataURL('image/png');
        const imgPropsHeader =
          pdf.getImageProperties(imgDataHeader);
        const pdfWidthHeader =
          pdf.internal.pageSize.getWidth();
        const pdfHeightHeader =
          (imgPropsHeader.height * pdfWidthHeader) /
          imgPropsHeader.width;
        pdf.addImage(
          imgDataHeader,
          'PNG',
          0,
          0,
          pdfWidthHeader,
          pdfHeightHeader
        );

        for (const element of printElement) {
          const el = document.getElementById(element);

          if (el) {
            const canvas = await html2canvas(el);
            const imgData = canvas.toDataURL('image/png');
            const imgProps =
              pdf.getImageProperties(imgData);
            const pdfWidth =
              pdf.internal.pageSize.getWidth();
            const pdfHeight =
              (imgProps.height * pdfWidth) /
              imgProps.width;
            const y = element === 'pageOne' ? 20 : 0;
            pdf.addImage(
              imgData,
              'PNG',
              0,
              y,
              pdfWidth,
              pdfHeight
            );
            if (
              element !==
              printElement[printElement.length - 1]
            ) {
              pdf.addPage();
            }
          }
        }
        pdf.save('assessment-submission-report.pdf');
      } else if (key === 'docx') {
        const element = [
          'radarChart',
          'assessmentReport',
          'assessmentRakingReport',
        ];

        const elementTitle = [
          'ภาพรวมทั้งหมด',
          '',
          'ค่าเฉลี่ยของแต่ละองค์กร',
        ];

        const elementData = await Promise.all(
          element.map(async (item) => {
            const el = document.getElementById(item);
            if (el) {
              const canvas = await html2canvas(el);
              const imageData =
                canvas.toDataURL('image/png');
              const width = canvas.width;
              const height = canvas.height;
              return {
                data: imageData,
                width,
                height,
              };
            }
          })
        );

        const doc = new Document({
          sections: [
            {
              children: elementData.map((item, index) => {
                return new Paragraph({
                  text: elementTitle[index],
                  heading: HeadingLevel.HEADING_1,
                  spacing: {
                    before: 100,
                    after: 100,
                  },
                  children: [
                    new ImageRun({
                      data: item?.data as string,
                      transformation: {
                        width: item?.width as number,
                        height: item?.height as number,
                      },
                    }),
                    new Paragraph({}),
                  ],
                });
              }),
            },
          ],
        });

        Packer.toBlob(doc).then((blob) => {
          saveAs(
            blob,
            'assessment-submission-report.docx'
          );
        });
      }
    } catch {
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <FallbackError isError={isError}>
      <div
        id="pageOne"
        className="p-4"
        style={{ margin: -24 }}
      >
        <Row align="middle" className="mt-4">
          <Col span={8} />
          <Col span={8}>
            <Typography.Title
              level={4}
              className="mb-0 text-center font-weight-bold"
            >
              <IntlMessage id="compliancePortal.result.detail.report.overview" />
            </Typography.Title>
          </Col>
          <Col span={8} className="text-right">
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: onExport,
              }}
            >
              <Button
                loading={state.loading}
                ghost
                type="primary"
              >
                <DownloadOutlined />
                <IntlMessage id="compliancePortal.result.detail.report.export" />
              </Button>
            </Dropdown>
          </Col>
        </Row>

        <div id="radarChart">
          <RadarReport
            graph={data?.data.graph}
            graphMeta={data?.data['graphMeta']}
            loading={isLoading}
          />
        </div>
      </div>

      <div
        id="pageTwo"
        className="p-4"
        style={{ margin: -24 }}
      >
        <div id="assessmentReport">
          <TableReport
            data={data?.data?.sections}
            loading={isLoading}
            reportType={'department'}
          />
        </div>
      </div>

      <div
        id="pageThree"
        className="p-4"
        style={{ margin: -24 }}
      >
        <AssessmentRankingReport
          ranking={data?.data.avgOfOrg}
          meta={data?.data.avgOfOrg.meta}
        />
      </div>
    </FallbackError>
  );
};
