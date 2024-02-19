import {
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { Group } from '../../types';

export type GroupInfoProps = {
  group?: Group;
  form: FormInstance;
};

export const GroupInfo = ({
  group,
  form,
}: GroupInfoProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (group) {
      form.setFieldsValue(group);
    }
    return () => {
      form.resetFields();
    };
  }, [form, group]);

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="admin.businessSetting.userGroup.create.basicInfo" />
            }
          >
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.userGroup.create.th" />
              }
              name="name"
              rules={[
                validation.required(
                  t(
                    'admin.businessSetting.userGroup.create.thRequired'
                  )
                ),
              ]}
            >
              <Input
                placeholder={
                  t(
                    'admin.businessSetting.userGroup.create.thPlaceholder'
                  ) as string
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.userGroup.create.en" />
              }
              name="name_en"
              rules={[
                validation.required(
                  t(
                    'admin.businessSetting.userGroup.create.enRequired'
                  )
                ),
              ]}
            >
              <Input
                placeholder={
                  t(
                    'admin.businessSetting.userGroup.create.enPlaceholder'
                  ) as string
                }
              />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="admin.businessSetting.userGroup.create.description" />
              }
              name="description"
            >
              <Input.TextArea rows={5} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};
