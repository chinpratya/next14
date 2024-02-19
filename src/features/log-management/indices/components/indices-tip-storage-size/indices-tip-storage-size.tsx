import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

type IndicesTipStorageSizeProps = {
  open: boolean;
  onCancel: () => void;
};

export const IndicesTipStorageSize = ({
  open,
  onCancel,
}: IndicesTipStorageSizeProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      centered
      footer={null}
      onCancel={onCancel}
      title={t(
        'logManagement.indices.suggestion.storage'
      )}
    >
      <Typography.Text>
        {t(
          'logManagement.indices.suggestion.storage.description'
        )}
      </Typography.Text>
    </Modal>
  );
};
