import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteTemplateRiskEffect } from '../../api/delete-template-risk-effect';
import { useDeleteTemplateRiskEffectTable } from '../../api/delete-template-risk-effect-table';
import { useGetTemplateRiskEffect } from '../../api/get-template-risk-effect';
import {
  TemplateRiskEffect,
  TemplateRiskEffectTable,
} from '../../types';

import {
  TemplateRiskSettingEffectModal,
  TemplateRiskSettingEffectTableModal,
} from './components';

export type TemplateRiskSettingEffectProps = {
  assessmentId: string;
};

export const TemplateRiskSettingEffect = ({
  assessmentId,
}: TemplateRiskSettingEffectProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetTemplateRiskEffect({
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

  const deleteEffect = useDeleteTemplateRiskEffect({
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

  const deleteEffectTable =
    useDeleteTemplateRiskEffectTable({
      assessmentId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            tokens.common.notification.deleted
          ) as string,
        });
        toggle.reject();
      },
    });

  const columns: ColumnsType<TemplateRiskEffectTable> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.level}
        />
      ),
      key: 'tableID',
      dataIndex: 'tableID',
      width: 75,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.severity}
        />
      ),
      key: 'severity',
      dataIndex: 'severity',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.riskTemplate.effect}
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
            tokens.riskAssessment.riskTemplate
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
      render: (effect: TemplateRiskEffectTable) => (
        <Flex gap={8} justify="end">
          <EditOutlined
            onClick={() =>
              editPermission.isAllow
                ? toggle.change(effect)
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
            onClick={() =>
              editPermission.isAllow
                ? toggle.reject(effect)
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
                ? toggle.duplicate(effect)
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
            id={tokens.riskAssessment.riskTemplate.effect}
          />
        }
        loading={isLoading}
      >
        {data?.data?.map(
          (value: TemplateRiskEffect, index: number) => {
            return (
              <Card
                key={index}
                title={value.name}
                className={css`
                  .ant-card-head {
                    border-bottom: 1px solid #f0f0f0;

                    .ant-card-head-title {
                      padding-bottom: 16px;
                    }
                  }
                `}
                extra={
                  <>
                    <EditOutlined
                      className="cursor-pointer mr-1"
                      onClick={() =>
                        editPermission.isAllow
                          ? toggle.edit(value)
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
                      className="cursor-pointer"
                      onClick={() =>
                        editPermission.isAllow
                          ? toggle.remove(value)
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
                  </>
                }
              >
                <Table
                  columns={columns}
                  rowKey="tableID"
                  tableLayout="fixed"
                  scroll={{
                    x: 1055,
                  }}
                  dataSource={
                    value?.table.map((tableValue) => {
                      return {
                        ...tableValue,
                        effectId: value.effectId,
                      };
                    }) ?? []
                  }
                  pagination={false}
                />
              </Card>
            );
          }
        )}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => toggle.create()}
          ghost
          disabled={!editPermission.isAllow}
        >
          <IntlMessage
            id={
              tokens.riskAssessment.riskTemplate.addEffect
            }
          />
        </Button>
        <TemplateRiskSettingEffectModal
          open={toggle.openCreate || toggle.openEdit}
          onClose={() => toggle.resetAll()}
          data={toggle?.data}
          assessmentId={assessmentId}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          okButtonProps={{
            loading: deleteEffect.isLoading,
          }}
          hasIdentifier={false}
          onOk={() =>
            deleteEffect.submit(
              toggle?.data?.effectId as number
            )
          }
        />
        <DeleteModal
          open={toggle.openReject}
          onCancel={() => toggle.reject()}
          okButtonProps={{
            loading: deleteEffectTable.isLoading,
          }}
          hasIdentifier={false}
          onOk={() =>
            deleteEffectTable.submit({
              effectId: toggle?.data?.effectId,
              tableId: toggle?.data?.tableID,
            })
          }
        />
        <TemplateRiskSettingEffectTableModal
          open={toggle.openChange || toggle.openDuplicate}
          isEditable={toggle.openChange}
          onClose={() => toggle.resetAll()}
          data={toggle?.data}
          assessmentId={assessmentId}
        />
      </Card>
    </FallbackError>
  );
};
