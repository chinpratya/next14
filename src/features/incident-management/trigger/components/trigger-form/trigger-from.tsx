import {
  Card,
  Form,
  Input,
  Space,
  Typography,
  Select,
  Button,
  Row,
  Col,
  type SelectProps,
  InputNumber,
  Switch,
} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useAuth } from '@/stores/auth';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';
import { css } from '@emotion/css';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useGetOperatorList } from '../../api/get-operator-list';
import { useServerityList } from '@/features/incident-management/workflow/api/get-serverity-list';
import { useGetSlaList } from '@/features/incident-management/sla/api/get-sla-list';
import { getSlaDetailWithSeverity } from '@/features/incident-management/sla/api/get-sla-detail-with-severity';
import { type SlaDataDetailWithSevirityResponse } from '@/features/incident-management/sla/types';
import { useCreateRule } from '@/features/incident-management/trigger/api/create-rule';
import { useUpdateRule } from '@/features/incident-management/trigger/api/update-rule';
import { useGetListCategory } from '../../api/get-list-category';

export type TriggerListProps = {
  open?: boolean;
  onClose?: () => void;
  id?: string;
  detailData?: any;
};

export const TriggerForm = ({
  id,
  detailData,
}: TriggerListProps) => {
  const router = useRouter();
  const { triggerId } = useRouter().query;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { data } = useGetOperatorList({});
  const { data: serverityList } = useServerityList({});
  const { data: slaList } = useGetSlaList({});
  const { data: categoryList } = useGetListCategory({});
  const { showNotification } = useNotifications();
  const [slaId, setSlaId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [severityId, setSeverityId] =
    useState<string>('');
  const [operatorId, setOperatorId] =
    useState<string>('');
  const [inputTypes, setInputTypes] = useState<any[]>([
    '',
  ]);
  const [types, setTypes] = useState<string>('');
  // const { data: ruleDetail } = useGetRuleDetail('');

  const { submit, isLoading } = useCreateRule({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.tags.create'
        ) as string,
      });
      router.push(
        '/apps/central-management/incident/trigger'
      );
    },
  });
  const { submit: mutate, isLoading: updateLoaing } =
    useUpdateRule({
      ruleId: triggerId as string,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dsarAutomation.notification.tags.create'
          ) as string,
        });
        router.push(
          '/apps/central-management/incident/trigger'
        );
      },
    });

  const handleCreateTag = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    // submit(values);
    router.push(`${router.asPath}/create`);
  };
  const AllOperator = data?.data;
  const AllServerity = serverityList?.data;
  const mins: SelectProps['options'] = [];
  const hrs: SelectProps['options'] = [];
  for (let i = 0; i < 60; i++) {
    mins.push({
      label: i,
      value: i,
    });
  }
  for (let i = 0; i < 24; i++) {
    hrs.push({
      label: i,
      value: i,
    });
  }
  const incidentCategory = () => {
    const dataOptions = categoryList?.data.map(
      (data: any) => {
        return {
          value: data.objectUuid,
          label: data.displayName,
        };
      }
    );
    return dataOptions;
  };
  const Fillvalue = (data: any) => {
    const songValue = form.getFieldValue(`conditions`);
    // console.log(songValue[data]);
    return songValue[data];
  };

  const incidentSubCategory = (categoryId: string) => {
    const findData = categoryList?.data.find(
      (data: any) => data.objectUuid === categoryId
    );
    const dataOptions = findData?.subCategory.map(
      (data: any) => {
        return {
          value: data.objectUuid,
          label: data.displayName,
        };
      }
    );
    return dataOptions;
  };

  const operatorOptions = (filterVlaue: string) => {
    if (
      filterVlaue !== 'inputType' &&
      filterVlaue !== undefined
    ) {
      const filter = AllOperator?.filter(
        (operator: any) =>
          operator?.operatorType === filterVlaue
      );
      return filter?.map((e: any) => {
        return {
          value: e?.objectUuid,
          label: e?.displayName,
        };
      });
    } else {
      const findInputType = AllOperator?.filter(
        (e: any) => e.objectUuid === operatorId
      );
      findInputType?.map(
        (e: { inputType: any }, i: number) => {
          setInputTypes(e?.inputType);
        }
      );
      return inputTypes.map((e) => {
        return {
          value: e.value,
          label: e.name,
        };
      });
    }
  };

  const serverityOptions = () => {
    return AllServerity?.map((e: any) => {
      return {
        value: e?.objectUuid,
        label: e?.displayName,
      };
    });
  };

  const slaOptions = () => {
    const allSLA = slaList?.data;
    const array: any = [];
    const test = array.concat(
      {
        value: null,
        label: 'ไม่ระบุ',
      },
      allSLA?.map((e: any) => {
        return {
          value: e?.objectUuid,
          label: e?.name,
        };
      }) || {}
    );
    return test;
  };

  const workFlowOptions = () => {
    return [
      {
        value: 'ea062a4f-c17f-11ee-8066-0dcfd4e38224',
        label: 'string99',
      },
    ];
  };

  const onFinish = (values: any) => {
    const payload = {
      conditions: values.conditions,
      rule: {
        isActive: values.isActive,
        name: values.name,
        subCategoryId: values.subCategoryId,
        operatorId: values.ifOperator,
      },
      action: {
        objectUuid: triggerId,
        severityId: values.severityId,
        slaId: values.sla,
        workflowId: values.workflowId,
      },
      workPeriod: {
        days: values.workPeriodDays,
        hours: values.workPeriodHrs,
        minutes: values.workPeriodMins,
      },
      responsePeriod: {
        days: values.responsePeriodDays,
        hours: values.responsePeriodHrs,
        minutes: values.responsePeriodMins,
      },
    };
    if (!detailData) {
      submit(payload);
    } else mutate(payload);
  };

  useEffect(() => {
    if (slaId !== '' && severityId !== '') {
      const data: Promise<SlaDataDetailWithSevirityResponse> =
        getSlaDetailWithSeverity(slaId, severityId);
      data.then(
        (response: SlaDataDetailWithSevirityResponse) => {
          form?.setFieldsValue({
            responsePeriodDays:
              response.period.responsePeriod.days,
            responsePeriodHrs:
              response.period.responsePeriod.hours,
            responsePeriodMins:
              response.period.responsePeriod.minutes,
            workPeriodDays:
              response.period.workPeriod.days,
            workPeriodHrs:
              response.period.workPeriod.hours,
            workPeriodMins:
              response.period.workPeriod.minutes,
          });
        }
      );
    }
  }, [slaId, severityId]);

  // Set detail data
  useEffect(() => {
    const conditions = detailData?.conditions?.map(
      (data: {
        objectUuid: string;
        key: string;
        value: string | number;
        operator: { objectUuid: string };
        valueType: string;
      }) => {
        // setOperatorId(data.operator.objectUuid);
        const test = () => {
          if (data?.valueType == 'str') {
            return 'str';
          } else return 'float';
        };
        return {
          objectUuid: data?.objectUuid,
          key: data?.key,
          value: data?.value,
          operatorId: data.operator.objectUuid,
          valueType: test(),
        };
      }
    );

    if (detailData !== undefined || null) {
      setSlaId(detailData?.action?.sla?.objectUuid);

      setSeverityId(
        detailData?.action?.severity?.objectUuid
      );
      setCategory(detailData?.category.objectUuid);
      form?.setFieldsValue({
        ...detailData,
        conditions: [...conditions],
        categoryId: detailData?.category.objectUuid,
        subCategoryId: detailData?.subCategory.objectUuid,
        ifOperator: detailData?.operator?.objectUuid,
        workflowId:
          detailData?.action?.workflow?.objectUuid,
        severityId:
          detailData?.action?.severity?.objectUuid,
        sla: detailData?.action?.sla?.objectUuid,
        workPeriodDays:
          detailData?.action?.sla?.period.workPeriod.days,
        workPeriodHrs:
          detailData?.action?.sla?.period.workPeriod
            .hours,
        workPeriodMins:
          detailData?.action?.sla?.period.workPeriod
            .minutes,
        responsePeriodDays:
          detailData?.action?.sla?.period.responsePeriod
            .days,
        responsePeriodHrs:
          detailData?.action?.sla?.period.responsePeriod
            .hours,
        responsePeriodMins:
          detailData?.action?.sla?.period.responsePeriod
            .minutes,
      });
    }
  }, [detailData]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={(e) => onFinish(e)}
        onFinishFailed={(e) => console.log(e)}
        onError={(e) => console.log(e)}
      >
        <Card
          extra={
            <Row
              style={{
                padding: -20,
                marginBottom: -60,
              }}
            >
              <Typography
                style={{
                  marginRight: 10,
                  marginTop: 10,
                }}
              >
                เปิดใช้งาน
              </Typography>
              <Form.Item
                name="isActive"
                valuePropName="checked"
                initialValue
              >
                <Switch
                  style={{
                    marginTop: 5,
                  }}
                />
              </Form.Item>
            </Row>
          }
        >
          <Form.Item
            label={
              <IntlMessage id="dsarAutomation.tags.name" />
            }
            name="name"
            rules={[
              validation.required(
                <IntlMessage id="dsarAutomation.tags.nameRequired" />
              ),
            ]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label={<IntlMessage id="Incident Category" />}
            name="categoryId"
            rules={[
              validation.required(
                <IntlMessage id="dsarAutomation.tags.nameRequired" />
              ),
            ]}
          >
            <Select
              options={incidentCategory()}
              onChange={(e) => setCategory(e)}
              loading={isLoading}
              disabled={isLoading}
            ></Select>
          </Form.Item>

          <Form.Item
            label={
              <IntlMessage id="Incident SubCategory" />
            }
            name="subCategoryId"
            rules={[
              validation.required(
                <IntlMessage id="dsarAutomation.tags.nameRequired" />
              ),
            ]}
            style={{
              paddingBottom: 20,
            }}
          >
            <Select
              options={incidentSubCategory(category)}
              loading={isLoading}
              disabled={isLoading}
            />
          </Form.Item>

          <Card
            className={css`
              .ant-card-head {
                background-color: #ffffff00;
                margin-top: -30px;
              }
            `}
            style={{
              borderStyle: 'dashed',
              borderWidth: '1px',
              borderRadius: '0px',
            }}
            title={
              <Space
                style={{
                  width: '100%',
                  height: '46px',
                  borderRadius: '10px',
                  paddingLeft: '10px',
                  marginTop: '-80px',
                  paddingTop: '-40px',
                  paddingBottom: 30,
                }}
              >
                <Typography
                  style={{
                    fontWeight: 400,
                  }}
                >
                  if
                  <Space
                    style={{
                      paddingTop: -10,
                      marginBottom: '-20px',
                      // margin: 0,
                    }}
                  >
                    <Form.Item
                      name="ifOperator"
                      rules={[
                        validation.required(
                          <IntlMessage id="กรุณากรอกข้อมูล" />
                        ),
                      ]}
                    >
                      <Select
                        style={{
                          width: 100,
                          marginLeft: '10px',
                          marginRight: '10px',
                        }}
                        options={operatorOptions(
                          'ifStatement'
                        )}
                        placeholder="select some operator`"
                      />
                    </Form.Item>
                  </Space>
                  of the following conditions are met
                </Typography>
              </Space>
            }
          >
            <Form.List
              name="conditions"
              initialValue={['']}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(
                    ({ key, name, ...restField }) => (
                      <Card
                        style={{
                          borderStyle: 'dashed',
                          borderWidth: '1px',
                          borderRadius: '0px',
                          // marginTop: 20,
                          backgroundColor: '#ffffff00',
                        }}
                        key={key}
                      >
                        <Row gutter={24}>
                          <Form.Item
                            {...restField}
                            label={
                              <IntlMessage id="Conditions" />
                            }
                            name={[name, 'key']}
                            style={{
                              width: '20%',
                            }}
                            rules={[
                              validation.required(
                                <IntlMessage id="กรุณากรอกข้อมูล" />
                              ),
                            ]}
                          >
                            <Input placeholder="Category" />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label={<IntlMessage id="" />}
                            name={[name, 'operatorId']}
                            style={{
                              width: '15%',
                              paddingLeft: '10px',
                            }}
                            rules={[
                              validation.required(
                                <IntlMessage id="กรุณากรอกข้อมูล" />
                              ),
                            ]}
                          >
                            <Select
                              placeholder="Operator"
                              options={operatorOptions(
                                'operator'
                              )}
                              onChange={(e) =>
                                setOperatorId(e)
                              }
                              defaultActiveFirstOption
                            />
                          </Form.Item>
                          {/* test shouldUpdate */}
                          <Form.Item
                            // {...restField}
                            // name={[name, 'operatorId']}
                            shouldUpdate={(
                              prevValues,
                              curValues
                            ) => {
                              // setTypes(
                              //   curValues?.conditions[
                              //     name
                              //   ]?.operatorId
                              // );
                              // console.log(fields);

                              setOperatorId(
                                curValues?.conditions[
                                  name
                                ]?.operatorId
                              );
                              return (
                                prevValues?.conditions[
                                  name
                                ]?.operatorId !==
                                curValues?.conditions[
                                  name
                                ]?.operatorId
                              );
                            }}
                            style={{
                              width: '15%',
                              // paddingLeft: '10px',
                            }}
                          >
                            {() => {
                              // console.log(1);

                              return (
                                <>
                                  <Form.Item
                                    {...restField}
                                    label={
                                      <IntlMessage id="" />
                                    }
                                    name={[
                                      name,
                                      'valueType',
                                    ]}
                                    style={{
                                      // width: '15%',
                                      paddingLeft: '10px',
                                    }}
                                    rules={[
                                      validation.required(
                                        <IntlMessage id="กรุณากรอกข้อมูล" />
                                      ),
                                    ]}
                                    // initialValue={'ss'}
                                  >
                                    <Select
                                      placeholder="Input Type"
                                      options={operatorOptions(
                                        'inputType'
                                      )}
                                      onChange={(e) =>
                                        setTypes(e)
                                      }
                                      // defaultActiveFirstOption={
                                      //   true
                                      // }
                                    />
                                  </Form.Item>
                                </>
                              );
                            }}
                          </Form.Item>

                          {/* <Form.Item
                            {...restField}
                            label={<IntlMessage id="" />}
                            name={[name, 'valueType']}
                            style={{
                              width: '15%',
                              paddingLeft: '10px',
                            }}
                            rules={[
                              validation.required(
                                <IntlMessage id="กรุณากรอกข้อมูล" />
                              ),
                            ]}
                          >
                            <Select
                              placeholder="Input Type"
                              options={operatorOptions(
                                'inputType'
                              )}
                              onChange={(e) =>
                                setTypes(e)
                              }
                            />
                          </Form.Item> */}

                          {/* <Form.Item
                            shouldUpdate={(
                              prevValues,
                              curValues
                            ) => {
                              // console.log(
                              //   curValues?.conditions[
                              //     name
                              //   ]
                              // );
                              return (
                                prevValues?.conditions[
                                  name
                                ]?.valueType &&
                                curValues?.conditions[
                                  name
                                ]?.valueType === 'str'
                              );
                            }}
                          >
                            {() => {
                              return ( */}

                          {Fillvalue(name)?.valueType ===
                          'str' ? (
                            <>
                              <Form.Item
                                {...restField}
                                label={
                                  <IntlMessage id="" />
                                }
                                name={[name, 'value']}
                                rules={[
                                  validation.required(
                                    <IntlMessage id="กรุณากรอกข้อมูล" />
                                  ),
                                ]}
                                style={{
                                  width: '48%',
                                  paddingLeft: '10px',
                                }}
                                className={css`
                                  ant-col
                                    .ant-form-item-label {
                                    padding: 0 0 8px;
                                    line-height: 1.5;
                                    white-space: initial;
                                    text-align: right;
                                  }
                                `}
                              >
                                <Input placeholder="Something" />
                              </Form.Item>
                            </>
                          ) : (
                            <>
                              <Form.Item
                                {...restField}
                                label={
                                  <IntlMessage id="" />
                                }
                                name={[name, 'value']}
                                rules={[
                                  validation.required(
                                    <IntlMessage id="กรุณากรอกข้อมูล" />
                                  ),
                                ]}
                                style={{
                                  width: '48%',
                                  paddingLeft: '10px',
                                }}
                                className={css`
                                  ant-col
                                    .ant-form-item-label {
                                    padding: 0 0 8px;
                                    line-height: 1.5;
                                    white-space: initial;
                                    text-align: right;
                                  }
                                `}
                              >
                                <InputNumber
                                  style={{
                                    width: '100%',
                                  }}
                                  placeholder="Number"
                                />
                              </Form.Item>
                            </>
                          )}

                          {/* );
                            }}
                          </Form.Item> */}

                          {/* <Form.Item
                          
                          >
                            {() => {
                              return ( */}
                          {/* <Form.Item
                            {...restField}
                            label={<IntlMessage id="" />}
                            name={[name, 'value']}
                            rules={[
                              validation.required(
                                <IntlMessage id="กรุณากรอกข้อมูล" />
                              ),
                            ]}
                            style={{
                              width: '48%',
                              paddingLeft: '10px',
                            }}
                            className={css`
                              ant-col
                                .ant-form-item-label {
                                padding: 0 0 8px;
                                line-height: 1.5;
                                white-space: initial;
                                text-align: right;
                              }
                            `}
                            shouldUpdate={(
                              prevValues,
                              curValues
                            ) => {
                              return (
                                prevValues?.conditions[
                                  name
                                ]?.valueType &&
                                curValues?.conditions[
                                  name
                                ]?.valueType === 'float'
                              );
                            }}
                          ></Form.Item> */}
                          {/* );
                            }}
                          </Form.Item> */}

                          {/* {types === 'str' ? (
                            <Form.Item
                              {...restField}
                              label={
                                <IntlMessage id="" />
                              }
                              name={[name, 'value']}
                              rules={[
                                validation.required(
                                  <IntlMessage id="กรุณากรอกข้อมูล" />
                                ),
                              ]}
                              style={{
                                width: '48%',
                                paddingLeft: '10px',
                              }}
                              className={css`
                                ant-col
                                  .ant-form-item-label {
                                  padding: 0 0 8px;
                                  line-height: 1.5;
                                  white-space: initial;
                                  text-align: right;
                                }
                              `}
                            >
                              <Input placeholder="Something" />
                            </Form.Item>
                          ) : (
                            <Form.Item
                              {...restField}
                              label={
                                <IntlMessage id="" />
                              }
                              name={[name, 'value']}
                              rules={[
                                validation.required(
                                  <IntlMessage id="กรุณากรอกข้อมูล" />
                                ),
                              ]}
                              style={{
                                width: '48%',
                                paddingLeft: '10px',
                              }}
                              className={css`
                                ant-col
                                  .ant-form-item-label {
                                  padding: 0 0 8px;
                                  line-height: 1.5;
                                  white-space: initial;
                                  text-align: right;
                                }
                              `}
                            >
                              <InputNumber
                                style={{
                                  width: '100%',
                                }}
                                placeholder="Number"
                              />
                            </Form.Item>
                          )} */}

                          {fields.length > 1 ? (
                            <>
                              <MinusCircleOutlined
                                onClick={() =>
                                  remove(name)
                                }
                                style={{
                                  color: 'red',
                                  maxWidth: 600,
                                }}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </Card>
                    )
                  )}
                  <Form.Item
                    className={css`
                      .ant-form-item-control-input-content {
                        display: inline;
                      }
                    `}
                  >
                    <Button
                      type="primary"
                      icon={<PlusCircleOutlined />}
                      // () => add()
                      onClick={() => add()}
                    >
                      Add Conditions
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Typography
              style={{
                marginTop: 20,
                marginLeft: '10px',
              }}
            >
              Preform the follwing Actions
            </Typography>
            <Card
              style={{
                borderStyle: 'dashed',
                borderWidth: '1px',
                borderRadius: '0px',
                marginTop: '10px',
              }}
            >
              {/* workflow */}
              <Form.Item
                label="Workflow"
                name="workflowId"
                className={css`
                  .ant-form-item-required {
                    margin-top: 0px;
                    width: 200px;
                  }
                  ,
                  .ant-form-item-label
                    > label.ant-form-item-required:not(
                      .ant-form-item-required-mark-optional
                    )::before {
                    display: none;
                  }
                  ,
                  .ant-form-item-label
                    > label.ant-form-item-required:not(
                      .ant-form-item-required-mark-optional
                    )::after {
                    display: inline-block;
                    margin-right: 4px;
                    color: #ff6b72;
                    font-size: 14px;
                    font-family: SimSun, sans-serif;
                    line-height: 1;
                    content: '*';
                  }
                `}
                rules={[
                  validation.required(
                    'กรุณากรอก Workflow'
                  ),
                ]}
              >
                <Select
                  options={workFlowOptions()}
                  placeholder="Workflow"
                ></Select>
              </Form.Item>
              {/* serverity */}
              <Form.Item
                label="Severity"
                // label={<IntlMessage id="Severity" />}
                name="severityId"
                className={css`
                  .ant-form-item-required {
                    margin-top: 0px;
                    width: 200px;
                  }
                  ,
                  .ant-form-item-label
                    > label.ant-form-item-required:not(
                      .ant-form-item-required-mark-optional
                    )::before {
                    display: none;
                  }
                  ,
                  .ant-form-item-label
                    > label.ant-form-item-required:not(
                      .ant-form-item-required-mark-optional
                    )::after {
                    display: inline-block;
                    margin-right: 4px;
                    color: #ff6b72;
                    font-size: 14px;
                    font-family: SimSun, sans-serif;
                    line-height: 1;
                    content: '*';
                  }
                `}
                rules={[
                  validation.required(
                    'กรุณากรอก Severity'
                  ),
                ]}
              >
                <Select
                  placeholder="Severity"
                  options={serverityOptions()}
                  onChange={(severityId) =>
                    setSeverityId(severityId)
                  }
                ></Select>
              </Form.Item>
              {/* sla */}
              <Form.Item
                label="SLA"
                name="sla"
                className={css`
                  .ant-form-item-required {
                    margin-top: 0px;
                    width: 200px;
                  }
                  ,
                  .ant-form-item-label
                    > label.ant-form-item-required:not(
                      .ant-form-item-required-mark-optional
                    )::before {
                    display: none;
                  }
                  ,
                  .ant-form-item-label
                    > label.ant-form-item-required:not(
                      .ant-form-item-required-mark-optional
                    )::after {
                    display: none;
                  }
                  ,
                  .ant-input {
                    width: 70%;
                  }
                `}
                initialValue={null}
              >
                <Select
                  placeholder="SLA"
                  options={slaOptions()}
                  onChange={(slaId: string) =>
                    setSlaId(slaId)
                  }
                  disabled={severityId === ''}
                ></Select>
              </Form.Item>
              {/* workingTime */}
              <Row gutter={24}>
                <Typography
                  style={{
                    fontWeight: 400,
                    marginLeft: 15,
                    marginTop: 40,
                    width: 200,
                  }}
                >
                  ระยะเวลาในการทำงาน
                </Typography>

                <Form.Item
                  name="workPeriodDays"
                  label={<IntlMessage id="วัน" />}
                  style={{
                    width: '15%',
                    marginTop: '-10px',
                  }}
                  className={css`
                    .ant-descriptions-item-label::after,
                    .ant-form-item-label > label::after {
                      content: '';
                      content-visibility: hidden;
                      position: relative;
                      top: -0.5px;
                      margin: 0 8px 0 2px;
                    }
                    ,
                    .ant-form-item-label > label {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      width: 150px;
                      height: 40px;
                      font-size: 14px;
                    }
                  `}
                  rules={[
                    validation.required(
                      <IntlMessage id="กรุณากรอกข้อมูล" />
                    ),
                  ]}
                >
                  <InputNumber
                    placeholder="จำนวนวัน"
                    min={0}
                    style={{
                      width: '100%',
                    }}
                    disabled={slaId !== ''}
                  />
                </Form.Item>

                <Form.Item
                  label={<IntlMessage id="ชั่วโมง" />}
                  name="workPeriodHrs"
                  style={{
                    width: '15%',
                    marginTop: '-10px',
                    marginLeft: '10px',
                  }}
                  className={css`
                    .ant-descriptions-item-label::after,
                    .ant-form-item-label > label::after {
                      content: '';
                      content-visibility: hidden;
                      position: relative;
                      top: -0.5px;
                      margin: 0 8px 0 2px;
                    }
                    ,
                    .ant-form-item-label > label {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      width: 150px;
                      height: 40px;
                      font-size: 14px;
                    }
                  `}
                  rules={[
                    validation.required(
                      <IntlMessage id="กรุณากรอกข้อมูล" />
                    ),
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="ชั่วโมง"
                    options={hrs}
                    style={{
                      width: '100%',
                    }}
                    disabled={slaId !== ''}
                    // loading={isLoading}
                  />
                </Form.Item>

                <Form.Item
                  name="workPeriodMins"
                  label={<IntlMessage id="นาที" />}
                  style={{
                    width: '15%',
                    marginTop: '-10px',
                    marginLeft: '10px',
                  }}
                  className={css`
                    .ant-descriptions-item-label::after,
                    .ant-form-item-label > label::after {
                      content: '';
                      content-visibility: hidden;
                      position: relative;
                      top: -0.5px;
                      margin: 0 8px 0 2px;
                    }
                    ,
                    .ant-form-item-label > label {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      width: 150px;
                      height: 40px;
                      font-size: 14px;
                    }
                  `}
                  rules={[
                    validation.required(
                      <IntlMessage id="กรุณากรอกข้อมูล" />
                    ),
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="นาที"
                    options={mins}
                    style={{
                      width: '100%',
                    }}
                    disabled={slaId !== ''}
                  />
                </Form.Item>
              </Row>
              {/* responseTime */}
              <Row gutter={24}>
                <Typography
                  style={{
                    fontWeight: 400,
                    marginLeft: 15,
                    marginTop: 40,
                    width: 200,
                  }}
                >
                  ระยะเวลาในการตอบสนอง
                </Typography>
                <Form.Item
                  label={<IntlMessage id="วัน" />}
                  name="responsePeriodDays"
                  style={{
                    width: '15%',
                    marginTop: '-10px',
                  }}
                  className={css`
                    .ant-descriptions-item-label::after,
                    .ant-form-item-label > label::after {
                      content: '';
                      content-visibility: hidden;
                      position: relative;
                      top: -0.5px;
                      margin: 0 8px 0 2px;
                    }
                    ,
                    .ant-form-item-label > label {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      width: 150px;
                      height: 40px;
                      font-size: 14px;
                    }
                  `}
                  rules={[
                    validation.required(
                      <IntlMessage id="กรุณากรอกข้อมูล" />
                    ),
                  ]}
                >
                  <InputNumber
                    placeholder="จำนวนวัน"
                    min={0}
                    style={{
                      width: '100%',
                    }}
                    disabled={slaId !== ''}
                  />
                </Form.Item>

                <Form.Item
                  label={<IntlMessage id="ชั่วโมง" />}
                  name="responsePeriodHrs"
                  style={{
                    width: '15%',
                    marginTop: '-10px',
                    marginLeft: '10px',
                  }}
                  className={css`
                    .ant-descriptions-item-label::after,
                    .ant-form-item-label > label::after {
                      content: '';
                      content-visibility: hidden;
                      position: relative;
                      top: -0.5px;
                      margin: 0 8px 0 2px;
                    }
                    ,
                    .ant-form-item-label > label {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      width: 150px;
                      height: 40px;
                      font-size: 14px;
                    }
                  `}
                  rules={[
                    validation.required(
                      <IntlMessage id="กรุณากรอกข้อมูล" />
                    ),
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="ชั่วโมง"
                    options={hrs}
                    style={{
                      width: '100%',
                    }}
                    disabled={slaId !== ''}
                  />
                </Form.Item>

                <Form.Item
                  label={<IntlMessage id="นาที" />}
                  name="responsePeriodMins"
                  style={{
                    width: '15%',
                    marginTop: '-10px',
                    marginLeft: '10px',
                  }}
                  className={css`
                    .ant-descriptions-item-label::after,
                    .ant-form-item-label > label::after {
                      content: '';
                      content-visibility: hidden;
                      position: relative;
                      top: -0.5px;
                      margin: 0 8px 0 2px;
                    }
                    ,
                    .ant-form-item-label > label {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      width: 150px;
                      height: 40px;
                      font-size: 14px;
                    }
                  `}
                  rules={[
                    validation.required(
                      <IntlMessage id="กรุณากรอกข้อมูล" />
                    ),
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="นาที"
                    options={mins}
                    style={{
                      width: '100%',
                    }}
                    disabled={slaId !== ''}
                  />
                </Form.Item>
              </Row>
              {/* button */}
              <Row style={{ padding: 0 }}>
                <Col
                  span={24}
                  style={{
                    textAlign: 'right',
                    paddingTop: '16px',
                  }}
                >
                  <Button
                    style={{
                      margin: '16px',
                    }}
                    onClick={router.back}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    บันทึก
                  </Button>
                </Col>
              </Row>
            </Card>
          </Card>
        </Card>
      </Form>
    </>
  );
};
