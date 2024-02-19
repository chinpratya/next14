import { Form, FormInstance, Modal, Select } from 'antd';
import { useEffect } from 'react';

import { IntlMessage } from '@utilComponents/intl-message';

import { Profile, UserMeta } from '../../types';

type TimeAndRegionSettingTimeModalProps = {
  form: FormInstance;
  data?: Profile;
  userMeta?: UserMeta;
  open: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export const TimeAndRegionSettingTimeModal = ({
  form,
  data,
  userMeta,
  open,
  isLoading,
  onSubmit,
  onClose,
}: TimeAndRegionSettingTimeModalProps) => {
  useEffect(() => {
    if (data) form.setFieldsValue(data);
    if (!open) form.resetFields();
  }, [data, form, open]);

  return (
    <Modal
      title={
        <IntlMessage id="profile.setting.basicInfo.time.dateTime" />
      }
      open={open}
      onCancel={onClose}
      okText={
        <IntlMessage id="profile.setting.basicInfo.save" />
      }
      onOk={onSubmit}
      okButtonProps={{
        loading: isLoading,
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="datetime_format"
          label={
            <IntlMessage id="profile.setting.basicInfo.time.dateTime" />
          }
        >
          <Select
            options={userMeta?.datetime_format.map(
              ({ label, datetime_intl }) => ({
                label,
                value: datetime_intl,
              })
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
