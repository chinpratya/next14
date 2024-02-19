import { css } from '@emotion/css';
import {
  Typography,
  Switch,
  Form,
  Input,
  Row,
} from 'antd';
import { useRouter } from 'next/router';

import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Modal } from '@components/modal';

import { useResetPassword } from '../../api/reset-password';

type ModalResetPasswordProps = {
  open: boolean;
  onCloseModal: () => void;
  firstName?: string;
  lastName?: string;
};
export const ModalResetPasswordUser = ({
  open,
  onCloseModal,
  firstName = '',
  lastName = '',
}: ModalResetPasswordProps) => {
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const router = useRouter();
  const userId = router.query.userId as string;

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: 'Reset Password was successfully reset',
    });
    onCloseModal();
    form.resetFields();
  };
  const { submit, isLoading } = useResetPassword({
    onSuccess,
  });
  const onHandleSubmit = () => {
    const password = form.getFieldValue('password');
    const temporary = form.getFieldValue('temporary');
    submit({ userId, password, temporary });
  };

  return (
    <Modal
      open={open}
      title={`Reset Password for ${firstName} ${lastName}`}
      onCancel={() => onCloseModal()}
      onOk={() => form.submit()}
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        onFinish={onHandleSubmit}
        layout="vertical"
        initialValues={{
          temporary: false,
        }}
      >
        <Form.Item
          label="Password"
          name={'password'}
          rules={[validation.password('Password')]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="Password Confirmation"
          name={'confirm_password'}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue('password') === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'The two passwords that you entered do not match!'
                  )
                );
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Row justify={'start'} align={'middle'}>
          <Typography.Text
            className={css`
              margin-right: 10px;
              height: 40px;
              text-align: center;
            `}
            strong
          >
            Temporary :
          </Typography.Text>
          <Form.Item name={'temporary'}>
            <Switch />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};
