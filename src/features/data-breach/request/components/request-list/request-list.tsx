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
  numberOfEndRender,
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

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:update'],
    ],
  });

  const closePermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:close'],
    ],
  });

  const rejectPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:reject'],
    ],
  });
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

  const columns: ColumnsType<Request> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.requestId}
        />
      ),
      key: 'requestID',
      ellipsis: true,
      width: 150,
      render: requestIdRender(onEdit),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.requestType}
        />
      ),
      dataIndex: 'typeOfRequest',
      key: 'typeOfRequest',
      width: 250,
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
        <IntlMessage
          id={tokens.dataBreach.request.dataSubject}
        />
      ),
      dataIndex: 'identify',
      key: 'identify',
      width: 200,
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
        <IntlMessage
          id={tokens.dataBreach.request.workflowName}
        />
      ),
      dataIndex: 'workflowName',
      key: 'workflowName',
      width: 200,
      render: workflowRender,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.requestStatus}
        />
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
        <IntlMessage
          id={tokens.dataBreach.request.numberOfEnd}
        />
      ),
      dataIndex: 'numberOfEnd',
      key: 'numberOfEnd',
      width: 180,
      render: ({ value, type }) =>
        numberOfEndRender(value, type),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.createdDt}
        />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 180,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.endDate}
        />
      ),
      dataIndex: 'endDate',
      key: 'endDate',
      width: 180,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.timeReminded}
        />
      ),
      key: 'timeReminded',
      width: 330,
      ellipsis: true,
      render: endDateRender,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.risks}
        />
      ),
      key: 'riskAssessmentValue',
      dataIndex: 'riskAssessmentValue',
      className: 'text-capitalize',
      width: 180,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.tags}
        />
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
        onEdit: (request) => onEdit?.(request),
        onClose: toggle.closed,
        onReject: toggle.reject,
        permissionReject: !rejectPermission.isAllow,
        permissionClose: !closePermission.isAllow,
        permissionEdit: !editPermission.isAllow,
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
            <IntlMessage
              id={tokens.dataBreach.request.list}
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
            <RangePicker className="mr-2" />
            <Button
              icon={<UploadOutlined />}
              className="mr-2"
              onClick={() => exportRequest.submit()}
              loading={exportRequest.isLoading}
            >
              <IntlMessage id={tokens.common.export} />
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
