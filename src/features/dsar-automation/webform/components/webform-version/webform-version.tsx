import { EyeOutlined } from '@ant-design/icons';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useToggle } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListWebformVersion } from '../../api/list-webform-version';
import { WebFormVersionType } from '../../types';
import { WebformVersionPreview } from '../webform-version-preview';

type WebformVersionProps = {
  webformId: string;
};

export const WebformVersion = ({
  webformId,
}: WebformVersionProps) => {
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useListWebformVersion(webformId);

  const columns: ColumnsType<WebFormVersionType> = [
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.version" />
      ),
      key: 'version',
      dataIndex: 'version',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.version.publishDt" />
      ),
      key: 'publishDt',
      dataIndex: 'publishDt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (version: WebFormVersionType) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dsarAutomation.setting.webForm.preview" />
              ),
              key: 'preview',
              icon: <EyeOutlined />,
              onClick: () => toggle.preview(version),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card>
        <Table
          rowKey="version"
          columns={columns}
          dataSource={data?.data ?? []}
          loading={isLoading}
        />
        <WebformVersionPreview
          open={toggle.openPreview}
          onClose={() => toggle.preview()}
          webformId={webformId}
          versionId={toggle?.data?.version}
        />
      </Card>
    </FallbackError>
  );
};
