import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal, ModalProps } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useUpdateActivityBasis } from '../../api/update-activity-basis';
import { ActivityBasis } from '../../types';

import { UploadFileBasisPurpose } from './upload-file';
import { useState } from 'react';

type ActivityBasisPurposeDetailModalProps = ModalProps & {
  activityId: string;
  basisId: string;
  data?: ActivityBasis;
  onCancel: () => void;
};
export const ActivityBasisPurposeDetailAddModal = ({
  activityId,
  basisId,
  data,
  onCancel,
  ...ModalProps
}: ActivityBasisPurposeDetailModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();
  const [loadingUpload, setLoadingUpload] =
    useState(false);

  const updateActivityBasis = useUpdateActivityBasis({
    activityId,
    basisId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.activity.basis.add'
        ) as string,
      });
      onCancel();
    },
  });

  const onUpdateActivityBasis = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      ...data,
      detail: [...(data ? data?.detail : []), values],
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
        disabled: loadingUpload,
      }}
      onCancel={onCancel}
      afterClose={form.resetFields}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="description"
          label={
            <IntlMessage id="dataMapping.activity.lawfulBasis.basis.detail" />
          }
          rules={[
            validation.required(
              t(
                'dataMapping.activity.lawfulBasis.basis.detailRequired'
              )
            ),
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.activity.lawfulBasis.basis.attachment" />
          }
          name="fileUrl"
          rules={[
            validation.required(
              t(
                'dataMapping.activity.lawfulBasis.basis.fileRequired'
              )
            ),
          ]}
        >
          <UploadFileBasisPurpose
            module="data-mapping"
            group="activity-activity-basis-purpose"
            onUpload={(e) => setLoadingUpload(e)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
