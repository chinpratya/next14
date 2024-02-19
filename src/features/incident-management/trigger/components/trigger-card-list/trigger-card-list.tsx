import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Card,
  Table,
  Button,
  Typography,
  Avatar,
  Tooltip,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Collapse,
  Switch,
  Dropdown,
  Empty,
} from 'antd';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { LoadingOverlay } from '@/components/share-components/loading-overlay';
import { IntlMessage } from '@/components/util-components/intl-message';
import { css } from '@emotion/css';
import { DropdownProps } from 'antd/lib/dropdown/dropdown';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useToggle } from '@/hooks';
import { useDeleteRule } from '../../api/delete-rule';
import { useNotifications } from '@/stores/notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useUpdateRule } from '../../api/update-rule';
import { useState } from 'react';
type DropdownCardProps = DropdownProps & {
  items?: Array<ItemType>;
};
export type TriggerCardListProps = { data: any[] };
export const TriggerCardList = ({
  data,
}: TriggerCardListProps) => {
  const router = useRouter();
  const { Panel } = Collapse;
  const [form] = Form.useForm();
  const toggle = useToggle<any>();
  const [ids, setIds] = useState('');
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const deleteRule = useDeleteRule({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'incidentManagement.notification.sla.delete'
        ) as string,
      });
      toggle.remove();
    },
    onError: () => toggle.remove(),
  });
  const { submit: mutate, isLoading: updateLoaing } =
    useUpdateRule({
      ruleId: ids,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Update Status Rule Success',
        });
      },
    });
  const DropdownCard = ({
    items = [],
    ...dropdownProps
  }: DropdownCardProps) => {
    return (
      <Dropdown menu={{ items }} {...dropdownProps}>
        <Button
          type="link"
          style={{
            padding: 0,
            marginTop: 0,
            color: '#455560',
          }}
        >
          <MoreOutlined
            style={{
              fontSize: 30,
            }}
          />
        </Button>
      </Dropdown>
    );
  };

  const StyleCSS = `
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
`;

  const handleUpdateStatus = (
    data: any,
    status: boolean
  ) => {
    setIds(data?.objectUuid);
    const payload = {
      // ruleId: id,
      conditions: data.conditions,
      rule: {
        isActive: data.isActive,
        name: data.name,
        subCategoryId: data.subCategoryId,
        operatorId: data.ifOperator,
      },
      actions: {
        objectUuid: data?.action?.objectUuid,
        severityId: data.severityId,
        slaId: data.sla,
        workflowId: data.workflowId,
      },
      workPeriod: {
        days: data.workPeriodDays,
        hours: data.workPeriodHrs,
        minutes: data.workPeriodMins,
      },
      responsePeriod: {
        days: data.responsePeriodDays,
        hours: data.responsePeriodHrs,
        minutes: data.responsePeriodMins,
      },
      isActive: status,
    };
    mutate(payload);
  };
  const genExtra = (data: any) => (
    <>
      <Row
        gutter={12}
        style={{
          paddingBottom: 0,
        }}
      >
        <Typography
          style={{ marginRight: 10, marginTop: 5 }}
        >
          เปิดใช้งาน
        </Typography>
        <Form.Item
          name={[data?.objectUuid, 'isActive']}
          initialValue={data?.isActive}
          valuePropName="checked"
        >
          <Switch
            // onClick={() => handleUpdateStatus(data)}
            style={{
              marginTop: -10,
            }}
            // checked={data?.isActive}
            onChange={(status) =>
              handleUpdateStatus(data, status)
            }
          />
        </Form.Item>

        <DropdownCard
          items={[
            {
              label: (
                <IntlMessage id="dsarAutomation.tags.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              // objectUuid
              onClick: () =>
                router.push(
                  `${router.asPath}/${data?.objectUuid}`
                ),
            },
            {
              label: (
                <IntlMessage id="dsarAutomation.tags.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(data),
            },
          ]}
        />
      </Row>
    </>
  );

  return (
    <FallbackError isError={false}>
      <LoadingOverlay visible={updateLoaing} />
      {data?.length > 0 ? (
        <>
          {data?.map((datas, index) => {
            return (
              <Form form={form} key={index}>
                <Collapse
                  style={{
                    marginTop: 10,
                  }}
                  className={css`
                    .ant-collapse-header {
                      padding: 5px 10px;
                      height: 50px;
                    }
                    ,
                    .ant-collapse-item
                      > .ant-collapse-header {
                      position: relative;
                      display: flex;
                      flex-wrap: nowrap;
                      align-items: flex-start;
                      color: #1a3353;
                      line-height: 1.5;
                      cursor: pointer;
                      transition: all 0.3s, visibility 0s;
                    }
                    ,
                    .ant-collapse-header-text {
                      margin-top: 5px;
                    }
                    ,
                    .ant-collapse-expand-icon {
                      margin-top: 5px;
                    }
                    ,
                    .ant-collapse-content
                      > .ant-collapse-content-box {
                      padding: 1rem;
                      margin-top: 20px;
                    }
                  `}
                >
                  <Panel
                    header={`${datas?.category?.name} : ${datas?.name}`}
                    collapsible="icon"
                    key="1"
                    extra={genExtra(datas)}
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    <Card
                      className={css`
                        .ant-card-head {
                          background-color: #ffffff00;
                          margin-top: -40px;
                          padding-top: 0;
                          padding-right: 20;
                          padding-left: 20;
                          margin-bottom: 0px;
                        }
                      `}
                      style={{
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        borderRadius: '0px',
                        marginBottom: 0,
                        paddingTop: 10,
                      }}
                      title={
                        <Space
                          style={{
                            width: '100%',
                            height: '46px',
                            borderRadius: '10px',
                            paddingLeft: '10px',
                            marginTop: '-20px',
                            paddingTop: '-20px',
                            paddingBottom: 0,
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
                              }}
                            >
                              <Form.Item
                                name={[
                                  index,
                                  'ifOperator',
                                ]}
                                initialValue={
                                  datas?.operator
                                    ?.displayName
                                }
                              >
                                <Select
                                  style={{
                                    width: 100,
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                  }}
                                  options={[]}
                                  placeholder="select some operator`"
                                  disabled
                                />
                              </Form.Item>
                            </Space>
                            of the following conditions
                            are met
                          </Typography>
                        </Space>
                      }
                    >
                      {/* Conditions */}
                      {datas?.conditions.map(
                        (
                          condition: any,
                          index: number
                        ) => {
                          return (
                            <Card
                              style={{
                                borderStyle: 'dashed',
                                borderWidth: '1px',
                                borderRadius: '0px',
                                // marginTop: 20,
                                backgroundColor:
                                  '#ffffff00',
                              }}
                              key={index}
                            >
                              <Typography
                                style={{
                                  marginTop: 0,
                                  marginLeft: '-5px',
                                  marginBottom: 10,
                                }}
                              >
                                Conditions
                              </Typography>
                              <Row
                                gutter={24}
                                style={{
                                  marginLeft: '-5px',
                                }}
                              >
                                <Form.Item
                                  name={[index, 'key']}
                                  style={{
                                    width: '24%',
                                  }}
                                  initialValue={
                                    condition?.key
                                  }
                                >
                                  <Input
                                    placeholder="Category"
                                    disabled
                                  />
                                </Form.Item>
                                <Form.Item
                                  // label={<IntlMessage id="" />}
                                  name={[
                                    index,
                                    'operatorId',
                                  ]}
                                  style={{
                                    width: '24%',
                                  }}
                                  initialValue={
                                    condition?.operator
                                      ?.displayName
                                  }
                                >
                                  <Select
                                    placeholder="select some operator`"
                                    style={{
                                      marginLeft: '10px',
                                    }}
                                    options={[]}
                                    disabled
                                  />
                                </Form.Item>
                                <Form.Item
                                  // label={<IntlMessage id="" />}
                                  name={[index, 'value']}
                                  style={{
                                    width: '50%',
                                    paddingLeft: '20px',
                                  }}
                                  initialValue={
                                    condition?.value
                                  }
                                >
                                  <Input
                                    placeholder="Something"
                                    disabled
                                  />
                                </Form.Item>
                              </Row>
                            </Card>
                          );
                        }
                      )}

                      <Typography
                        style={{
                          marginTop: 0,
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
                        <Form.Item
                          label="Workflow"
                          name={[index, 'workflowId']}
                          className={css`
                            ${StyleCSS}
                          `}
                          required
                          initialValue={
                            datas?.action?.workflow?.name
                          }
                        >
                          <Select
                            options={[]}
                            placeholder="Workflow"
                            disabled
                          ></Select>
                        </Form.Item>

                        <Form.Item
                          label={'Severity'}
                          name={[index, 'severityId']}
                          required
                          className={css`
                            ${StyleCSS}
                          `}
                          initialValue={
                            datas?.action?.severity
                              ?.displayName
                          }
                        >
                          <Select
                            placeholder="Severity"
                            options={[]}
                            disabled
                          ></Select>
                        </Form.Item>

                        <Form.Item
                          label="SLA"
                          name={[index, 'sla']}
                          className={css`
                            ${StyleCSS}
                          `}
                          required
                          initialValue={
                            datas?.action?.sla?.name
                          }
                        >
                          <Select
                            placeholder="SLA"
                            options={[]}
                            disabled
                          ></Select>
                        </Form.Item>

                        {/* workingTime */}
                        <Row gutter={24}>
                          <Typography
                            style={{
                              fontWeight: 400,
                              marginLeft: 15,
                              marginTop: 0,
                              width: 200,
                            }}
                          >
                            ระยะเวลาในการทำงาน
                          </Typography>

                          <Form.Item
                            name={[
                              index,
                              'workPeriodDays',
                            ]}
                            label={
                              <IntlMessage id="วัน" />
                            }
                            style={{
                              width: '15%',
                              marginTop: '-10px',
                            }}
                            initialValue={
                              datas?.action?.sla?.period
                                ?.workPeriod?.days
                            }
                          >
                            <InputNumber
                              placeholder="จำนวนวัน"
                              min={0}
                              style={{
                                width: '100%',
                              }}
                              disabled
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <IntlMessage id="ชั่วโมง" />
                            }
                            name={[
                              index,
                              'workPeriodHrs',
                            ]}
                            style={{
                              width: '15%',
                              marginTop: '-10px',
                              marginLeft: '10px',
                            }}
                            initialValue={
                              datas?.action?.sla?.period
                                ?.workPeriod?.hours
                            }
                          >
                            <Select
                              allowClear
                              placeholder="ชั่วโมง"
                              options={[]}
                              style={{
                                width: '100%',
                              }}
                              disabled
                            />
                          </Form.Item>

                          <Form.Item
                            name={[
                              index,
                              'workPeriodMins',
                            ]}
                            label={
                              <IntlMessage id="นาที" />
                            }
                            style={{
                              width: '15%',
                              marginTop: '-10px',
                              marginLeft: '10px',
                            }}
                            initialValue={
                              datas?.action?.sla?.period
                                ?.workPeriod?.minutes
                            }
                          >
                            <Select
                              allowClear
                              placeholder="นาที"
                              options={[]}
                              style={{
                                width: '100%',
                              }}
                              disabled
                            />
                          </Form.Item>
                        </Row>
                        {/* responseTime */}
                        <Row gutter={24}>
                          <Typography
                            style={{
                              fontWeight: 400,
                              marginLeft: 15,
                              marginTop: 0,
                              width: 200,
                            }}
                          >
                            ระยะเวลาในการตอบสนอง
                          </Typography>
                          <Form.Item
                            label={
                              <IntlMessage id="วัน" />
                            }
                            name={[
                              index,
                              'responsePeriodDays',
                            ]}
                            style={{
                              width: '15%',
                              marginTop: '-10px',
                            }}
                            initialValue={
                              datas?.action?.sla?.period
                                ?.responsePeriod?.days
                            }
                          >
                            <InputNumber
                              placeholder="จำนวนวัน"
                              min={0}
                              style={{
                                width: '100%',
                              }}
                              disabled
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <IntlMessage id="ชั่วโมง" />
                            }
                            name={[
                              index,
                              'responsePeriodHrs',
                            ]}
                            style={{
                              width: '15%',
                              marginTop: '-10px',
                              marginLeft: '10px',
                            }}
                            initialValue={
                              datas?.action?.sla?.period
                                ?.responsePeriod?.hours
                            }
                          >
                            <Select
                              allowClear
                              placeholder="ชั่วโมง"
                              options={[]}
                              style={{
                                width: '100%',
                              }}
                              disabled
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <IntlMessage id="นาที" />
                            }
                            name={[
                              index,
                              'responsePeriodMins',
                            ]}
                            style={{
                              width: '15%',
                              marginTop: '-10px',
                              marginLeft: '10px',
                            }}
                            initialValue={
                              datas?.action?.sla?.period
                                ?.responsePeriod?.minutes
                            }
                          >
                            <Select
                              allowClear
                              placeholder="นาที"
                              options={[]}
                              style={{
                                width: '100%',
                              }}
                              disabled
                            />
                          </Form.Item>
                        </Row>
                      </Card>
                    </Card>
                  </Panel>
                </Collapse>
              </Form>
            );
          })}
        </>
      ) : (
        <Empty />
      )}

      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        okButtonProps={{
          loading: deleteRule.isLoading,
        }}
        identifier={toggle.data?.name}
        onDelete={() =>
          deleteRule.submit(toggle.data.objectUuid)
        }
      />
    </FallbackError>
  );
};
