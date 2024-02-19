import { Form, Input, Radio, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { validation } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListCollectionPointPolicy } from '../../api/list-collection-point-policy';

export const CollectionPointPolicyInclude = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } =
    useListCollectionPointPolicy();

  return (
    <>
      <Form.Item
        name="policyType"
        label={
          <IntlMessage id="consentManagement.collectionPoint.policy.policyType" />
        }
        rules={[
          validation.required(
            t(
              'consentManagement.collectionPoint.policy.policyTypeRequired'
            )
          ),
        ]}
      >
        <Radio.Group>
          <Radio value="external">
            <IntlMessage id="consentManagement.collectionPoint.policy.policyType.external" />
          </Radio>
          <Radio value="internal">
            <IntlMessage id="consentManagement.collectionPoint.policy.policyType.internal" />
          </Radio>
          <Radio value="notShow">
            <IntlMessage id="consentManagement.collectionPoint.policy.policyType.notShow" />
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, nextValues) =>
          prevValues?.policyType !==
          nextValues?.policyType
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const policyType = getFieldValue('policyType');

          if (policyType === 'external') {
            return (
              <>
                <Form.Item
                  label={
                    <IntlMessage id="consentManagement.collectionPoint.policy.policyType.external.policyName" />
                  }
                  name="policyName"
                  rules={[
                    validation.required(
                      t(
                        'consentManagement.collectionPoint.policy.policyType.external.policyNameValidationEnter'
                      )
                    ),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <IntlMessage id="consentManagement.collectionPoint.policy.policyType.external.policyLink" />
                  }
                  name="policyLink"
                  rules={[
                    validation.required(
                      t(
                        'consentManagement.collectionPoint.policy.policyType.external.policyLinkValidation'
                      )
                    ),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <IntlMessage id="consentManagement.collectionPoint.policy.policyType.external.version" />
                  }
                  name="policyVersion"
                  rules={[
                    validation.required(
                      t(
                        'consentManagement.collectionPoint.policy.policyType.external.versionValidation'
                      )
                    ),
                  ]}
                >
                  <Select
                    options={[
                      { label: 'V.1', value: 'V.1' },
                      { label: 'V.2', value: 'V.2' },
                      { label: 'V.3', value: 'V.3' },
                      { label: 'V.4', value: 'V.4' },
                      { label: 'V.5', value: 'V.5' },
                      { label: 'V.6', value: 'V.6' },
                      { label: 'V.7', value: 'V.7' },
                      { label: 'V.8', value: 'V.8' },
                      { label: 'V.9', value: 'V.9' },
                      { label: 'V.10', value: 'V.10' },
                    ]}
                  />
                </Form.Item>
                {/* <Form.Item
                  name="policyShow"
                  valuePropName="checked"
                >
                  <Checkbox>
                    <IntlMessage id="consentManagement.collectionPoint.policy.isCheckShowInForm" />
                  </Checkbox>
                </Form.Item> */}
              </>
            );
          }

          if (policyType === 'internal') {
            return (
              <>
                <FallbackError isError={isError}>
                  <Form.Item
                    label={
                      <IntlMessage id="consentManagement.collectionPoint.policy.policyType.external.policyName" />
                    }
                    name="policyId"
                    rules={[
                      validation.required(
                        t(
                          'consentManagement.collectionPoint.policy.policyType.external.policyNameValidationSelect'
                        )
                      ),
                    ]}
                  >
                    <Select
                      options={data?.map((item) => ({
                        label: item.name,
                        value: item.ObjectUUID,
                      }))}
                      loading={isLoading}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <IntlMessage id="consentManagement.collectionPoint.policy.policyType.external.version" />
                    }
                    name="policyVersion"
                    rules={[
                      validation.required(
                        t(
                          'consentManagement.collectionPoint.policy.policyType.external.versionValidation'
                        )
                      ),
                    ]}
                  >
                    <Select disabled />
                  </Form.Item>
                  {/* <Form.Item
                    name="policyShow"
                    valuePropName="checked"
                  >
                    <Checkbox>
                      <IntlMessage id="consentManagement.collectionPoint.policy.isCheckShowInForm" />
                    </Checkbox>
                  </Form.Item> */}
                </FallbackError>
              </>
            );
          }

          return null;
        }}
      </Form.Item>
    </>
  );
};
