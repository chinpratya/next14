// import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';

import {
  Purpose,
  PurposePicker,
  useAddActivityBasisPurpose,
  // useRemoveActivityBasisPurpose,
} from '@/features/data-mapping';
import {
  useSearch,
  usePagination,
  useColumnFiltered,
  useToggle,
  usePermission,
} from '@/hooks';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
// import { DeleteModal } from '@components/delete-modal';
// import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivityPurpose } from '../../api/list-activity-purpose';
import { ActivityPurpose } from '../../types';

import { ActivityPurposeModalDetail } from './activity-purpose-modal-detail';

type ActivityPurposeListProps = {
  activityId: string;
};

export const ActivityPurposeList = ({
  activityId,
}: ActivityPurposeListProps) => {
  const toggle = useToggle();
  const { showNotification } = useNotifications();

  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } =
    useListActivityPurpose({
      activityId,
      page,
      pageSize,
      search: debouncedSearch,
    });

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [
      permissions['pdpakit:consent:activity:update'],
    ],
  });

  const existingPurpose = data?.data.map(
    (purpose) => purpose.purposeID
  );

  const addPurpose = useAddActivityBasisPurpose({
    activityId,
    basisId: 'consent',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Add purpose success',
      });
      queryClient.invalidateQueries([
        consentManagementQueryKeys.activity.purpose(
          activityId
        ),
      ]);
      toggle.create();
    },
  });

  const onAddPurpose = (value: Purpose[]) => {
    const purposeId = _.map(value, (v) => v.purposeID);
    if (purposeId.length > 10) {
      showNotification({
        type: 'error',
        message: 'cannot select more than 10',
      });
    } else {
      addPurpose.submit(purposeId);
    }
  };

  // const removePurpose = useRemoveActivityBasisPurpose({
  //   activityId,
  //   basisId: 'consent',
  //   onSuccess: () => {
  //     showNotification({
  //       type: 'success',
  //       message: 'Remove purpose successfully',
  //     });
  //     queryClient.invalidateQueries([
  //       consentManagementQueryKeys.activity.purpose(
  //         activityId
  //       ),
  //     ]);
  //     toggle.remove();
  //   },
  // });

  const columns: ColumnsType<ActivityPurpose> = [
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityDetail.purpose.id" />
      ),
      dataIndex: 'purposeID',
      key: 'purposeID',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityDetail.purpose.name" />
      ),
      key: 'name',
      ellipsis: true,
      width: 200,
      render: (purpose: ActivityPurpose) => (
        <Typography.Link
          href={`/apps/datafence/consent-management/purpose/${purpose.purposeID}`}
        >
          {purpose?.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityDetail.purpose.purposeGroup" />
      ),
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityDetail.purpose.version" />
      ),
      dataIndex: 'version',
      key: 'version',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityDetail.purpose.createDate" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityDetail.purpose.lastUpdated" />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    // {
    //   key: 'action',
    //   width: 50,
    //   align: 'center',
    //   render: (purpose: ActivityPurpose) => (
    //     <DropdownTable
    //       items={[
    //         {
    //           key: 'delete',
    //           label: 'Delete',
    //           icon: <DeleteOutlined />,
    //           onClick: () => toggle.remove(purpose),
    //         },
    //       ]}
    //     />
    //   ),
    // },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
            <Button
              type="primary"
              ghost
              className="ml-2"
              onClick={() => toggle.create()}
              disabled={!editPermission.isAllow}
            >
              <IntlMessage id="consentManagement.activity.activityDetail.purpose.selectPurpose" />
            </Button>
          </>
        }
      >
        <Table
          rowKey="purposeID"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <PurposePicker
          loading={addPurpose.isLoading}
          open={toggle.openCreate}
          onClose={() => toggle.create()}
          onFinish={onAddPurpose}
          existingDataPurposeId={existingPurpose}
        />
        {/* <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onOk={() =>
            removePurpose.submit(toggle.data?.purposeID)
          }
          okButtonProps={{
            loading: removePurpose.isLoading,
          }}
        /> */}
      </Card>
      <ActivityPurposeModalDetail
        open={toggle.openEdit}
        onClose={() => toggle.edit()}
        purposeId={toggle.data?.purposeID}
      />
    </FallbackError>
  );
};
