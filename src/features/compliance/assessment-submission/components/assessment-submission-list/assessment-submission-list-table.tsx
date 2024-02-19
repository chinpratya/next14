import {
  EyeOutlined,
  SendOutlined,
  // HistoryOutlined,
  // CloseCircleOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';

import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import {
  useColumnFiltered,
  usePermission,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { DropdownTable } from '@components/dropdown-table';
import { NoneProfile } from '@components/none-profile';
import { ProgressBarWithInfo } from '@components/progress-bar-with-info';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssessmentSubmission } from '../../types';
import { AssessmentSubmissionCancelModal } from '../assessment-submission-cancel-modal';
import { AssessmentSubmissionExtendTimeModal } from '../assessment-submission-extend-time-modal';

export type AssessmentSubmissionListTableProps = {
  isLoading?: boolean;
  dataSource: AssessmentSubmission[];
  onPublish?: (value: AssessmentSubmission) => void;
  onSelected?: () => void;
};

export const AssessmentSubmissionListTable = ({
  isLoading,
  dataSource,
  onPublish,
  onSelected,
}: AssessmentSubmissionListTableProps) => {
  const router = useRouter();
  const toggle = useToggle<AssessmentSubmission>();

  const onCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  const createPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:submission:create'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:submission:read'],
    ],
  });

  const sendPermission = usePermission({
    moduleName: 'compliance',
    policies: [
      permissions['pdpakit:compliance:submission:send'],
    ],
  });

  const columns: ColumnsType<AssessmentSubmission> = [
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.name" />
      ),
      key: 'name',
      width: 150,
      ellipsis: true,
      fixed: 'left',
      render: ({
        ObjectUUID,
        name,
      }: AssessmentSubmission) => (
        <Typography.Link
          href={`${router.pathname}/${ObjectUUID}`}
          disabled={!readPermission.isAllow}
        >
          {name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.assessmentName" />
      ),
      dataIndex: 'assessmentName',
      key: 'assessmentName',
      width: 170,
      ellipsis: true,
    },
    // {
    //   title: 'กลุ่มการประเมิน',
    //   dataIndex: 'group',
    //   width: 130,
    //   key: 'group',
    // },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.dueDate" />
      ),
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 150,
      render: (date: string) => (
        <ShowPassTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) => (
        <ShowTagStatus
          items={[
            {
              color: '#323A45',
              key: 'draft',
              label: tokens.common.status.draft,
            },
            {
              color: '#FFC542',
              key: 'publish',
              label: tokens.common.status.publish,
            },
            {
              color: '#47B2FF',
              key: 'waiting_send',
              label: tokens.common.status.waitingSend,
            },
            {
              color: '#A461D8',
              key: 'ready_to_send',
              label: tokens.common.status.readySend,
            },
            {
              color: '#FFC542',
              key: 'in_progress',
              label: tokens.common.status.processing,
            },
            {
              color: '#04D182',
              key: 'success',
              label: tokens.common.status.done,
            },
            {
              color: '#EE0D0D',
              key: 'cancel',
              label: tokens.common.status.cancelled,
            },
          ]}
          status={status}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.orgCount" />
      ),
      key: 'org.count',
      width: 130,
      render: (assessment: AssessmentSubmission) => (
        <ProgressBarWithInfo
          count={assessment?.org?.count}
          total={assessment?.org?.total}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.respondent" />
      ),
      key: 'respondent.count',
      width: 140,
      render: (assessment: AssessmentSubmission) => (
        <ProgressBarWithInfo
          count={assessment?.respondent?.count}
          total={assessment?.respondent?.total}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.sendBy" />
      ),
      dataIndex: 'sendBy',
      key: 'sendBy',
      align: 'center',
      width: 100,
      render: (sendBy: string) => (
        <>
          {sendBy ? <NoneProfile title={sendBy} /> : '-'}
        </>
      ),
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (assessment: AssessmentSubmission) => (
        <DropdownTable
          items={[
            {
              key: 'detail',
              label: (
                <IntlMessage id="compliance.assessmentSubmission.view" />
              ),
              icon: <EyeOutlined />,
              onClick: () =>
                router.push(
                  `${router.pathname}/${assessment.ObjectUUID}`
                ),
              disabled: !readPermission.isAllow,
            },
            {
              key: 'publish',
              label: (
                <IntlMessage id="compliance.assessmentSubmission.publish" />
              ),
              icon: <SendOutlined />,
              disabled:
                !['ready_to_send'].includes(
                  assessment.status
                ) || !sendPermission.isAllow,
              onClick: () => onPublish?.(assessment),
            },
            //   {
            //     key: 'extendTime',
            //     label: 'ขยายเวลา',
            //     icon: <HistoryOutlined />,
            //     onClick: () => {
            //       toggle.preview(assessment);
            //     },
            //   },
            //   {
            //     key: 'cancel',
            //     label: 'ยกเลิก',
            //     icon: <CloseCircleOutlined />,
            //     onClick: () => toggle.remove(assessment),
            //   },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <>
      <Flex justify="end" gap="sm" className="mb-4">
        <Button
          type="primary"
          onClick={onCreate}
          disabled={!createPermission.isAllow}
        >
          <IntlMessage id="compliance.assessmentSubmission.selectAssessment" />
        </Button>
        {ColumnTransfer}
      </Flex>
      <Table
        tableLayout="fixed"
        rowKey="ObjectUUID"
        columns={filteredColumns}
        dataSource={dataSource}
        loading={isLoading}
        scroll={{ x: 'scroll' }}
        pagination={false}
      />
      <AssessmentSubmissionExtendTimeModal
        open={toggle.openPreview}
        assessmentId={toggle?.data?.ObjectUUID}
        onCancel={() => toggle.preview()}
      />
      <AssessmentSubmissionCancelModal
        open={toggle.openRemove}
        assessmentId={toggle?.data?.ObjectUUID}
        onCancel={() => toggle.remove()}
      />
    </>
  );
};
