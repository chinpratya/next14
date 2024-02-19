import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserSwitchOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Table, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSend } from 'react-icons/bs';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  useColumnFiltered,
  usePermission,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListAssessmentSubmissionRespondents } from '../../api/list-assessment-submission-respondents';
import { usePublishAssessmentSubmissionRespondent } from '../../api/publish-assessment-submission-respondent';
import { AssessmentSubmissionRespondents } from '../../types';
import { AssessmentSubmissionConfirmModal } from '../assessment-submission-confirm-modal';
import { AssessmentSubmissionRespondentAddRespondentModal } from '../assessment-submission-respondent-add-respondent-modal';
import { AssessmentSubmissionRespondentChangeApproverModal } from '../assessment-submission-respondent-change-approver-modal';
import { AssessmentSubmissionRespondentDeleteModal } from '../assessment-submission-respondent-delete-modal';
import { AssessmentSubmissionRespondentExtendTimeModal } from '../assessment-submission-respondent-extend-time-modal';
import { AssessmentSubmissionRespondentsModal } from '../assessment-submission-respondent-modal';

export type ListRespondentsProps = {
  assessmentId: string;
  navigation: { organization: string; branch: string };
  assessmentStatus: string;
};

export const ListRespondents = ({
  assessmentId,
  navigation,
  assessmentStatus,
}: ListRespondentsProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotifications();

  const toggle =
    useToggle<AssessmentSubmissionRespondents>();
  const [selectRespondent, setSelectRespondent] =
    useState<React.Key[]>([]);

  const [disable, setDisable] = useState({
    extendTime: true,
    changeApprover: true,
    removeApprover: true,
  });

  const { data, isLoading, isError } =
    useListAssessmentSubmissionRespondents({
      assessmentId,
      branchId: navigation.branch,
      organizationId: navigation.organization,
      enabled: navigation.branch ? true : false,
    });

  const publishRespondent =
    usePublishAssessmentSubmissionRespondent({
      assessmentId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'compliance.notification.assessmentSubmission.respondent.publish'
          ) as string,
        });
        toggle.publish();
      },
    });

  const createPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:submission:create'],
    ],
  });

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: AssessmentSubmissionRespondents[]
    ) => {
      const length = selectedRowKeys.length;
      const disableExtendTime = selectedRows.some(
        (item) => item.status !== 'overdue'
      );

      const isValidChange = selectedRows.every(
        ({ status }) =>
          status &&
          !['approve', 'reject', 'cancel'].includes(
            status
          )
      );

      const isValidRemove =
        length === 1
          ? selectedRows[0].status
            ? ['approve', 'reject', 'cancel'].includes(
                selectedRows[0].status
              )
            : true
          : true;

      setSelectRespondent(selectedRowKeys);
      setDisable({
        extendTime:
          length !== 1 ? true : disableExtendTime,
        changeApprover:
          length < 1 ? true : !isValidChange,
        removeApprover: isValidRemove,
      });
    },
  };

  const handleClick = (
    respondent: AssessmentSubmissionRespondents
  ) => {
    if (!respondent.status) return;
    toggle.edit(respondent);
  };

  const onPublish = () => {
    publishRespondent.submit({
      assessmentSubmissionId: assessmentId,
      respondentId: toggle.data.respondentID,
    });
  };

  const columns: ColumnsType<AssessmentSubmissionRespondents> =
    [
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.name" />
        ),
        key: 'name',
        width: 150,
        render: (
          respondent: AssessmentSubmissionRespondents
        ) => (
          <Typography.Link
            onClick={() => handleClick(respondent)}
          >
            {respondent.name}
          </Typography.Link>
        ),
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.email" />
        ),
        key: 'email',
        width: 250,
        dataIndex: 'email',
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.approver" />
        ),
        key: 'approverName',
        width: 150,
        dataIndex: 'approverName',
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.status" />
        ),
        key: 'status',
        width: 130,
        dataIndex: 'status',
        render: (status: string) => (
          <ShowTagStatus
            status={status}
            items={[
              {
                label: tokens.common.status.draft,
                key: 'draft',
                color: '#323A45',
              },
              {
                label: tokens.common.status.waitingSend,
                key: 'waiting_send',
                color: '#47B2FF',
              },
              {
                label:
                  tokens.common.status.waitingInProgress,
                key: 'waiting_progress',
                color: '#F0853E',
              },
              {
                label: tokens.common.status.inProgress,
                key: 'in_progress',
                color: '#FFC542',
              },
              {
                label: tokens.common.status.approve,
                key: 'approve',
                color: '#407BFF',
              },
              {
                label: tokens.common.status.reject,
                key: 'reject',
                color: '#EC155B',
              },
              {
                label:
                  tokens.common.status.waitingApprove,
                key: 'waiting_approve',
                color: '#EF5DA8',
              },
              {
                label: tokens.common.status.waitingUpdate,
                key: 'waiting_update',
                color: '#466D1E',
              },
              {
                label: tokens.common.status.readySend,
                key: 'ready_to_send',
                color: '#A461D8',
              },
              {
                label: tokens.common.status.overdue,
                key: 'overdue',
                color: '#9E0E03',
              },
              {
                label: tokens.common.status.cancelled,
                key: 'cancel',
                color: '#EE0D0D',
              },
            ]}
          />
        ),
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.dueDate" />
        ),
        key: 'dueDate',
        width: 140,
        dataIndex: 'dueDate',
        render: (date: string) => (
          <ShowPassTagDate date={date} />
        ),
      },
      {
        title: (
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.isExtendTime" />
        ),
        key: 'isExtendTime',
        width: 150,
        dataIndex: 'isExtendTime',
        render: (isExtendTime: boolean) =>
          isExtendTime ? (
            <IntlMessage id="compliance.assessmentSubmission.detail.respondent.isExtendTime.true" />
          ) : (
            <IntlMessage id="compliance.assessmentSubmission.detail.respondent.isExtendTime.false" />
          ),
      },
      {
        key: 'action',
        width: 50,
        fixed: 'right',
        render: (
          respondent: AssessmentSubmissionRespondents
        ) => (
          <DropdownTable
            items={[
              {
                key: 'send',
                label: (
                  <IntlMessage id="compliance.assessmentSubmission.detail.respondent.send" />
                ),
                icon: <BsSend />,
                disabled:
                  assessmentStatus !== 'in_progress'
                    ? true
                    : respondent.status ===
                      'ready_to_send'
                    ? false
                    : true,
                onClick: () => toggle.publish(respondent),
              },
              {
                key: 'edit',
                label: (
                  <IntlMessage id="compliance.assessmentSubmission.detail.respondent.view" />
                ),
                icon: <EyeOutlined />,
                disabled: !respondent.status,
                onClick: () => toggle.edit(respondent),
              },
              {
                key: 'delete',
                label: (
                  <IntlMessage id="compliance.assessmentSubmission.detail.respondent.cancel" />
                ),
                disabled:
                  respondent.status === 'cancel' ||
                  respondent.status === 'approve',
                icon: <CloseCircleOutlined />,
                onClick: () => toggle.remove(respondent),
              },
              {
                key: 'divider',
                type: 'divider',
              },
              {
                key: 'extend-time',
                label: (
                  <IntlMessage id="compliance.assessmentSubmission.detail.respondent.extendTime" />
                ),
                icon: <ClockCircleOutlined />,
                disabled: respondent.status !== 'overdue',
                onClick: () => toggle.choose(respondent),
              },
              {
                key: 'change-approver',
                label: (
                  <IntlMessage id="compliance.assessmentSubmission.detail.respondent.changeApprover" />
                ),
                icon: <UserSwitchOutlined />,
                disabled: [
                  'approve',
                  'reject',
                  'cancel',
                ].includes(respondent.status as string),
                onClick: () => toggle.change(respondent),
              },
              {
                key: 'view-assessment-results',
                label: (
                  <IntlMessage id="compliance.assessmentSubmission.detail.respondent.assessmentResult" />
                ),
                icon: <FundViewOutlined />,
                disabled:
                  (respondent.status as string) !==
                  'approve',
                onClick: () =>
                  router.push(
                    `${router.asPath}/${respondent.ObjectUUID}`
                  ),
              },
            ]}
          />
        ),
      },
    ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered<AssessmentSubmissionRespondents>({
      columns,
    });

  useEffect(() => {
    setSelectRespondent([]);
    setDisable({
      changeApprover: true,
      extendTime: true,
      removeApprover: true,
    });
  }, [data]);

  return (
    <FallbackError isError={isError}>
      <Flex justifyContent="between" className="mb-3">
        <Flex justifyContent="start">
          <Tooltip
            title={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.extendTime.tooltip" />
            }
          >
            <Button
              disabled={disable.extendTime}
              onClick={() => toggle.choose()}
            >
              <ClockCircleOutlined />
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.changeApprover.tooltip" />
            }
          >
            <Button
              disabled={disable.changeApprover}
              className="ml-2"
              onClick={() => toggle.change()}
            >
              <UserSwitchOutlined />
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <IntlMessage id="compliance.assessmentSubmission.detail.respondent.cancel.tooltip" />
            }
          >
            <Button
              disabled={disable.removeApprover}
              className="ml-2"
              onClick={() => toggle.remove()}
            >
              <CloseCircleOutlined />
            </Button>
          </Tooltip>
        </Flex>

        <Flex justifyContent="end">
          <Button
            type="primary"
            onClick={toggle.create}
            disabled={
              ![
                'draft',
                'waiting_send',
                'ready_to_send',
                'in_progress',
              ].includes(assessmentStatus) ||
              !createPermission.isAllow
            }
            className="mr-2"
            ghost
          >
            <IntlMessage id="compliance.assessmentSubmission.detail.respondent.addRespondent" />
          </Button>
          {ColumnTransfer}
        </Flex>
      </Flex>

      <Flex
        className={css`
          padding: 6px 16px;
          margin-bottom: 4px;
          background-color: #ebefff;
        `}
      >
        <Typography>
          {selectRespondent.length}/{data?.data?.length}{' '}
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.items" />
        </Typography>
      </Flex>
      <Table
        rowKey="ObjectUUID"
        columns={filteredColumns}
        tableLayout="fixed"
        scroll={{ x: 'scroll' }}
        loading={isLoading}
        dataSource={data?.data}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
          selectedRowKeys: selectRespondent,
          fixed: 'left',
          columnWidth: 40,
        }}
        pagination={false}
      />

      {toggle.openEdit && (
        <AssessmentSubmissionRespondentsModal
          assessmentId={assessmentId}
          respondentId={toggle.data?.ObjectUUID}
          open={toggle.openEdit}
          onCancel={toggle.edit}
        />
      )}
      {toggle.openRemove && (
        <AssessmentSubmissionRespondentDeleteModal
          assessmentId={assessmentId}
          respondentId={
            toggle.data?.ObjectUUID ?? selectRespondent[0]
          }
          open={toggle.openRemove}
          onCancel={toggle.remove}
        />
      )}
      {toggle.openChoose && (
        <AssessmentSubmissionRespondentExtendTimeModal
          assessmentId={assessmentId}
          respondentId={
            toggle.data?.ObjectUUID ?? selectRespondent[0]
          }
          open={toggle.openChoose}
          onCancel={toggle.choose}
        />
      )}
      {toggle.openChange && (
        <AssessmentSubmissionRespondentChangeApproverModal
          navigation={navigation}
          assessmentId={assessmentId}
          respondent={toggle.data}
          respondentId={selectRespondent as string[]}
          open={toggle.openChange}
          onCancel={toggle.change}
        />
      )}

      <AssessmentSubmissionRespondentAddRespondentModal
        assessmentId={assessmentId}
        open={toggle.openCreate}
        onCancel={toggle.create}
      />

      <AssessmentSubmissionConfirmModal
        open={toggle.openPublish}
        onCancel={toggle.publish}
        onSubmit={onPublish}
        width={450}
        header={
          <IntlMessage id="compliance.assessmentSubmission.detail.respondent.confirm" />
        }
        loading={publishRespondent.isLoading}
      />
    </FallbackError>
  );
};
