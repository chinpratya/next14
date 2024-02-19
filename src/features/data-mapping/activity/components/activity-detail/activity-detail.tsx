import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { permissions } from '@/permissions';
import { useAuth } from '@/stores/auth';
import { getColLayout, validation } from '@/utils';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { GroupSelect } from '../../../group';
import {
  OrganizationPicker,
  UserPicker,
} from '../../../shared';
import { useGetActivityMeta } from '../../api/get-activity-meta';
import { ActivityCreateGroupModal } from '../activity-create-group-modal';
import { ActivityCreateTagsModal } from '../activity-create-tags-modal';
import { ActivityTagsSelect } from '../activity-tags-select';

export type ActivityDetailProps = {
  form?: FormInstance;
};

export const ActivityDetail = ({
  form,
}: ActivityDetailProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const meta = useGetActivityMeta({});
  const router = useRouter();
  const { organizationId } = useAuth();

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:activity:update'],
    ],
  });

  useEffect(() => {
    if (organizationId) {
      form?.setFieldValue(
        'organizationID',
        organizationId
      );
    }
  }, [organizationId, form]);

  const activityId = router.query.activityId as string;
  const activityType = meta?.data?.activityType ?? [];

  return (
    <>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.activityDetail.title" />
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={[24, 0]}>
            <Col {...getColLayout(8)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.activityDetail.name" />
                }
                name="name"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.activity.activityDetail.nameRequired'
                    )
                  ),
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...getColLayout(16)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.activityDetail.organization" />
                }
                name="organizationID"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.activity.activityDetail.organizationRequired'
                    )
                  ),
                ]}
              >
                <OrganizationPicker readonly />
              </Form.Item>
            </Col>
            <Col {...getColLayout(8)}>
              <Form.Item
                className={css`
                  label {
                    width: 100%;
                  }
                `}
                name="groupID"
                label={
                  <Flex
                    alignItems="center"
                    justifyContent="between"
                    className="w-100"
                  >
                    <Typography.Text>
                      <IntlMessage id="dataMapping.activity.activityDetail.group" />
                    </Typography.Text>
                    <Typography.Link
                      className="font-weight-normal"
                      onClick={toggle.create}
                      disabled={!editPermission.isAllow}
                    >
                      <PlusOutlined />{' '}
                      <IntlMessage id="dataMapping.activity.activityDetail.createGroup" />
                    </Typography.Link>
                  </Flex>
                }
              >
                <GroupSelect />
              </Form.Item>
            </Col>
            <Col {...getColLayout(16)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.activityDetail.businessOwner" />
                }
                name="ownerID"
              >
                <UserPicker
                  readonly={!editPermission.isAllow}
                />
              </Form.Item>
            </Col>
            <Col {...getColLayout(8)}>
              <Form.Item
                className={css`
                  label {
                    width: 100%;
                  }
                `}
                name="tagID"
                label={
                  <Flex
                    alignItems="center"
                    justifyContent="between"
                    className="w-100"
                  >
                    <Typography.Text>
                      <IntlMessage id="dataMapping.activity.activityDetail.tags" />
                    </Typography.Text>
                    <Typography.Link
                      className="font-weight-normal"
                      onClick={toggle.edit}
                      disabled={!editPermission.isAllow}
                    >
                      <PlusOutlined />{' '}
                      <IntlMessage id="dataMapping.activity.activityDetail.createTags" />
                    </Typography.Link>
                  </Flex>
                }
              >
                <ActivityTagsSelect />
              </Form.Item>
            </Col>
            {activityId ? (
              <Col {...getColLayout(8)}>
                <Form.Item
                  label={
                    <IntlMessage id="dataMapping.activity.activityDetail.status" />
                  }
                  name="status"
                  rules={[
                    validation.required(
                      t(
                        'dataMapping.activity.activityDetail.statusRequired'
                      )
                    ),
                  ]}
                >
                  <Select
                    options={[
                      {
                        label: (
                          <IntlMessage
                            id={
                              tokens.common.status.active
                            }
                          />
                        ),
                        value: 'active',
                      },
                      {
                        label: (
                          <IntlMessage
                            id={
                              tokens.common.status
                                .inactive
                            }
                          />
                        ),
                        value: 'inactive',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            ) : null}
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.activity.activityDetail.activityType" />
                }
                name="activityType"
                rules={[
                  validation.required(
                    t(
                      'dataMapping.activity.activityDetail.activityTypeRequired'
                    )
                  ),
                ]}
              >
                <Radio.Group
                  options={activityType.map((type) => ({
                    label:
                      type.ObjectUUID === 'data-processor'
                        ? 'ผู้ประมวลผลข้อมูลส่วนบุคคล'
                        : type.ObjectUUID ===
                          'data-controller'
                        ? 'ผู้ควบคุมข้อมูลส่วนบุคคล'
                        : type.name,
                    value: type.ObjectUUID,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <ActivityCreateGroupModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
      <ActivityCreateTagsModal
        open={toggle.openEdit}
        onCancel={toggle.edit}
      />
    </>
  );
};
