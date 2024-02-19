import { css } from '@emotion/css';
import { Collapse, Form, Switch, Typography } from 'antd';

import { ColorPicker } from '@components/color-picker';
import { UploadImage } from '@components/upload-image';

import { TemplateSettingPortal } from '../types';

export type PortalSettingProps = {
  portalSetting?: TemplateSettingPortal;
  onChange?: (value: TemplateSettingPortal) => void;
};

export const PortalSetting = ({
  portalSetting,
  onChange,
}: PortalSettingProps) => {
  return (
    <Form
      initialValues={portalSetting}
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
      onValuesChange={(changedValues, allValues) => {
        const header = {
          ...portalSetting?.header,
          ...allValues?.header,
        };
        const button = {
          ...portalSetting?.button,
          ...allValues?.button,
        };
        onChange?.({
          ...portalSetting,
          ...allValues,
          header,
          button,
        });
      }}
    >
      <Collapse
        defaultActiveKey={[
          'header',
          'background',
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
                <Form.Item name={['header', 'logo']}>
                  <UploadImage
                    module="template"
                    group="email"
                  />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel
          header="พื้นหลัง"
          key="background"
        >
          <Form.Item name="background">
            <UploadImage
              module="template"
              group="email"
            />
          </Form.Item>
        </Collapse.Panel>
        <Collapse.Panel header="ปุ่ม" key="button">
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
    </Form>
  );
};
