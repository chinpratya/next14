import { EyeOutlined } from '@ant-design/icons';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useToggle } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListPolicyVersion } from '../../api/list-policy-version';
import { PolicyVersion } from '../../types';
import { PolicyVersionPreview } from '../policy-version-preview';

type PolicyVersionListProps = {
  policyId: string;
};

export const PolicyVersionList = ({
  policyId,
}: PolicyVersionListProps) => {
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useListPolicyVersion(policyId);

  const columns: ColumnsType<PolicyVersion> = [
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.version.name" />
      ),
      dataIndex: 'version',
      key: 'version',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="policyManagement.policy.detail.version.publishedDt" />
      ),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (version: PolicyVersion) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="policyManagement.policy.preview" />
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
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          columns={columns}
          dataSource={data?.data ?? []}
          loading={isLoading}
        />
        <PolicyVersionPreview
          open={toggle.openPreview}
          onClose={() => toggle.preview()}
          policyId={policyId}
          versionId={toggle?.data?.ObjectUUID}
        />
      </Card>
    </FallbackError>
  );
};
