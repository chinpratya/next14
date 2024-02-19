import { MailOutlined } from '@ant-design/icons';
import { Center } from '@mantine/core';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Image,
  Input,
  Typography,
} from 'antd';

import { TemplateSettingPortal } from '../types';

export type PortalPreviewProps = {
  portalSetting?: TemplateSettingPortal;
};

export const PortalPreview = ({
  portalSetting,
}: PortalPreviewProps) => {
  const header = portalSetting?.header;
  const button = portalSetting?.button;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '70vh',
        background: `url(${portalSetting?.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Center
        style={{
          height: '100%',
          maxHeight: '70vh',
        }}
      >
        <Card
          style={{
            width: 450,
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            {header?.showLogo && (
              <Image
                src={header?.logo}
                alt="logo"
                style={{
                  height: 50,
                }}
              />
            )}
          </div>
          <div className="text-center mt-4">
            <Typography.Title
              level={4}
              className="text-center"
            >
              Log in to
            </Typography.Title>
            <Typography.Text className="text-center">
              Enter the email address you use to log in
            </Typography.Text>
          </div>
          <Form layout="vertical" className="mt-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input
                prefix={
                  <Typography.Link>
                    <MailOutlined />
                  </Typography.Link>
                }
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="accept"
              valuePropName="checked"
            >
              <Checkbox>
                ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                style={{
                  backgroundColor:
                    button?.backgroundColor,
                  color: button?.textColor,
                  border: 'none',
                }}
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Center>
    </div>
  );
};
