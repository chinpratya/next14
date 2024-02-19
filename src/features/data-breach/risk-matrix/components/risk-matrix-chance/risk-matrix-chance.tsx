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
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteRiskMatrixChance } from '../../api/delete-risk-matrix-chance';
import { useGetRiskMatrixChance } from '../../api/get-risk-matrix-chance';
import { RiskMatrixChanceType } from '../../types';
import { RiskMatrixChanceDialog } from '../risk-matrix-chance-dialog';
import { permissions } from '@/permissions';

export type RiskMatrixChanceProps = {
  riskMatrixId: string;
  isReadOnly?: boolean;
};

export const RiskMatrixChance = ({
  riskMatrixId,
  isReadOnly,
}: RiskMatrixChanceProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<RiskMatrixChanceType>();

  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetRiskMatrixChance(riskMatrixId);
  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:riskmatrix:update'],
    ],
  });
  const deleteRiskMatrixChance =
    useDeleteRiskMatrixChance({
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

  const columns: ColumnsType<RiskMatrixChanceType> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.level}
        />
      ),
      key: 'likelihoodID',
      dataIndex: 'likelihoodID',
      width: 75,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.likelihood}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.riskMatrix.description}
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
      render: (
        riskMatrixChance: RiskMatrixChanceType
      ) => (
        <Flex gap={8} justify="end">
          <EditOutlined
            onClick={() =>
              editPermission.isAllow
                ? toggle.edit(riskMatrixChance)
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
                ? toggle.remove(riskMatrixChance)
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
                ? toggle.create(riskMatrixChance)
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
          id={tokens.dataBreach.riskMatrix.chanceTitle}
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
          rowKey="likelihoodID"
          tableLayout="fixed"
          scroll={{
            x: 855,
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
        <RiskMatrixChanceDialog
          riskMatrixId={riskMatrixId}
          riskMatrixChance={toggle?.data}
          open={toggle.openCreate || toggle.openEdit}
          onClose={() => toggle.resetAll()}
          isEditable={toggle.openEdit}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          okButtonProps={{
            loading: deleteRiskMatrixChance.isLoading,
          }}
          hasIdentifier={false}
          onOk={() =>
            deleteRiskMatrixChance.submit(
              toggle?.data?.likelihoodID as string
            )
          }
        />
      </FallbackError>
    </Card>
  );
};
