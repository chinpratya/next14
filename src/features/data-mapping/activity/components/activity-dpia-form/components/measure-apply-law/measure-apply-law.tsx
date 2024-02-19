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

export type MeasureApplLawProps = {
  form: FormInstance;
};

export const MeasureApplLaw = ({
  form,
}: MeasureApplLawProps) => {
  const { t } = useTranslation();

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ margin: '10px 0' }}
    >
      <Collapse.Panel
        header={
          <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.header" />
        }
        key={'1'}
        style={{ fontWeight: 'bold' }}
      >
        <Form layout="vertical" form={form}>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.lawBasis" />
              }
              name={['measureApplyLaw', 'lawBasis']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.lawBasisRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.processingHelpResearchComplete" />
              }
              name={[
                'measureApplyLaw',
                'processingHelpResearchComplete',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.processingHelpResearchCompleteRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.isOtherWay" />
              }
              name={['measureApplyLaw', 'isOtherWay']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.isOtherWayRequired'
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
                      <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.isOtherWay.true" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.measureApplyLaw !==
                        curValues.measureApplyLaw
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const measureApplyLaw =
                          getFieldValue(
                            'measureApplyLaw'
                          );

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'measureApplyLaw',
                              'otherWayDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !measureApplyLaw?.isOtherWay
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    {' '}
                    <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.isOtherWay.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.preventiveMeasures" />
              }
              name={[
                'measureApplyLaw',
                'preventiveMeasures',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.preventiveMeasuresRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.maintainDataQuality" />
              }
              name={[
                'measureApplyLaw',
                'maintainDataQuality',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.maintainDataQualityRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.dataOfDataSubject" />
              }
              name={[
                'measureApplyLaw',
                'dataOfDataSubject',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.dataOfDataSubjectRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.carryOutRightsOfDataSubject" />
              }
              name={[
                'measureApplyLaw',
                'carryOutRightsOfDataSubject',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.carryOutRightsOfDataSubjectRequired'
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
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.isPersonalDataProcessorControlMeasures" />
              }
              name={[
                'measureApplyLaw',
                'isPersonalDataProcessorControlMeasures',
              ]}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.isPersonalDataProcessorControlMeasuresRequired'
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
                      <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.isOtherWay.true" />
                    </Radio>
                    <Form.Item
                      shouldUpdate={(
                        prevValues,
                        curValues
                      ) =>
                        prevValues.measureApplyLaw !==
                        curValues.measureApplyLaw
                      }
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const measureApplyLaw =
                          getFieldValue(
                            'measureApplyLaw'
                          );

                        return (
                          <Form.Item
                            noStyle
                            name={[
                              'measureApplyLaw',
                              'personalDataProcessorControlMeasuresDetail',
                            ]}
                          >
                            <Input
                              disabled={
                                !measureApplyLaw?.isPersonalDataProcessorControlMeasures
                              }
                            />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </Flex>
                  <Radio value={false}>
                    <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.isOtherWay.false" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>

          <Card>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.activity.dpia.measureApplyLaw.dataTransfer" />
              }
              name={['measureApplyLaw', 'dataTranfer']}
              rules={[
                validation.required(
                  t(
                    'dataMapping.activity.dpia.measureApplyLaw.dataTransferRequired'
                  )
                ),
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Card>
        </Form>
      </Collapse.Panel>
    </Collapse>
  );
};
