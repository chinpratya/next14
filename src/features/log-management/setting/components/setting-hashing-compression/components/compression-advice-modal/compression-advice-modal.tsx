import { Flex } from '@mantine/core';
import { Modal, Typography } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

type CompressionAdviceModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const CompressionAdviceModal = ({
  open,
  onCancel,
}: CompressionAdviceModalProps) => {
  return (
    <Modal
      title={
        <IntlMessage id="logManagement.setting.compressionTips.title" />
      }
      open={open}
      onCancel={onCancel}
      centered
      width={600}
      footer={null}
    >
      <Flex direction="column" gap="sm">
        <Typography.Text>
          <IntlMessage id="logManagement.setting.compressionTips.gzip" />
        </Typography.Text>
        <Typography.Text>
          <IntlMessage id="logManagement.setting.compressionTips.lzo" />
        </Typography.Text>
        <Typography.Text>
          <IntlMessage id="logManagement.setting.compressionTips.lz4" />
        </Typography.Text>
      </Flex>
    </Modal>
  );
};
