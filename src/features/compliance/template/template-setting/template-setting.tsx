import { css } from '@emotion/css';
import { useSetState, useToggle } from '@mantine/hooks';
import { Button, Card, Col, Divider, Row } from 'antd';

import { getColLayout } from '@/utils';

import {
  TemplateSetting as TemplateSettingType,
  TemplateSettingEmail,
  TemplateSettingPortal,
} from '../types';

import { EmailPreview } from './email-preview';
import { EmailSetting } from './email-setting';
import { PortalPreview } from './portal-preview';
import { PortalSetting } from './portal-setting';

const initialEmailSetting = {
  header: {
    showLogo: true,
    logo: 'https://file-management-public.s3.amazonaws.com/template/email/04_NT-Logo-with-Full-Name-6d5e86665bc0.png',
    backgroundColor: '#545859',
  },
  footer: {
    showLogo: true,
    logo: 'https://file-management-public.s3.amazonaws.com/template/email/01_NT-Logo-739d7700b69a.png',
    backgroundColor: '#545859',
    content:
      '<p>ขอขอบคุณ</p><h2><strong>บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)</strong></h2><p>99 ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพ 10210</p>',
  },
  button: {
    backgroundColor: '#ffd100',
    textColor: '#545859',
  },
};

const initialPortalSetting = {
  header: {
    showLogo: true,
    logo: 'https://file-management-public.s3.amazonaws.com/template/email/01_NT-Logo-739d7700b69a.png',
  },
  background:
    'https://file-management-public.s3.amazonaws.com/template/email/abstract-surface-textures-white-concrete-stone-wall-cbc22b8eeb1d.jpeg',
  button: {
    backgroundColor: '#ffd100',
    textColor: '#545859',
  },
};

export const TemplateSetting = () => {
  const [template, toggle] = useToggle<
    'email' | 'portal'
  >(['email', 'portal']);
  const [setting, setSetting] =
    useSetState<TemplateSettingType>({
      email: initialEmailSetting,
      portal: initialPortalSetting,
    });

  const onChangeSettingEmail = (
    value: TemplateSettingEmail
  ) => setSetting({ email: value });

  const onChangeSettingPortal = (
    value: TemplateSettingPortal
  ) => setSetting({ portal: value });

  return (
    <Card
      className={css`
        .ant-card-body > .ant-row > .ant-col {
          :first-child {
            border-right: 1px solid #f0f0f0;
          }

          min-height: calc(100vh - 338px);
        }
      `}
    >
      <Row gutter={[24, 24]}>
        <Col {...getColLayout(16)}>
          {template === 'email' && (
            <EmailPreview emailSetting={setting.email} />
          )}
          {template === 'portal' && (
            <PortalPreview
              portalSetting={setting.portal}
            />
          )}
        </Col>
        <Col {...getColLayout(8)}>
          <Button.Group className="w-100">
            <Button
              block
              onClick={() => toggle()}
              type={
                template === 'email'
                  ? 'primary'
                  : 'default'
              }
            >
              E-mail
            </Button>
            <Button
              block
              onClick={() => toggle()}
              type={
                template === 'portal'
                  ? 'primary'
                  : 'default'
              }
            >
              Portal
            </Button>
          </Button.Group>
          <Divider />
          {template === 'email' && (
            <EmailSetting
              emailSetting={setting.email}
              onChange={onChangeSettingEmail}
            />
          )}
          {template === 'portal' && (
            <PortalSetting
              portalSetting={setting.portal}
              onChange={onChangeSettingPortal}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
};
