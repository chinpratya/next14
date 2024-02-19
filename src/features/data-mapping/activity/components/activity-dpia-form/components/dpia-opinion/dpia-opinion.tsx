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

type DpiaOpinionProps = {
  form: FormInstance;
};
export const DpiaOpinion = ({
  form,
}: DpiaOpinionProps) => {
  const { t } = useTranslation();

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ margin: '10px 0' }}
    >
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.opinion.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople" />
              }
              name={['opinion', 'isOtherPeople']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.opinion.isOtherPeopleRequired'
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
                      <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople.true" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.opinion !==
                        curValues.opinion
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const opinion =
                          getFieldValue('opinion');

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'opinion',
                              'otherPeopleDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !opinion?.isOtherPeople
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>

          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.opinion.isProcessingForResearch" />
              }
              name={[
                'opinion',
                'isProcessingForResearch',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.opinion.isProcessingForResearchRequired'
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
                      <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople.false" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.opinion !==
                        curValues.opinion
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const opinion =
                          getFieldValue('opinion');

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'opinion',
                              'processingForResearchDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !opinion?.isProcessingForResearch
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>

          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.opinion.isPlanConsult" />
              }
              name={['opinion', 'isPlanConsult']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.opinion.isPlanConsultRequired'
                  )
                ),
              ]}
            >
              <Radio.Group>
                <Space
                  direction="vertical"
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={true}>
                    <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople.true" />
                  </Radio>

                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.opinion.isOtherPeople.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
