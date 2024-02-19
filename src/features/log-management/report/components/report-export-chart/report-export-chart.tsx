import { DownloadOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { CSVLink } from 'react-csv';
import { GrDocumentCsv } from 'react-icons/gr';
import { VscJson } from 'react-icons/vsc';

import { IntlMessage } from '@/components/util-components/intl-message';

type Column = {
  label: string;
  key: string;
};

type ReportExportChartProps = {
  filename: string;
  data: Record<string, unknown>[];
  defaultData?:
    | Record<string, unknown>[]
    | Record<string, unknown>;
  columns: Column[];
};

export const ReportExportChart = ({
  columns,
  data,
  defaultData,
  filename,
}: ReportExportChartProps) => {
  const onExportJSON = () => {
    const jsonString = JSON.stringify(
      defaultData ?? data,
      null,
      2
    ); // The third parameter (2) is for indentation
    const blob = new Blob([jsonString], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <CSVLink
                data={data}
                headers={columns}
                filename={filename}
              >
                <IntlMessage id="siem.downloadCsv" />
              </CSVLink>
            ),
            icon: <GrDocumentCsv />,
            key: 'csv',
          },
          {
            label: <IntlMessage id="siem.downloadJSON" />,
            key: 'json',
            icon: <VscJson />,
            onClick: () => onExportJSON(),
          },
        ],
      }}
      trigger={['click']}
    >
      <Button icon={<DownloadOutlined />}>
        <IntlMessage id="logManagement.download" />
      </Button>
    </Dropdown>
  );
};
