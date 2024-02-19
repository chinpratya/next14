import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteRiskEffectChance } from '../../api/delete-risk-matrix-effect';
import { useGetRiskMatrixEffect } from '../../api/get-risk-matrix-effect';
import { RiskMatrixEffectType } from '../../types';
import { RiskMatrixEffectDialog } from '../risk-matrix-effect-dialog';

export type RiskMatrixEffectProps = {
  riskMatrixId: string;
  isReadOnly?: boolean;
};

export const RiskMatrixEffect = ({
  riskMatrixId,
  isReadOnly,
}: RiskMatrixEffectProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<RiskMatrixEffectType>();

  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetRiskMatrixEffect(riskMatrixId);

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:update'],
    ],
  });

  const deleteRiskMatrixEffect =
    useDeleteRiskEffectChance({
      riskMatrixId,
      onSuccess: () => {
        toggle.remove();
        showNotification({
          type: 'success',
          message: t(
            tokens.common.notification.deleted
          ) as string,
        });
      },
    });

  const columns: ColumnsType<RiskMatrixEffectType> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.level}
        />
      ),
      key: 'effectID',
      dataIndex: 'effectID',
      width: 75,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.severity}
        />
      ),
      key: 'severity',
      dataIndex: 'severity',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.effectTitle}
        />
      ),
      key: 'effect',
      dataIndex: 'effect',
      width: 350,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.dataBreach.riskMatrix
              .descriptionSeverity
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
      render: (
        riskMatrixEffect: RiskMatrixEffectType
      ) => (
        <Flex gap={8} justify="end">
          <EditOutlined
            onClick={() =>
              editPermission.isAllow
                ? toggle.edit(riskMatrixEffect)
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
            hidden={(data?.data?.length ?? 0) <= 1}
            onClick={() =>
              editPermission.isAllow
                ? toggle.remove(riskMatrixEffect)
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
                ? toggle.create(riskMatrixEffect)
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
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.effectTitle}
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
      <FallbackError isError={isError}>
        <Table
          rowKey="effectID"
          tableLayout="fixed"
          scroll={{
            x: 1055,
          }}
          loading={isLoading}
          columns={columns?.filter(
            (column) =>
              (column.key !== 'action' && isReadOnly) ||
              !isReadOnly
          )}
          dataSource={data?.data}
          pagination={false}
        />
        <RiskMatrixEffectDialog
          riskMatrixId={riskMatrixId}
          riskMatrixEffect={toggle?.data}
          open={toggle.openCreate || toggle.openEdit}
          onClose={() => toggle.resetAll()}
          isEditable={toggle.openEdit}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          okButtonProps={{
            loading: deleteRiskMatrixEffect.isLoading,
          }}
          hasIdentifier={false}
          onOk={() =>
            deleteRiskMatrixEffect.submit(
              toggle?.data?.effectID as string
            )
          }
        />
      </FallbackError>
    </Card>
  );
};
