import { ExclamationCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Typography } from 'antd';

import { Flex } from '@/components/share-components/flex';
import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

type AssessmentSubmissionConfirmModalProps = {
  open: boolean;
  message?: string;
  loading?: boolean;
  header?: string | React.ReactNode;
  width?: number;
  onSubmit?: () => void;
  onCancel: () => void;
};

export const AssessmentSubmissionConfirmModal = ({
  open,
  message,
  loading,
  header,
  width,
  onSubmit,
  onCancel,
}: AssessmentSubmissionConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width={width ? width : 480}
      centered
      footer={null}
      zIndex={1010}
    >
      <Flex>
        <ExclamationCircleOutlined
          style={{ color: '#FFC646', fontSize: 22 }}
        />
        <Flex flexDirection="column" className="ml-3">
          <Typography.Text
            strong
            className={css`
              font-size: 17px;
            `}
          >
            {header}
          </Typography.Text>
          <Typography.Text
            className={css`
              color: #97a4b4;
              margin-top: 4px;
              font-size: 15px;
            `}
          >
            {message}
          </Typography.Text>
        </Flex>
      </Flex>
      <Flex justifyContent="end" className="mt-4">
        <Button className="mr-2" onClick={onCancel}>
          <IntlMessage id="compliance.assessmentSubmission.cancel" />
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          <IntlMessage id="compliance.assessmentSubmission.ok" />
        </Button>
      </Flex>
    </Modal>
  );
};
