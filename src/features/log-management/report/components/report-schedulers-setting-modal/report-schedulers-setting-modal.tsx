import { FormInstance } from 'antd';
import { useEffect } from 'react';

import { Modal } from '@/components/share-components/modal';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

import { ReportScheduler } from '../../types';

import { ReportSchedulersSettingForm } from './report-schedulers-setting-form';

type ReportSchedulersSettingModalProps = {
  open: boolean;
  loading?: boolean;
  form: FormInstance;
  isEditor?: boolean;
  data?: ReportScheduler;
  onSubmit?: () => void;
  onCancel: () => void;
};

export const ReportSchedulersSettingModal = ({
  open,
  loading,
  form,
  data,
  isEditor,
  onSubmit,
  onCancel,
}: ReportSchedulersSettingModalProps) => {
  const editPermission = usePermission({
    moduleName: 'log',
    policies: [permissions['cyber:lm:report:update']],
  });

  useEffect(() => {
    if (data && isEditor) {
      form.setFieldsValue(data);
    }
  }, [data, form, isEditor]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      okButtonProps={{
        loading,
        disabled: !editPermission.isAllow,
      }}
      bodyPadding={0}
      title={
        isEditor ? (
          <IntlMessage id="logManagement.report.scheduler.schedulersSetting" />
        ) : (
          <IntlMessage id="logManagement.report.scheduler.createScheduler" />
        )
      }
      okText={
        isEditor ? (
          <IntlMessage id="logManagement.update" />
        ) : (
          <IntlMessage id="logManagement.create" />
        )
      }
      cancelText={
        <IntlMessage id="logManagement.cancel" />
      }
      afterClose={() => form.resetFields()}
    >
      {open && (
        <ReportSchedulersSettingForm form={form} />
      )}
    </Modal>
  );
};
