import { Form, FormInstance, Modal, Select } from 'antd';
import { useEffect } from 'react';

import { IntlMessage } from '@utilComponents/intl-message';

import { Profile, UserMeta } from '../../types';

type TimeAndRegionSettingRegionModalProps = {
  form: FormInstance;
  data?: Profile;
  userMeta?: UserMeta;
  open: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export const TimeAndRegionSettingRegionModal = ({
  form,
  data,
  userMeta,
  open,
  isLoading,
  onSubmit,
  onClose,
}: TimeAndRegionSettingRegionModalProps) => {
  useEffect(() => {
    if (data) form.setFieldsValue(data);
    if (!open) form.resetFields();
  }, [data, form, open]);

  return (
    <Modal
      title={
        <IntlMessage id="profile.setting.basicInfo.time.timeZone" />
      }
      okText={
        <IntlMessage id="profile.setting.basicInfo.save" />
      }
      open={open}
      onCancel={onClose}
      onOk={onSubmit}
      okButtonProps={{
        loading: isLoading,
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="time_zone"
          label={
            <IntlMessage id="profile.setting.basicInfo.time.timeZone" />
          }
        >
          <Select
            options={userMeta?.time_zone.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
