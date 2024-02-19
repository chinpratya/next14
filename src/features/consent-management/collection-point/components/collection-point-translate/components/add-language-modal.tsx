import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { useRowSelection } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddCollectionPointLanguage } from '../../../api/add-collection-point-language';
import { useGetCollectionPointMeta } from '../../../api/get-collection-point-meta';
import { useListCollectionPointLanguage } from '../../../api/list-collection-point-language';

export type AddLanguageModalProps = {
  collectionPointId: string;
  open?: boolean;
  onClose?: () => void;
};

export const AddLanguageModal = ({
  collectionPointId,
  open,
  onClose,
}: AddLanguageModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useGetCollectionPointMeta();

  const {
    data: collectionPointLanguages,
    isLoading: isCollectionPointLanguagesLoading,
    isError: isCollectionPointLanguagesError,
  } = useListCollectionPointLanguage(collectionPointId);

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'radio',
      disabledKey: 'ObjectUUID',
      disabledRowKeys: collectionPointLanguages?.map(
        (language) => language.languageID
      ),
    });

  const addCollectionPointLanguage =
    useAddCollectionPointLanguage({
      collectionPointId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'consentManagement.notification.collectionPoint.translate.add'
          ) as string,
        });
        onClose?.();
      },
    });

  const onOk = () => {
    addCollectionPointLanguage.submit(
      rowSelection.selectedRowKeys[0]
    );
  };

  return (
    <Modal
      title={
        <IntlMessage id="consentManagement.collectionPoint.translate.add" />
      }
      open={open}
      onCancel={onClose}
      onOk={onOk}
      okButtonProps={{
        loading: addCollectionPointLanguage.isLoading,
        disabled: !rowSelection.selectedRowKeys.length,
      }}
      afterClose={() => resetSelectedRowKeys()}
    >
      <FallbackError
        isError={
          isError || isCollectionPointLanguagesError
        }
      >
        <Table
          rowKey="ObjectUUID"
          columns={[
            {
              title: (
                <IntlMessage id="consentManagement.collectionPoint.translate.name" />
              ),
              dataIndex: 'name',
              key: 'name',
            },
          ]}
          dataSource={data?.language}
          loading={
            isLoading || isCollectionPointLanguagesLoading
          }
          pagination={false}
          rowSelection={rowSelection}
          scroll={{ y: 500 }}
        />
      </FallbackError>
    </Modal>
  );
};
