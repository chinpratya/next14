import { Flex } from '@mantine/core';
import { Modal, Typography } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

type HashingAdviceModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const HashingAdviceModal = ({
  open,
  onCancel,
}: HashingAdviceModalProps) => {
  return (
    <Modal
      title={
        <IntlMessage id="logManagement.setting.hashTips.title" />
      }
      open={open}
      onCancel={onCancel}
      centered
      footer={null}
    >
      <Flex direction="column" gap="sm">
        <Typography.Text>
          <IntlMessage id="logManagement.setting.hashTips.content" />
        </Typography.Text>
        <Typography.Text>MD5</Typography.Text>
        <Typography.Text>SHA1</Typography.Text>
        <Typography.Text>SHA256</Typography.Text>
        <Typography.Text>SHA512</Typography.Text>
      </Flex>
    </Modal>
  );
};
