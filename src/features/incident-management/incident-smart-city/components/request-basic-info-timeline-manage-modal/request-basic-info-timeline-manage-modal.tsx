import { Form, Typography } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';

import { useUpdateRequestTimeline } from '../../api/update-request-timeline';

const DatePicker = dynamic(
  () =>
    import('@/components/share-components/date-picker'),
  { ssr: false }
);

type RequestBasicInfoTimelineManageModalProps = {
  open: boolean;
  onCancel: () => void;
  requestId: string;
  isextratime: boolean;
};

export const RequestBasicInfoTimelineManageModal = ({
  open,
  onCancel,
  requestId,
  isextratime,
}: RequestBasicInfoTimelineManageModalProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const updateTimeline = useUpdateRequestTimeline({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update timeline successfully.',
      });
      onCancel();
    },
  });

  const handlerUpdateTimeline = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    updateTimeline.submit({ ...values, isextratime });
  };

  return (
    <Modal
      title="Change Deadline"
      open={open}
      onCancel={onCancel}
      onOk={handlerUpdateTimeline}
      okButtonProps={{
        loading: updateTimeline.isLoading,
      }}
      afterClose={() => form.resetFields()}
    >
      <Typography className="text-gray mb-3">
        Deadlines are usually specified in applicable data
        protection laws and regulations. Make sure the
        deadline you set is consistent with the laws you
        are subject to or it may result in violation of
        data subject rights.
      </Typography>
      <Form form={form} layout="vertical">
        <Form.Item label="Deadline" name="endProcressDt">
          <DatePicker
            className="w-100"
            disabledDate={(current) =>
              current.isBefore(
                dayjs().startOf('day').subtract(0, 'day')
              )
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
