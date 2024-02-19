import { Col, Row, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import { useListUser, User } from '@/features/admin';
import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddWebformUser } from '../../api/add-webform-user';

type ModalAddWebformRequestModeratorProps = {
  open: boolean;
  onCancel: () => void;
  webformId: string;
  disableKey: string[];
};
export const ModalAddWebformRequestModerator = ({
  open,
  onCancel,
  webformId,
  disableKey,
}: ModalAddWebformRequestModeratorProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      disabledKey: 'userId',
      disabledRowKeys: disableKey,
    });

  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({ pageSize: 5 });

  const { data, isError, isLoading } = useListUser({
    page,
    pageSize,
    search: debouncedSearch,
  });

  const adduser = useAddWebformUser({
    webformId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.webform.notifications
            .addRequestModerator
        ) as string,
      });
      onCancel();
    },
  });

  const columns: ColumnsType<User> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.name}
        />
      ),
      key: 'name',
      width: 100,
      render: (data: User) => {
        return (
          <Typography>{`${data.first_name} ${data.last_name}`}</Typography>
        );
      },
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.email}
        />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 150,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.webform.organization}
        />
      ),
      key: 'organization_labels',
      dataIndex: 'organization_labels',
      width: 120,
      render: (Organization: string[]) => (
        <TagTooltipListChild list={Organization ?? []} />
      ),
    },
  ];

  const onSubmit = () => {
    adduser.submit(rowSelection.selectedRowKeys);
  };

  return (
    <Modal
      title={
        <IntlMessage
          id={tokens.dataBreach.webform.requestTitle}
        />
      }
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      okButtonProps={{ loading: adduser.isLoading }}
      afterClose={() => resetSelectedRowKeys()}
    >
      <FallbackError isError={isError}>
        <Row justify="end" align="middle">
          <Col>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2 ml-2"
              width={200}
              height={40}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          tableLayout="fixed"
          scroll={{ x: 300 }}
          dataSource={data?.data ?? []}
          pagination={false}
          rowSelection={rowSelection}
          rowKey="userId"
          loading={isLoading}
        />
        <Pagination
          total={data?.totalRecord}
          pageSize={pageSize}
          current={page}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
