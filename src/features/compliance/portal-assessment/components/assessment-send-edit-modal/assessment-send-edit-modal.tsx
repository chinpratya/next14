import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { WARNING_COLOR } from '@/config/color';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';

import { useSendUpdatePortalAssessment } from '../../api/send-update-assessment';

export type AssessmentSendEditModalProps = {
  assessmentId: string;
  open: boolean;
  onCancel: () => void;
};

export const AssessmentSendEditModal = ({
  assessmentId,
  open,
  onCancel,
}: AssessmentSendEditModalProps) => {
  const { showNotification } = useNotifications();
  const reason = '';
  const { submit, isLoading } =
    useSendUpdatePortalAssessment({
      assessmentId,
      onSuccess: () => {
        onCancel();
        showNotification({
          type: 'success',
          message: 'ส่งแก้ไขเรียบร้อย',
        });
      },
    });

  return (
    <Modal
      title="ยืนยันการส่งแก้ไข"
      open={open}
      onCancel={onCancel}
      width={450}
      closable={false}
      borderLess
      okText="ส่งแก้ไข"
      onOk={() => submit(reason)}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      <Flex justifyContent="between">
        <ExclamationCircleOutlined
          className="mr-4 font-size-xl"
          style={{
            color: WARNING_COLOR,
          }}
        />
        <Typography.Text type="secondary">
          เมื่อทำการยืนยันระบบจะดำเนินการส่งแบบฟอร์มและไม่สามารถกลับมาแก้ไขแล้ว
        </Typography.Text>
      </Flex>
    </Modal>
  );
};
