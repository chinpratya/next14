import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteTemplateRiskLikelihood } from '../../api/delete-template-risk-likelihood';
import { useGetTemplateRiskLikelihood } from '../../api/get-template-risk-likelihood';
import { TemplateRiskLikelihood } from '../../types';
import { TemplateRiskSettingChanceModal } from '../template-risk-setting-chance-modal';

export type TemplateRiskSettingProps = {
  assessmentId: string;
};

export const TemplateRiskSettingChance = ({
  assessmentId,
}: TemplateRiskSettingProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetTemplateRiskLikelihood({
      assessmentId,
    });

  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions[
        'pdpakit:assessment:templaterisk:update'
      ],
    ],
  });

  const deleteChance = useDeleteTemplateRiskLikelihood({
    assessmentId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.common.notification.deleted
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<TemplateRiskLikelihood> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.level}
        />
      ),
      key: 'likelihoodID',
      dataIndex: 'likelihoodID',
      width: 75,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.riskAssessment.riskTemplate.likelihood
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
            tokens.riskAssessment.riskTemplate.description
          }
        />
      ),
      key: 'description',
      dataIndex: 'description',
      width: 500,
    },
    {
      key: 'action',
      width: 85,
      align: 'right',
      render: (chance: TemplateRiskLikelihood) => (
        <Flex gap={8} justify="end">
          <EditOutlined
            onClick={() =>
              editPermission.isAllow
                ? toggle.edit(chance)
                : null
            }
            style={{
              color: editPermission.isAllow
                ? 'black'
                : '#C4C4C4',
              cursor: editPermission.isAllow
                ? 'pointer'
                : 'not-allowed',
            }}
          />
          <DeleteOutlined
            // hidden={(data?.data?.length ?? 0) <= 1}
            onClick={() =>
              editPermission.isAllow
                ? toggle.remove(chance)
                : null
            }
            style={{
              color: editPermission.isAllow
                ? 'black'
                : '#C4C4C4',
              cursor: editPermission.isAllow
                ? 'pointer'
                : 'not-allowed',
            }}
          />
          <PlusCircleOutlined
            onClick={() =>
              editPermission.isAllow
                ? toggle.create(chance)
                : null
            }
            style={{
              color: editPermission.isAllow
                ? 'black'
                : '#C4C4C4',
              cursor: editPermission.isAllow
                ? 'pointer'
                : 'not-allowed',
            }}
          />
        </Flex>
      ),
    },
  ];
  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate
                .chanceTitle
            }
          />
        }
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
          rowKey="name"
          tableLayout="fixed"
          scroll={{
            x: 855,
          }}
          loading={isLoading}
          columns={columns}
          dataSource={data ?? []}
          pagination={false}
        />
        <TemplateRiskSettingChanceModal
          open={toggle.openEdit || toggle.openCreate}
          onClose={() => toggle.resetAll()}
          data={toggle.data}
          isEditable={toggle.openEdit}
          assessmentId={assessmentId}
        />

        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          okButtonProps={{
            loading: deleteChance.isLoading,
          }}
          hasIdentifier={false}
          onOk={() =>
            deleteChance.submit(
              toggle?.data?.likelihoodID as number
            )
          }
        />
      </Card>
    </FallbackError>
  );
};
