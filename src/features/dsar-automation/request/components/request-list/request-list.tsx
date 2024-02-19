import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import _ from 'lodash';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
  useRangePicker,
  useFilter,
  usePermission,
} from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { InputSearch } from '@components/input-search';
import { renderDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useExportRequest } from '../../api/export-request';
import { useGetRequestFilter } from '../../api/get-request-filter';
import { useListRequest } from '../../api/list-request';
import { Request } from '../../types';
import { RequestCloseModal } from '../request-close-modal';
import { RequestRejectModal } from '../request-reject-modal';

import {
  requestIdRender,
  columnStatusRender,
  actionRender,
  workflowRender,
  tagRender,
  endDateRender,
} from './request-list-column-renders';

export type RequestListProps = {
  onEdit?: (request: Request) => void;
};

export const RequestList = ({
  onEdit,
}: RequestListProps) => {
  const toggle = useToggle();
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { startDate, endDate, RangePicker } =
    useRangePicker({
      disabledFuture: true,
    });

  const { filters, filterDropdown, columnFilter } =
    useFilter<Request>();

  const { data: filterData } = useGetRequestFilter();

  const exportRequest = useExportRequest({
    search: debouncedSearch,
    startDate,
    endDate,
    filters,
    onSuccess: (url) => {
      window.open(url, '_blank');
    },
  });

  const { data, isLoading, isError } = useListRequest({
    search: debouncedSearch,
    page,
    pageSize,
    startDate,
    endDate,
    filters,
  });

  const rejectPermission = usePermission({
    moduleName: 'dsar',
    policies: [
      permissions['pdpakit:dsar:request:reject'],
    ],
  });

  const closePermission = usePermission({
    moduleName: 'dsar',
    policies: [permissions['pdpakit:dsar:request:close']],
  });

  const columns: ColumnsType<Request> = [
    {
      title: (
        <IntlMessage id="dsarAutomation.request.requestId" />
      ),
      key: 'requestID',
      ellipsis: true,
      width: 150,
      render: requestIdRender(onEdit),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.typeOfRequest" />
      ),
      dataIndex: 'typeOfRequest',
      key: 'typeOfRequest',
      width: 150,
      ellipsis: true,
      filteredValue: _.get(
        filters,
        'typeOfRequest',
        []
      ) as FilterValue,
      filters: _.get(
        filterData,
        'typeOfRequest',
        []
      )?.map((item) => ({
        text: item.name,
        value: item.ObjectUUID,
      })),
      ...columnFilter(),
      filterDropdown: filterDropdown('typeOfRequest'),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.identifyType" />
      ),
      dataIndex: 'identifyType',
      key: 'identifyType',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.identify" />
      ),
      dataIndex: 'identify',
      key: 'identify',
      width: 150,
      ellipsis: true,
      filters: _.get(filterData, 'identify', [])?.map(
        (item) => ({
          text: item.name,
          value: item.ObjectUUID,
        })
      ),
      ...columnFilter(),
      filterDropdown: filterDropdown('identify'),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.activityName" />
      ),
      dataIndex: 'activityName',
      key: 'activityName',
      width: 200,
      ellipsis: true,
      filters: _.get(filterData, 'activity', [])?.map(
        (item) => ({
          text: item.name,
          value: item.ObjectUUID,
        })
      ),
      ...columnFilter(),
      filterDropdown: filterDropdown('activity'),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.workflowName" />
      ),
      dataIndex: 'workflowName',
      key: 'workflowName',
      width: 200,
      render: workflowRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.requestStatus" />
      ),
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      width: 130,
      render: columnStatusRender,
      filteredValue: _.get(
        filters,
        'requestStatus',
        []
      ) as FilterValue,
      filters: _.get(
        filterData,
        'requestStatus',
        []
      )?.map((item) => ({
        text: item.name,
        value: item.ObjectUUID,
      })),
      ...columnFilter(),
      filterDropdown: filterDropdown('requestStatus'),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.numberOfEnd" />
      ),
      dataIndex: 'numberOfEnd',
      key: 'numberOfEnd',
      width: 180,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.createdDt" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 180,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.endDate" />
      ),
      dataIndex: 'endDate',
      key: 'endDate',
      width: 180,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.timeReminded" />
      ),
      key: 'timeReminded',
      width: 330,
      ellipsis: true,
      render: endDateRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.tagName" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      width: 150,
      render: tagRender,
      filters: _.get(filterData, 'tagName', [])?.map(
        (item) => ({
          text: item.name,
          value: item.ObjectUUID,
        })
      ),
      ...columnFilter(),
      filterDropdown: filterDropdown('tagName'),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      fixed: 'right',
      render: actionRender({
        onClose: toggle.closed,
        onReject: toggle.reject,
        permissionReject: !rejectPermission.isAllow,
        permissionClose: !closePermission.isAllow,
      }),
    },
  ];

  const { filteredColumns, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage id="dsarAutomation.request.list" />
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
            <RangePicker className="mr-2" />
            <Button
              icon={<UploadOutlined />}
              className="mr-2"
              onClick={() => exportRequest.submit()}
              loading={exportRequest.isLoading}
            >
              <IntlMessage id="dsarAutomation.request.export" />
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
          rowKey="requestID"
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <RequestCloseModal
          open={toggle.openClosed}
          onCancel={() => toggle.resetAll()}
          requestId={toggle?.data?.requestID}
        />
        <RequestRejectModal
          open={toggle.openReject}
          onCancel={() => toggle.resetAll()}
          requestId={toggle?.data?.requestID}
        />
      </Card>
    </FallbackError>
  );
};
