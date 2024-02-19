import { Table } from 'antd';

import { useRowSelection } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useAddWebformLanguage } from '../../../api/add-webform-language';
import { useGetWebformMeta } from '../../../api/get-webform-meta';
import { useListWebformLanguage } from '../../../api/list-webform-language';

export type AddLanguageModalProps = {
  webformId: string;
  open?: boolean;
  onClose?: () => void;
};

export const AddLanguageModal = ({
  webformId,
  open,
  onClose,
}: AddLanguageModalProps) => {
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } =
    useGetWebformMeta();

  const {
    data: webformLanguages,
    isLoading: isWebformLanguagesLoading,
    isError: isWebformLanguagesError,
  } = useListWebformLanguage(webformId);

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'radio',
      disabledKey: 'ObjectUUID',
      disabledRowKeys: webformLanguages?.map(
        (language) => language.LanguageID
      ),
    });

  const addWebformLanguage = useAddWebformLanguage({
    webformId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Language added successfully',
      });
      onClose?.();
    },
  });

  const onOk = () => {
    addWebformLanguage.submit(
      rowSelection.selectedRowKeys[0]
    );
  };

  return (
    <Modal
      title="Add Language"
      open={open}
      onCancel={onClose}
      onOk={onOk}
      okButtonProps={{
        loading: addWebformLanguage.isLoading,
        disabled: !rowSelection.selectedRowKeys.length,
      }}
      afterClose={() => resetSelectedRowKeys()}
    >
      <FallbackError
        isError={isError || isWebformLanguagesError}
      >
        <Table
          rowKey="ObjectUUID"
          columns={[
            {
              title: 'Language',
              dataIndex: 'name',
              key: 'name',
            },
          ]}
          dataSource={data?.Language}
          loading={isLoading || isWebformLanguagesLoading}
          pagination={false}
          rowSelection={rowSelection}
        />
      </FallbackError>
    </Modal>
  );
};
