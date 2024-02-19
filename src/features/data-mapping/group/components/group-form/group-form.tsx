import {
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { getColLayout, validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { OrganizationPicker } from '../../../shared';
import { useListGroupMeta } from '../../api/list-group-meta';

type GroupFormProps = {
  form: FormInstance;
  disabled?: boolean;
};

export const GroupForm = ({
  form,
  disabled = false,
}: GroupFormProps) => {
  const { t } = useTranslation();
  const groupMeta = useListGroupMeta();

  return (
    <FallbackError isError={groupMeta.isError}>
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="dataMapping.group.detail" />
            }
          >
            <Form
              layout="vertical"
              form={form}
              disabled={disabled}
            >
              <Form.Item
                name="name"
                label={
                  <IntlMessage id="dataMapping.group.name" />
                }
                rules={[
                  validation.required(
                    t('dataMapping.group.nameRequired')
                  ),
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="organizationID"
                label={
                  <IntlMessage id="dataMapping.group.organization" />
                }
                rules={[
                  validation.required(
                    t(
                      'dataMapping.group.organizationRequired'
                    )
                  ),
                ]}
              >
                <OrganizationPicker readonly={disabled} />
              </Form.Item>
              <Form.Item
                name="menuID"
                label={
                  <IntlMessage id="dataMapping.group.menu" />
                }
                rules={[
                  validation.required(
                    t('dataMapping.group.menuRequired')
                  ),
                ]}
              >
                <Select
                  loading={groupMeta.isLoading}
                  options={groupMeta.data?.menu.map(
                    (item) => ({
                      label: item.name,
                      value: item.ObjectUUID,
                    })
                  )}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </FallbackError>
  );
};
