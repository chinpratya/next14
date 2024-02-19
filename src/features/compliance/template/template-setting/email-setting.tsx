import { css } from '@emotion/css';
import {
  Collapse,
  Divider,
  Form,
  Switch,
  Typography,
} from 'antd';
import dynamic from 'next/dynamic';
import { Scrollbars } from 'react-custom-scrollbars';

import { ColorPicker } from '@components/color-picker';
import { UploadImage } from '@components/upload-image';

import { TemplateSettingEmail } from '../types';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type EmailSettingProps = {
  emailSetting?: TemplateSettingEmail;
  onChange?: (value: TemplateSettingEmail) => void;
};

export const EmailSetting = ({
  emailSetting,
  onChange,
}: EmailSettingProps) => {
  return (
    <Form
      layout="vertical"
      className={css`
        .layout__form-item__color-picker {
          .ant-form-item-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;

            .ant-form-item-label {
              padding-bottom: 0;
            }

            .ant-form-item-control {
              width: auto;

              .color-picker {
                display: flex;
                align-items: center;
                justify-content: flex-end;
              }
            }
          }
        }
      `}
      initialValues={emailSetting}
      onValuesChange={(changedValues, allValues) => {
        const header = {
          ...emailSetting?.header,
          ...allValues?.header,
        };
        const footer = {
          ...emailSetting?.footer,
          ...allValues?.footer,
        };
        const button = {
          ...emailSetting?.button,
          ...allValues?.button,
        };
        onChange?.({
          header,
          footer,
          button,
        } as TemplateSettingEmail);
      }}
    >
      <Scrollbars
        autoHide
        style={{ height: 'calc(100vh - 300px)' }}
      >
        <Collapse
          defaultActiveKey={[
            'header',
            'footer',
            'button',
          ]}
        >
          <Collapse.Panel header="เฮดเดอร์" key="header">
            <Form.Item
              label="แสดงโลโก้"
              name={['header', 'showLogo']}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              shouldUpdate={(prev, next) =>
                prev?.header?.showLogo !==
                next?.header?.showLogo
              }
              noStyle
            >
              {({ getFieldValue }) => {
                return getFieldValue([
                  'header',
                  'showLogo',
                ]) ? (
                  <>
                    <Typography.Title
                      level={4}
                      className="mb-3"
                    >
                      อัปโหลดรูปภาพ
                    </Typography.Title>
                    <Form.Item name={['header', 'logo']}>
                      <UploadImage
                        module="template"
                        group="email"
                      />
                    </Form.Item>
                  </>
                ) : null;
              }}
            </Form.Item>
            <Divider />
            <Typography.Title level={4} className="mb-3">
              สี
            </Typography.Title>
            <Form.Item
              label="สีพื้นหลัง"
              name={['header', 'backgroundColor']}
              valuePropName="color"
              className="layout__form-item__color-picker"
            >
              <ColorPicker />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="ฟุตเตอร์" key="footer">
            <Form.Item
              label="แสดงโลโก้"
              name={['footer', 'showLogo']}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              shouldUpdate={(prev, next) =>
                prev?.footer?.showLogo !==
                next?.footer?.showLogo
              }
              noStyle
            >
              {({ getFieldValue }) => {
                return getFieldValue([
                  'footer',
                  'showLogo',
                ]) ? (
                  <>
                    <Typography.Title
                      level={4}
                      className="mb-3"
                    >
                      อัปโหลดรูปภาพ
                    </Typography.Title>
                    <Form.Item name={['footer', 'logo']}>
                      <UploadImage
                        module="template"
                        group="email"
                      />
                    </Form.Item>
                  </>
                ) : null;
              }}
            </Form.Item>
            <Divider />
            <Typography.Title level={4} className="mb-3">
              สี
            </Typography.Title>
            <Form.Item
              label="สีพื้นหลัง"
              name={['footer', 'backgroundColor']}
              valuePropName="color"
              className="layout__form-item__color-picker"
            >
              <ColorPicker />
            </Form.Item>
            <Divider />
            <Typography.Title level={4} className="mb-3">
              เนื้อหา
            </Typography.Title>
            <Form.Item
              label="เนื้อหา"
              name={['footer', 'content']}
            >
              <CkEditor />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel
            header="ตั้งค่าปุ่ม"
            key="button"
          >
            <Typography.Title level={4} className="mb-3">
              สี
            </Typography.Title>
            <Form.Item
              label="สีพื้นหลัง"
              name={['button', 'backgroundColor']}
              valuePropName="color"
              className="layout__form-item__color-picker"
            >
              <ColorPicker />
            </Form.Item>
            <Form.Item
              label="สีข้อความ"
              name={['button', 'textColor']}
              valuePropName="color"
              className="layout__form-item__color-picker"
            >
              <ColorPicker />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </Scrollbars>
    </Form>
  );
};
