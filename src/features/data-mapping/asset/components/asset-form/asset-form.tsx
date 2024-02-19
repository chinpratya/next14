import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Col,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { SelectCountry } from '@/components/share-components/select-country';
import { FallbackError } from '@/components/util-components/fallback-error';
import { useSearch, useToggle } from '@/hooks';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../group';
import { OrganizationPicker } from '../../../shared';
import { AssetCreateGroupModal } from '../asset-create-group-modal';

type AssetFormProps = {
  form: FormInstance;
};

export const AssetForm = ({ form }: AssetFormProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const {
    debouncedSearch: searchGroup,
    onSearch: onSearchGroup,
  } = useSearch();

  const isInternal =
    Form.useWatch('organizationType', form) ===
    'internal';

  const listGroup = useListGroup({
    menuID: 'Asset',
    search: searchGroup,
  });

  if (!isInternal) {
    form.resetFields(['organizationName']);
  }

  if (listGroup.isLoading) return <Skeleton />;

  return (
    <FallbackError isError={listGroup.isError}>
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage id="dataMapping.asset.detail.organizationType" />
          }
          name="organizationType"
          rules={[
            validation.required(
              t(
                'dataMapping.asset.detail.organizationTypeRequired'
              )
            ),
          ]}
          initialValue="internal"
        >
          <Radio.Group>
            <Radio value="internal">
              <IntlMessage id="dataMapping.asset.detail.organizationType.internal" />
            </Radio>
            <Radio value="external">
              <IntlMessage id="dataMapping.asset.detail.organizationType.external" />
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Form.Item
              name="name"
              label={
                <IntlMessage id="dataMapping.asset.detail.name" />
              }
              rules={[
                validation.required(
                  t(
                    'dataMapping.asset.detail.nameRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className={css`
                label {
                  width: 100%;
                }
              `}
              name="groupID"
              label={
                <Flex
                  align="center"
                  justify="space-between"
                  className="w-100"
                >
                  <Typography.Text>
                    {' '}
                    <IntlMessage id="dataMapping.asset.detail.group" />
                  </Typography.Text>
                  <Typography.Link
                    className="font-weight-normal"
                    onClick={toggle.create}
                  >
                    <PlusOutlined />{' '}
                    <IntlMessage id="dataMapping.asset.detail.group.create" />
                  </Typography.Link>
                </Flex>
              }
              rules={[
                validation.required(
                  t(
                    'dataMapping.asset.detail.groupRequired"'
                  )
                ),
              ]}
            >
              <Select
                showSearch
                loading={listGroup.isLoading}
                onSearch={onSearchGroup}
                options={listGroup.data?.data.map(
                  (group) => ({
                    label: group.name,
                    value: group.groupID,
                  })
                )}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.asset.detail.country" />
              }
              name="countryID"
              initialValue="87b39a1c-9fc6-4618-a5ad-706965063614"
            >
              <SelectCountry />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.countryID !== curValues.countryID
          }
          noStyle
        >
          {({ getFieldValue }) =>
            getFieldValue('countryID') !==
            '87b39a1c-9fc6-4618-a5ad-706965063614' ? (
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.asset.detail.pdpaScore" />
                }
                name="pdpaScore"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.asset.detail.pdpaScoreRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group>
                  <Radio value="lt">
                    <IntlMessage id="dataMapping.asset.detail.pdpaScore.lt" />
                  </Radio>
                  <Radio value="eq">
                    <IntlMessage id="dataMapping.asset.detail.pdpaScore.eq" />
                  </Radio>
                  <Radio value="gt">
                    <IntlMessage id="dataMapping.asset.detail.pdpaScore.gt" />
                  </Radio>
                </Radio.Group>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Flex gap="md">
          <Form.Item
            name={
              isInternal
                ? 'organizationID'
                : 'organizationName'
            }
            label={
              <IntlMessage id="dataMapping.asset.detail.organization" />
            }
            className="w-100"
            rules={[
              validation.required(
                isInternal
                  ? t(
                      'dataMapping.asset.detail.organizationRequiredSelect'
                    )
                  : t(
                      'dataMapping.asset.detail.organizationRequiredEnter'
                    )
              ),
            ]}
          >
            {isInternal ? (
              <OrganizationPicker isAutoSelect readonly />
            ) : (
              <Input />
            )}
          </Form.Item>
        </Flex>

        <Form.Item
          name="description"
          label={
            <IntlMessage id="dataMapping.asset.detail.description" />
          }
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>

      <AssetCreateGroupModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
    </FallbackError>
  );
};
