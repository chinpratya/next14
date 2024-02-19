import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { WARNING_COLOR } from '@/config/color';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { Modal } from '@components/modal';

import { useApprovePortalAssessment } from '../../api/approve-portal-assessment';

export type AssessmentApproveModalProps = {
  assessmentId: string;
  open: boolean;
  onCancel: () => void;
};

export const AssessmentApproveModal = ({
  assessmentId,
  open,
  onCancel,
}: AssessmentApproveModalProps) => {
  const { showNotification } = useNotifications();

  const { submit, isLoading } =
    useApprovePortalAssessment({
      assessmentId,
      onSuccess: () => {
        onCancel();
        showNotification({
          type: 'success',
          message: 'อนุมัติแบบฟอร์มสำเร็จ',
        });
      },
    });

  return (
    <Modal
      title="ยืนยันการอนุมัติ"
      open={open}
      onCancel={onCancel}
      width={450}
      closable={false}
      borderLess
      okText="อนุมัติ"
      onOk={() => submit()}
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
