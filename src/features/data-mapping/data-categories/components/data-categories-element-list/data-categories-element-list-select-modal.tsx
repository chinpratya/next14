import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataElement,
  useListDataElement,
} from '../../../elements';
import { useCreateDataElementOfCategories } from '../../api/add-data-element-of-data-categories';

type DataElementsSelectModalProps = {
  open: boolean;
  onClose: () => void;
  dataCategoryID: string;
};

export const DataCategoriesElementListSelectModal = ({
  open,
  onClose,
  dataCategoryID,
}: DataElementsSelectModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const { page, pageSize, onPaginationChange } =
    usePagination();

  const { data, isLoading, isError } = useListDataElement(
    {
      search: debouncedSearch,
      pageSize,
      page,
      'data-category': dataCategoryID,
    }
  );

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'dataMapping.notification.dataCategories.dataElement.add'
      ) as string,
    });
    onClose();
  };

  const addDataElements =
    useCreateDataElementOfCategories({
      dataCategoryID,
      onSuccess,
    });

  const columns: ColumnsType<DataElement> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.detail.dataElement.add.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      className: 'text-capitalize',
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategories.detail.dataElement.add.table.dataClassification" />
      ),
      dataIndex: 'dataClassificationID',
      key: 'dataClassificationID',
      width: 150,
      className: 'text-capitalize',
      render: (dataClassification) => (
        <div style={{ width: '120px' }}>
          <ShowTagStatus
            key={dataClassification}
            status={dataClassification}
            items={[
              {
                key: 'general-data',
                label:
                  'dataMapping.dataCategoryPicker.dataClassifications.generalData',
                color: CANCELED_COLOR,
              },
              {
                key: 'personal-data',
                label:
                  'dataMapping.dataCategoryPicker.dataClassifications.personalData',
                color: PROCESSING_COLOR,
              },
              {
                key: 'sensitive-data',
                label:
                  'dataMapping.dataCategoryPicker.dataClassifications.sensitiveData',
                color: ERROR_COLOR,
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const onSubmit = () => {
    addDataElements.submit(rowSelection.selectedRowKeys);
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.dataCategories.detail.dataElement.add.title" />
      }
      open={open}
      onCancel={() => onClose()}
      onOk={onSubmit}
      okText={
        <IntlMessage id="dataMapping.dataCategories.detail.dataElement.add.select" />
      }
      okButtonProps={{
        loading: addDataElements.isLoading,
        disabled:
          rowSelection.selectedRowKeys.length === 0,
      }}
      afterClose={() => resetSelectedRowKeys()}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end" alignItems="center">
          <InputSearch
            onSearch={onSearch}
            className="mb-4"
          />
        </Flex>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{
            pageSize,
            current: page,
            total: data?.totalRecord,
            onChange: onPaginationChange,
          }}
          rowKey="dataElementID"
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          rowSelection={rowSelection}
        />
      </FallbackError>
    </Modal>
  );
};
