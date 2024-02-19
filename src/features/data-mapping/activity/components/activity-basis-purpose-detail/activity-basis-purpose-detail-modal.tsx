import { Form, Input } from 'antd';
import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal, ModalProps } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateActivityBasis } from '../../api/update-activity-basis';
import { ActivityBasis } from '../../types';

import { UploadFileBasisPurpose } from './upload-file';

type ActivityBasisPurposeDetailModalProps = ModalProps & {
  activityId: string;
  basisId: string;
  data?: ActivityBasis;
  dataDetail?: ActivityBasis;
  onCancel: () => void;
};
export const ActivityBasisPurposeDetailModal = ({
  activityId,
  basisId,
  data,
  dataDetail,
  onCancel,
  ...ModalProps
}: ActivityBasisPurposeDetailModalProps) => {
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();

  const updateActivityBasis = useUpdateActivityBasis({
    activityId,
    basisId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update activity basis success',
      });
      onCancel();
    },
  });

  useEffect(() => {
    if (dataDetail) {
      form.setFieldsValue(dataDetail);
    }
  }, [dataDetail, form]);

  const onUpdateActivityBasis = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const filterdetail = data?.detail.filter(
      (detail) =>
        detail.description !== dataDetail?.description
    );
    const payload = {
      ...data,
      detail: [...(filterdetail ?? []), values],
    };

    updateActivityBasis.submit(payload);
  };
  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.activity.lawfulBasis.basis.addFile" />
      }
      {...ModalProps}
      onOk={onUpdateActivityBasis}
      okButtonProps={{
        loading: updateActivityBasis.isLoading,
      }}
      onCancel={onCancel}
      afterClose={form.resetFields}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name={'description'}
          label={
            <IntlMessage id="dataMapping.activity.lawfulBasis.basis.detail" />
          }
          rules={[
            validation.required('กรุณากรอกรายละเอียด'),
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.activity.lawfulBasis.basis.attachment" />
          }
          name="fileUrl"
        >
          <UploadFileBasisPurpose
            module="data-mapping"
            group="activity-activity-basis-purpose"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
