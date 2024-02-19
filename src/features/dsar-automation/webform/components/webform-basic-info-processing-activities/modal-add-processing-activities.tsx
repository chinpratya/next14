import { Col, Row, Table, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { useListActivity } from '@/features/data-mapping';
import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { ConsentFormType } from '@/types';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddWebformActivity } from '../../api/add-webform-activty';
import { useGetWebformTemplate } from '../../api/get-webform-template';

type ModalAddProcessingActivitiesProps = {
  open: boolean;
  onCancel: () => void;
  webformId: string;
  disableKey: string[];
};

export const ModalAddProcessingActivities = ({
  open,
  onCancel,
  webformId,
  disableKey,
}: ModalAddProcessingActivitiesProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const webformTemplate =
    useGetWebformTemplate(webformId);
  const { formItems, formSetting, formConditions } =
    useConsentBuilderStore();

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      disabledKey: 'ObjectUUID',
      disabledRowKeys: disableKey,
    });

  const { debouncedSearch, onSearch } = useSearch();

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
    status: 'active',
  });

  const addActivity = useAddWebformActivity({
    webformId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.webForm.activityProcessing.add'
        ) as string,
      });
      onCancel();
    },
  });

  const columns = [
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.group" />
      ),
      key: 'group',
      dataIndex: 'group',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.tag" />
      ),
      key: 'tagName',
      dataIndex: 'tagName',
      width: 100,
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
  ];
  const onSubmit = () => {
    addActivity.submit({
      activityId: rowSelection.selectedRowKeys,
      form: {
        formItems: formItems ?? [],
        formSetting: formSetting ?? {},
        formConditions: formConditions ?? [],
      } as ConsentFormType,
      formLanguage: webformTemplate?.data?.Language,
    });
  };

  return (
    <Modal
      title={
        <IntlMessage id="dsarAutomation.setting.webForm.detail.basicInfo.activity.title" />
      }
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      okButtonProps={{ loading: addActivity.isLoading }}
      afterClose={() => resetSelectedRowKeys()}
    >
      <FallbackError isError={isError}>
        <Row justify={'end'} align={'middle'}>
          <Col>
            <InputSearch
              onSearch={onSearch}
              className="mr-2 ml-2"
              width={200}
              height={40}
            />
          </Col>
        </Row>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data?.data ?? []}
          pagination={false}
          loading={isLoading}
          tableLayout="fixed"
          scroll={{ x: 300 }}
          rowKey="ObjectUUID"
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
