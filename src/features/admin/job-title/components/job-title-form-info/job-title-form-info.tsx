import { Col, Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

const { TextArea } = Input;

export type JobTitleFormInfoProps = {
  form: FormInstance;
};

export const JobTitleFormInfo = ({
  form,
}: JobTitleFormInfoProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          description: '',
        }}
      >
        <Col {...getColLayout(24)}>
          <Form.Item
            label={
              <IntlMessage id="admin.userManagement.jobTitle.create.th" />
            }
            name="name"
            rules={[
              validation.required(
                t(
                  'admin.userManagement.jobTitle.create.thValidation'
                )
              ),
            ]}
          >
            <Input
              placeholder={
                t(
                  'admin.userManagement.jobTitle.create.thPlaceholder'
                ) as string
              }
            />
          </Form.Item>
        </Col>
        <Col {...getColLayout(24)}>
          <Form.Item
            label={
              <IntlMessage id="admin.userManagement.jobTitle.create.en" />
            }
            name="name_en"
            rules={[
              validation.required(
                t(
                  'admin.userManagement.jobTitle.create.enValidation'
                )
              ),
            ]}
          >
            <Input
              placeholder={
                t(
                  'admin.userManagement.jobTitle.create.enPlaceholder'
                ) as string
              }
            />
          </Form.Item>
        </Col>
        <Col {...getColLayout(24)}>
          <Form.Item
            label={
              <IntlMessage id="admin.userManagement.jobTitle.create.description" />
            }
            name="description"
          >
            <TextArea
              rows={3}
              placeholder={
                t(
                  'admin.userManagement.jobTitle.create.descriptionPlaceholder'
                ) as string
              }
            />
          </Form.Item>
        </Col>
      </Form>
    </>
  );
};
