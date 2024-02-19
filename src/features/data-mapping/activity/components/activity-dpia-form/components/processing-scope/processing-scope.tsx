import {
  Card,
  Collapse,
  Form,
  Input,
  Radio,
  Space,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

type ProcessingScopeProps = {
  form: FormInstance;
};

export const ProcessingScope = ({
  form,
}: ProcessingScopeProps) => {
  const { t } = useTranslation();

  return (
    <Collapse defaultActiveKey={['1']} key={'1'}>
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.processingScope.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingScope.scope" />
              }
              name={['processingScope', 'scope']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingScope.scopeRequired'
                  )
                ),
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingScope.isSensitiveData" />
              }
              name={[
                'processingScope',
                'isSensitiveData',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingScope.isSensitiveDataRequired'
                  )
                ),
              ]}
            >
              <Radio.Group>
                <Space
                  direction="vertical"
                  style={{ fontWeight: 'normal' }}
                >
                  <Flex
                    justifyContent="start"
                    alignItems="center"
                  >
                    <Radio value={true}>
                      <IntlMessage id="dataMapping.activity.dpia.processingScope.isSensitiveData.true" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.processingScope !==
                        curValues.processingScope
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const processingScope =
                          getFieldValue(
                            'processingScope'
                          );

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'processingScope',
                              'sensitiveDataDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !processingScope?.isSensitiveData
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.processingScope.isSensitiveData.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingScope.storeSensitiveData" />
              }
              name={[
                'processingScope',
                'storeSensitiveData',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingScope.storeSensitiveDataRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingScope.periodStoreSensitiveData" />
              }
              name={[
                'processingScope',
                'periodStoreSensitiveData',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingScope.periodStoreSensitiveDataRequired'
                  )
                ),
              ]}
            >
              <Input
                type="number"
                style={{ width: '30%' }}
              />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingScope.impactDataSubject" />
              }
              name={[
                'processingScope',
                'impactDataSubject',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingScope.impactDataSubjectRequired'
                  )
                ),
              ]}
            >
              <Input
                type="number"
                style={{ width: '30%' }}
              />
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.processingScope.country" />
              }
              name={['processingScope', 'country']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.processingScope.countryRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
