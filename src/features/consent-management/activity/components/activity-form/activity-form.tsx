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

import {
  Activity,
  OrganizationPicker,
  useListGroup,
} from '@/features/data-mapping';
import { useSearch } from '@/hooks';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

type ActivityFormProps = {
  form: FormInstance;
  data?: Activity;
};

export const ActivityForm = ({
  form,
  data,
}: ActivityFormProps) => {
  const { t } = useTranslation();
  const { onSearch, debouncedSearch } = useSearch();

  const listGroup = useListGroup({
    menuID: 'Activity',
    search: debouncedSearch,
  });

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[16, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="consentManagement.activity.activityDetail.detail.generalData" />
            }
          >
            <Form.Item
              label={
                <IntlMessage id="consentManagement.activity.activityDetail.detail.activityName" />
              }
              name="name"
              rules={[
                validation.required(
                  t(
                    'consentManagement.activity.activityDetail.detail.activityNameRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <IntlMessage id="consentManagement.activity.activityDetail.detail.description" />
              }
              name="description"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Card>

          <Card
            title={
              <IntlMessage id="consentManagement.activity.activityDetail.detail.activityGroup" />
            }
          >
            <Form.Item
              label={
                <IntlMessage id="consentManagement.activity.activityDetail.detail.activityGroup" />
              }
              name="groupID"
              rules={[
                validation.required(
                  t(
                    'consentManagement.activity.activityDetail.detail.activityGroupRequired'
                  )
                ),
              ]}
            >
              <Select
                showSearch
                loading={listGroup.isLoading}
                onSearch={onSearch}
                options={listGroup.data?.data.map(
                  (group) => ({
                    label: group.name,
                    value: group.groupID,
                  })
                )}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="consentManagement.activity.activityDetail.detail.organization" />
            }
          >
            <Form.Item
              label={
                <IntlMessage id="consentManagement.activity.activityDetail.detail.organization" />
              }
              name="organizationID"
              rules={[
                validation.required(
                  t(
                    'consentManagement.activity.activityDetail.detail.organizationRequired'
                  )
                ),
              ]}
            >
              <OrganizationPicker />
            </Form.Item>
          </Card>
          {data ? (
            <Card
              title={
                <IntlMessage id="consentManagement.activity.activityDetail.detail.status" />
              }
            >
              <Form.Item
                label={
                  <IntlMessage id="consentManagement.activity.activityDetail.detail.status" />
                }
                name="status"
                rules={[
                  validation.required(
                    t(
                      'consentManagement.activity.activityDetail.detail.statusRequired'
                    )
                  ),
                ]}
              >
                <Select
                  options={[
                    {
                      label: 'Active',
                      value: 'active',
                    },
                    {
                      label: 'Inactive',
                      value: 'inactive',
                    },
                  ]}
                  placeholder="Select Status"
                  disabled
                />
              </Form.Item>
            </Card>
          ) : null}
        </Col>
      </Row>
    </Form>
  );
};
