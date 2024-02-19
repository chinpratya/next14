import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { useToggle } from '@mantine/hooks';
import {
  Button,
  Card,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { InputSearch } from '@components/input-search';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivity } from '../../api/list-activity';
import { ActivityType } from '../../types';
import { ActivityAssessmentList } from '../activity-assessment-list';
import { ActivityRiskAssessmentDialog } from '../activity-risk-assessment-dialog';

export const ActivityList = () => {
  const { debouncedSearch, search, onSearch } =
    useSearch();

  const [selectedActivityIds, setSelectedActivityIds] =
    useState<string[]>([]);

  const [openRiskAssessment, toggleRiskAssessment] =
    useToggle();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListActivity({
    page,
    pageSize,
    search: debouncedSearch,
  });
  const editPermission = usePermission({
    moduleName: 'assessment',
    policies: [
      permissions['pdpakit:assessment:activity:update'],
    ],
  });
  const { rowSelection } = useRowSelection({
    disabledRowKeys: editPermission.isAllow
      ? []
      : data?.data.map((value) => value.ObjectUUID),
  });

  const columns: ColumnsType<ActivityType> = [
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.activityId}
        />
      ),
      key: 'ObjectUUID',
      dataIndex: 'ObjectUUID',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.name}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 300,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.type}
        />
      ),
      key: 'type',
      dataIndex: 'type',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.group}
        />
      ),
      key: 'groupName',
      dataIndex: 'groupName',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.risk}
        />
      ),
      key: 'riskscore',
      dataIndex: 'riskscore',
      width: 120,
      ellipsis: true,
      className: 'text-capitalize',
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.status}
        />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 120,
      ellipsis: true,
      render: (status) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.riskAssessment.activity.tags}
        />
      ),
      key: 'tags',
      dataIndex: 'tagName',
      width: 200,
      ellipsis: true,
    },
    {
      key: 'action',
      width: 80,
      align: 'right',
      render: (activity) => (
        <>
          <Tooltip
            title={
              <IntlMessage
                id={
                  tokens.riskAssessment.activity
                    .assessRisk
                }
              />
            }
          >
            <FundProjectionScreenOutlined
              className="font-size-md cursor-pointer"
              onClick={() => {
                editPermission.isAllow
                  ? setSelectedActivityIds([
                      activity.ObjectUUID,
                    ])
                  : null;
                editPermission.isAllow
                  ? toggleRiskAssessment()
                  : null;
              }}
              style={{
                color: editPermission.isAllow
                  ? 'black'
                  : '#C4C4C4',
                cursor: editPermission.isAllow
                  ? 'pointer'
                  : 'not-allowed',
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const { filteredColumns, xScroll, ColumnTransfer } =
    useColumnFiltered({
      columns,
      disabledKeys: ['ObjectUUID', 'name'],
    });

  const onCloseAssessmentDialog = () => {
    setSelectedActivityIds([]);
    rowSelection.onChange([]);
    toggleRiskAssessment();
  };

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage
              id={tokens.riskAssessment.activity.list}
            />
            <Typography.Text
              className="ml-2"
              style={{
                fontSize: 14,
                fontWeight: 'normal',
              }}
            >
              {data?.totalRecord ?? 0}{' '}
              <IntlMessage id={tokens.common.items} />
            </Typography.Text>
          </>
        }
        extra={
          <>
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                setSelectedActivityIds(
                  rowSelection.selectedRowKeys as string[]
                );
                toggleRiskAssessment();
              }}
              // hidden={
              //   rowSelection.selectedRowKeys.length === 0
              // }
            >
              <IntlMessage
                id={
                  tokens.riskAssessment.activity
                    .assessRisk
                }
              />
            </Button>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="ObjectUUID"
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          tableLayout="fixed"
          loading={isLoading}
          scroll={{ x: xScroll }}
          rowSelection={rowSelection}
          expandable={{
            expandedRowRender: (record) => (
              <ActivityAssessmentList
                activityId={record?.ObjectUUID}
              />
            ),
          }}
        />
        <Pagination
          total={data?.totalRecord || 0}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <ActivityRiskAssessmentDialog
        open={openRiskAssessment}
        onClose={onCloseAssessmentDialog}
        activityIds={selectedActivityIds}
      />
    </FallbackError>
  );
};
