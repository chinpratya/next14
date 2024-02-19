import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  TemplateRiskScore,
  TemplateRiskScoreRiskDetail,
} from '../../types';

import { TemplateRiskSettingDetailRiskModal } from './template-risk-setting-detail-risk-modal';

export type TemplateRiskSettingDetailRiskProps = {
  data: TemplateRiskScore;
  loading: boolean;
  assessmentId: string;
};

export const TemplateRiskSettingDetailRisk = ({
  data,
  loading,
  assessmentId,
}: TemplateRiskSettingDetailRiskProps) => {
  const toggle = useToggle();

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:templaterisk:update'
      ],
    ],
  });

  const columns: ColumnsType<TemplateRiskScoreRiskDetail> =
    [
      {
        title: (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate.riskLevel
            }
          />
        ),
        key: 'name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .scoreTitle
            }
          />
        ),
        key: 'score',
        dataIndex: 'score',
        width: 200,
      },
      {
        title: (
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .description
            }
          />
        ),
        key: 'description',
        dataIndex: 'description',
        width: 350,
      },
      {
        key: 'action',
        width: 85,
        align: 'right',
        render: (risk: TemplateRiskScoreRiskDetail) => (
          <Button
            type="link"
            onClick={() => toggle.edit(risk)}
            disabled={!editPermission.isAllow}
          >
            <IntlMessage id={tokens.common.edit} />
            <EditOutlined />
          </Button>
        ),
      },
    ];

  return (
    <Card
      title={
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate.riskDetails
          }
        />
      }
      loading={loading}
      className={css`
        .ant-card-head {
          border-bottom: 1px solid #f0f0f0;

          .ant-card-head-title {
            padding-bottom: 16px;
          }
        }
      `}
    >
      <Table
        columns={columns}
        dataSource={data?.riskDetail ?? []}
        rowKey="tableID"
        tableLayout="fixed"
        scroll={{
          x: 1055,
        }}
        pagination={false}
      />
      <TemplateRiskSettingDetailRiskModal
        open={toggle.openEdit}
        onClose={() => toggle.edit()}
        data={toggle?.data}
        assessmentId={assessmentId}
      />
    </Card>
  );
};
