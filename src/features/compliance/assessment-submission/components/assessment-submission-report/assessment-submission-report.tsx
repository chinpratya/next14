import { DownloadOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Cascader,
  Dropdown,
  MenuProps,
  Typography,
} from 'antd';
import {
  Document,
  HeadingLevel,
  ImageRun,
  ISectionOptions,
  Packer,
  PageOrientation,
  Paragraph,
} from 'docx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react';

import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { exportExcelAssessmentSubmissionReport } from '../../api/export-excel-assessment-submission-report';
import { useGetAssessmentSubmissionReport } from '../../api/get-assessment-submission-report';
import { useListOrganizationRespondent } from '../../api/list-organization-respondent';
import { AssessmentSubmissionRankingReportTable } from '../assessment-submission-ranking-report/assessment-submission-ranking-report-table';

import { RadarChartReport } from './assessment-submission-report-radar-chart';
import { AssessmentReportTable } from './assessment-submission-report-table';

export type AssessmentSubmissinReportProps = {
  assessmentId: string;
};

// Helper function to convert inches to twips
function convertInchesToTwip(inches: number) {
  return inches * 1440; // 1440 twips in an inch
}

const calImageTransformationMaxA4 = (
  width: number,
  height: number
) => {
  const a4Width = 595;
  const a4Height = 842;
  const ratio = Math.min(
    a4Width / width,
    a4Height / height
  );
  return {
    width: width * ratio,
    height: height * ratio,
  };
};

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

const optionLists: Option[] = [
  {
    value: 'organization',
    label: 'องค์กร',
    isLeaf: false,
    children: [{ label: 'องค์กรทั้งหมด', value: '' }],
  },
  {
    value: 'department',
    label: 'สาขา/หน่วยงาน',
    isLeaf: false,
  },
];

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

