import {
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Typography } from 'antd';

import { Flex } from '@/components/share-components/flex';
import { Modal } from '@/components/share-components/modal';

type AssessmentSubmissionChangeTabModalProps = {
  open: boolean;
  currentTab: string;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
};

export const AssessmentSubmissionChangeTabModal = ({
  open,
  currentTab,
  loading,
  onOk,
  onCancel,
  onClose,
}: AssessmentSubmissionChangeTabModalProps) => {
  const tabLabel: Record<string, string> = {
    basicInfo: 'ข้อมูลพื้นฐาน',
  };

  return (
    <Modal
      open={open}
      closeIcon={<CloseOutlined onClick={onClose} />}
      onCancel={onClose}
      width={420}
      centered
      footer={null}
      destroyOnClose
    >
      <Flex>
        <ExclamationCircleOutlined
          style={{ color: '#FFC646', fontSize: 22 }}
        />
        <Flex flexDirection="column" className="ml-3">
          <Typography.Text
            className={css`
              font-size: 17px;
              font-weight: 600;
              margin-bottom: 9px;
            `}
          >
            คุณต้องการบันทึกหรือไม่?
          </Typography.Text>
          <Typography.Text
            className={css`
              color: #97a4b4;
              font-size: 15px;
            `}
          >
            คุณต้องการบันทึกในแท็บ {tabLabel[currentTab]}{' '}
            หรือไม่ ?
          </Typography.Text>
        </Flex>
      </Flex>
      <Flex justifyContent="end" className="mt-4">
        <Button className="mr-2" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={onOk}
        >
          ตกลง
        </Button>
      </Flex>
    </Modal>
  );
};
