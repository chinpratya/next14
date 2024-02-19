import { FormInstance, Modal } from 'antd';
import { useEffect, useState } from 'react';

import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useSendSmsOtp } from '../../api/send-sms-otp';
import {
  ProfileInfoSubmitPayload,
  Profile,
} from '../../types';

import { ProfileInfoManagePhoneNumberForm } from './profile-info-manage-phone-number-form';
import { ProfileInfoManageVerifyOtpForm } from './profile-info-manage-verify-otp-form';

enum Step {
  First = 1,
  Last = 2,
}

export type ProfileInfoManagePhoneNumberModalProps = {
  data?: Profile;
  form: FormInstance;
  open: boolean;
  isLoading: boolean;
  onSubmit: (payload: ProfileInfoSubmitPayload) => void;
  onClose: () => void;
};

const renderStep = (
  step: number,
  {
    form,
    data,
  }: {
    form: FormInstance;
    data?: Profile;
  }
) => {
  switch (step) {
    case Step.First:
      return (
        <ProfileInfoManagePhoneNumberForm
          form={form}
          data={data}
        />
      );
    default:
      return (
        <ProfileInfoManageVerifyOtpForm form={form} />
      );
  }
};

export const ProfileInfoManagePhoneNumberModal = ({
  data,
  form,
  open,
  isLoading,
  onSubmit,
  onClose,
}: ProfileInfoManagePhoneNumberModalProps) => {
  const { showValidateFailedNotification } =
    useNotifications();

  const [step, setStep] = useState(Step.First);
  const [phone, setPhone] = useState({
    phone_number: '',
    phone_prefix: '',
  });

  const onSuccess = () => setStep(Step.Last);
  const sendSmsOtp = useSendSmsOtp({ onSuccess });

  const onNext = async () => {
    try {
      await form.validateFields();

      if (step === Step.First) {
        const data = form.getFieldsValue();
        setPhone(data);

        sendSmsOtp.submit(data);
      } else {
        await onSubmit(phone);
      }
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  const onPrev = () => {
    if (step === Step.First) onClose();
    else setStep(Step.First);
  };

  useEffect(() => {
    if (data && open)
      form.setFieldsValue({
        phone_prefix: '+66',
      });

    return () => setStep(Step.First);
  }, [data, form, open]);

  return (
    <Modal
      title={
        step === Step.First ? (
          <IntlMessage id="profile.setting.basicInfo.tel.edit" />
        ) : (
          <IntlMessage id="profile.setting.basicInfo.tel.confirm" />
        )
      }
      open={open}
      onCancel={onPrev}
      okText={
        step === Step.First ? (
          <IntlMessage id="profile.setting.basicInfo.next" />
        ) : (
          <IntlMessage id="profile.setting.basicInfo.save" />
        )
      }
      onOk={onNext}
      okButtonProps={{
        loading: sendSmsOtp.isLoading || isLoading,
      }}
      afterClose={() => form.resetFields()}
      destroyOnClose
    >
      {renderStep(step, { form, data })}
    </Modal>
  );
};