export const AssessmentSubmissionReport = ({
  assessmentId,
}: AssessmentSubmissinReportProps) => {
  const [options, setOptions] =
    useState<Option[]>(optionLists);

  const [state, setState] = useState({
    organizationId: '',
    branchId: '',
    reportType: 'allOrganization',
  });

  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError } =
    useGetAssessmentSubmissionReport({
      assessmentId,
      branchId: state.branchId,
      organizationId: state.organizationId,
    });

  const listOrganization = useListOrganizationRespondent({
    assessmentId,
  });

  const onExportDocx = async (): Promise<void> => {
    const element = [
      'radarChart',
      'assessmentReport',
      'assessmentRakingReport',
    ];

    const elementTitle = [
      'ภาพรวมทั้งหมด',
      'ค่าเฉลี่ยของแต่ละหน่วยงาน',
      'ค่าเฉลี่ยของแต่ละองค์กร',
    ];

    const elementData = await Promise.all(
      element.map(async (item) => {
        const el = document.getElementById(item);
        if (el) {
          const canvas = await html2canvas(el);
          const imageData = canvas.toDataURL('image/png');
          const maxWidth = convertInchesToTwip(6.27); // Adjust the width as needed
          const aspectRatio =
            canvas.width / canvas.height;
          const width = Math.min(
            maxWidth,
            convertInchesToTwip(6.27)
          );
          const height = width / aspectRatio;
          return {
            data: imageData,
            name: `${item}.png`,
            width,
            height,
          };
        }
      })
    );

    const sectionProperties = {
      page: {
        size: {
          orientation: PageOrientation.PORTRAIT,
          width: convertInchesToTwip(8.27), // A4 paper width in inches
          height: convertInchesToTwip(11.69), // A4 paper height in inches
        },
        margin: {
          top: convertInchesToTwip(1), // Top margin in inches
          right: convertInchesToTwip(1), // Right margin in inches
          bottom: convertInchesToTwip(1), // Bottom margin in inches
          left: convertInchesToTwip(1), // Left margin in inches
        },
      },
    };

    const docx = new Document({
      sections: elementData.map(
        (item, index): ISectionOptions => {
          if (!item) {
            return {
              children: [],
              properties: sectionProperties,
            };
          }
          const image = new ImageRun({
            data: item.data,
            transformation: calImageTransformationMaxA4(
              item.width,
              item.height
            ),
          });
          const paragraph = new Paragraph({
            children: [image],
            heading: HeadingLevel.HEADING_1,
            text: elementTitle[index],
          });
          return {
            children: [paragraph],
            properties: sectionProperties,
          };
        }
      ),
    });

    Packer.toBuffer(docx).then((buffer) => {
      saveAs(
        new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }),
        'assessment-submission-report.docx'
      );
    });
    return new Promise((resolve) => resolve());
  };

  const getRankingTitle = () => {
    const type = state.reportType;
    if (type === 'allOrganization') {
      return 'ค่าเฉลี่ยของทุกองค์กร';
    } else if (type === 'organization') {
      const orgValue = listOrganization.data?.data.find(
        (item) => item.ObjectUUID === state.organizationId
      );
      return `ค่าเฉลี่ยขององค์กร : ${orgValue?.name}`;
    } else if (type === 'allHospital') {
      return 'ค่าเฉลี่ยของสาขา/หน่วยงานทั้งหมด';
    } else {
      const branchValue = listOrganization.data?.data
        .find(
          (item) =>
            item.ObjectUUID === state.organizationId
        )
        ?.branchs.find(
          (branch) => branch.ObjectUUID === state.branchId
        );
      return `ค่าเฉลี่ยของสาขา/หน่วยงาน : ${branchValue?.name}`;
    }
  };

  const onFilterChange = (value: string[]) => {
    const [reportType, organizationId, branchId] = value;

    const updatedOrganizationId =
      organizationId ?? assessmentId;
    const updatedBranchId = branchId ?? '';
    let updatedReportType = reportType;

    if (
      reportType === 'organization' &&
      !organizationId
    ) {
      updatedReportType = 'allOrganization';
    } else if (reportType === 'hospital' && !branchId) {
      updatedReportType = 'allHospital';
    }

    setState({
      reportType: updatedReportType,
      organizationId: updatedOrganizationId,
      branchId: updatedBranchId,
    });
  };

  const onExport: MenuProps['onClick'] = async ({
    key,
  }) => {
    try {
      setLoading(true);
      if (key === 'excel') {
        const data =
          await exportExcelAssessmentSubmissionReport({
            assessmentId,
          });
        downloadFileAtUrl(data.url);
      }
      if (key === 'pdf') {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const printElement = [
          'pageOne',
          'pageTwo',
          'pageThree',
        ];

        // if (state.reportType === 'allOrganization') {
        //   printElement.push('pageFour');
        // }

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
      }
      if (key === 'docx') {
        await onExportDocx();
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listOrganization.data?.data) {
      const listOption = listOrganization.data.data;
      setOptions([
        {
          value: 'organization',
          label: 'องค์กร',
          isLeaf: false,
          children: [
            {
              label: 'องค์กรทั้งหมด',
              value: '',
            },
            ...listOption.map((item) => ({
              label: item.name,
              value: item.ObjectUUID,
            })),
          ],
        },
        {
          value: 'hospital',
          label: 'สาขา/หน่วยงาน',
          isLeaf: false,
          children: listOption.map((item) => ({
            label: item.name,
            value: item.ObjectUUID,
            children: [
              {
                label: 'สาขา/หน่วยงานทั้งหมด',
                value: '',
              },
              ...item.branchs.map((branch) => ({
                label: branch.name,
                value: branch.ObjectUUID,
              })),
            ],
          })),
        },
      ]);
    }
  }, [listOrganization.data?.data]);

  return (
    <FallbackError isError={isError}>
      <div
        id="pageOne"
        className="p-4"
        style={{ margin: -24 }}
      >
        <Flex justifyContent="end" alignItems="center">
          <Cascader
            loading={listOrganization.isLoading}
            defaultValue={['organization', '']}
            options={options}
            onChange={(value) =>
              onFilterChange(value as string[])
            }
            allowClear={false}
          />
          <Dropdown
            menu={{
              items: dropdownItems,
              onClick: onExport,
            }}
          >
            <Button
              type="primary"
              ghost
              className="ml-2"
              loading={loading}
            >
              <DownloadOutlined />
              ส่งออกรายงาน
            </Button>
          </Dropdown>
        </Flex>
        <Flex
          className="mb-4"
          alignItems="center"
          justifyContent="center"
        >
          <Typography.Text
            className={css`
              font-size: 16px;
              font-weight: 700;
              margin: 0 !important;
            `}
          >
            ภาพรวมทั้งหมด
          </Typography.Text>
        </Flex>
        <div id="radarChart">
          <RadarChartReport
            graph={data?.data?.graph}
            graphMeta={data?.data?.graphMeta}
            loading={isLoading}
            height="750px"
            reportType={state.reportType}
          />
        </div>
      </div>
      <div
        id="pageTwo"
        className="p-4"
        style={{ margin: -24 }}
      >
        <div id="assessmentReport">
          <AssessmentReportTable
            data={data?.data.sections}
            loading={isLoading}
          />
        </div>
      </div>
      <div
        id="pageThree"
        className="p-4"
        style={{ margin: -24 }}
      >
        <Typography.Title
          level={4}
          className="font-weight-bold mt-5"
        >
          {getRankingTitle()}
        </Typography.Title>
        <div id="assessmentRakingReport">
          <AssessmentSubmissionRankingReportTable
            ranking={data?.data.avgOfOrg}
            meta={data?.data.avgOfOrg.meta}
            loading={isLoading}
            reportType={state.reportType}
          />
        </div>
      </div>
      {/* {state.reportType === 'allOrganization' && (
        <div
          id="pageFour"
          className="p-4"
          style={{ margin: -24 }}
        >
          <div id="assessmentMaturityReport">
            <AssessmentSubmissionReportMaturityModel
              data={data?.data.maturityModel.detail}
              loading={isLoading}
            />
          </div>
        </div>
      )} */}
    </FallbackError>
  );
};
