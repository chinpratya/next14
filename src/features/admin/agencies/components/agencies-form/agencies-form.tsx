import {
  Col,
  Form,
  FormInstance,
  Input,
  Row,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type AgenciesFormProps = {
  form: FormInstance;
};

export const AgenciesForm = ({
  form,
}: AgenciesFormProps) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label={
          <IntlMessage id="admin.userManagement.agencies.nameTH" />
        }
        rules={[
          validation.required(
            t(
              'admin.userManagement.agencies.nameTHValidation'
            )
          ),
        ]}
      >
        <Input
          placeholder={
            t(
              'admin.userManagement.agencies.nameTHPlaceholder'
            ) as string
          }
        />
      </Form.Item>
      <Form.Item
        name="name_en"
        label={
          <IntlMessage id="admin.userManagement.agencies.nameEN" />
        }
        rules={[
          validation.required(
            t(
              'admin.userManagement.agencies.nameENValidation'
            )
          ),
        ]}
      >
        <Input
          placeholder={
            t(
              'admin.userManagement.agencies.nameENPlaceholder'
            ) as string
          }
        />
      </Form.Item>
      <Row gutter={[16, 0]}>
        <Col {...getColLayout(12)}>
          <Form.Item
            name="abbreviation_th"
            label={
              <IntlMessage id="admin.userManagement.agencies.abbreviationTH" />
            }
            rules={[
              validation.required(
                t(
                  'admin.userManagement.agencies.abbreviationTHValidation'
                )
              ),
            ]}
          >
            <Input
              placeholder={
                t(
                  'admin.userManagement.agencies.abbreviationTHPlaceholder'
                ) as string
              }
            />
          </Form.Item>
        </Col>
        <Col {...getColLayout(12)}>
          <Form.Item
            name="abbreviation_en"
            label={
              <IntlMessage id="admin.userManagement.agencies.abbreviationEN" />
            }
            rules={[
              validation.required(
                t(
                  'admin.userManagement.agencies.abbreviationENValidation'
                )
              ),
            ]}
          >
            <Input
              placeholder={
                t(
                  'admin.userManagement.agencies.abbreviationENPlaceholder'
                ) as string
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="agenciesID"
        label={
          <IntlMessage id="admin.userManagement.agencies.id" />
        }
        rules={[
          validation.required(
            t(
              'admin.userManagement.agencies.idValidation'
            )
          ),
        ]}
      >
        <Input
          placeholder={
            t(
              'admin.userManagement.agencies.idPlaceholder'
            ) as string
          }
        />
      </Form.Item>
    </Form>
  );
};
