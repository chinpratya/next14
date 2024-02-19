import { DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { RespondentDataSource } from '../../types';

export type ListRespondentsProps = {
  dataSource: RespondentDataSource[];
  debouncedSearch: string;
  onDeleteRespondentDraft: (
    value: RespondentDataSource
  ) => void;
  isHaveApprover?: boolean;
};

export const ListRespondents = ({
  dataSource,
  debouncedSearch,
  onDeleteRespondentDraft,
  isHaveApprover,
}: ListRespondentsProps) => {
  const columns: ColumnsType<RespondentDataSource> = [
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.index" />
      ),
      key: 'index',
      width: 70,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.name" />
      ),
      key: 'name',
      width: 150,
      dataIndex: 'name',
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.email" />
      ),
      key: 'email',
      width: 150,
      dataIndex: 'email',
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.approverName" />
      ),
      key: 'approverName',
      width: 150,
      ellipsis: true,
      dataIndex: 'approverName',
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.approverEmail" />
      ),
      key: 'approver_email',
      width: 150,
      dataIndex: 'approverEmail',
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.organization" />
      ),
      key: 'organization',
      width: 150,
      dataIndex: 'organizationName',
    },
    {
      title: (
        <IntlMessage id="compliance.assessmentSubmission.create.respondent.branch" />
      ),
      key: 'branch',
      width: 150,
      dataIndex: 'branchName',
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (respondent: RespondentDataSource) => (
        <DropdownTable
          items={[
            {
              key: 'delete',
              label: (
                <IntlMessage id="compliance.assessmentSubmission.create.respondent.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () =>
                onDeleteRespondentDraft(respondent),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <Flex
        className={css`
          padding: 6px 16px;
          margin-bottom: 4px;
          background-color: #ebefff;
        `}
      >
        <Typography>
          {dataSource?.length}{' '}
          <IntlMessage id="compliance.assessmentSubmission.create.respondent.items" />
        </Typography>
      </Flex>
      <Table
        scroll={{ x: 980 }}
        rowKey="ObjectUUID"
        columns={
          isHaveApprover
            ? columns
            : columns.filter(
                (column) =>
                  !column.key
                    ?.toString()
                    .toLocaleLowerCase()
                    .includes('approver')
              )
        }
        dataSource={dataSource?.filter((item) =>
          item.name
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        )}
        pagination={false}
      />
    </>
  );
};
