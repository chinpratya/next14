import { useCounter, useSetState } from '@mantine/hooks';
import { Form } from 'antd';

import { Verify, VerifyProps } from '../../types/verify';

import { VerifyEmail } from './verify-email';
import { VerifyOtp } from './verify-otp';

const renderVerifyStep = (
  current: number,
  props: VerifyProps
) => {
  switch (current) {
    case 0:
      return <VerifyEmail {...props} />;
    default:
      return <VerifyOtp {...props} />;
  }
};

export const VerifyFlow = () => {
  const [form] = Form.useForm();

  const [page, pageHandler] = useCounter(0, {
    min: 0,
    max: 1,
  });
  const [verify, setVerify] = useSetState({} as Verify);

  const onNext = (values = {} as Verify) => {
    setVerify(values);
    pageHandler.increment();
  };

  const onPrev = pageHandler.decrement;

  return renderVerifyStep(page, {
    form,
    verify,
    onNext,
    onPrev,
  });
};
