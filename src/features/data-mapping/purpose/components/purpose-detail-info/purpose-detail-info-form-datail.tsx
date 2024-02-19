import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  Col,
  Input,
  Row,
  Select,
  Radio,
  InputNumber,
  Typography,
} from 'antd';
import { useState } from 'react';

import { useSearch, useToggle } from '@/hooks';
import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../group/api/list-group';
import {
  OrganizationPicker,
  TagsSelect,
  ModalCreateTags,
} from '../../../shared';
import { PurposeCreateGroupModal } from '../purpose-create-group-modal';

type PurposeDetailInfoFormDetailProps = {
  dataIsDataUsagePeriod?: boolean;
};

export const PurposeDetailInfoFormDetail = ({
  dataIsDataUsagePeriod,
}: PurposeDetailInfoFormDetailProps) => {
  const toggle = useToggle();
  const { onSearch, debouncedSearch } = useSearch();
  const [isDataUsagePeriod, setIsDataUsagePeriod] =
    useState(dataIsDataUsagePeriod as boolean);

  const { data } = useListGroup({
    search: debouncedSearch,
    menuID: 'Purpose',
  });

  const GroupOptions = data?.data.map((item) => ({
    value: item.groupID,
    label: item.name,
  }));

  return (
    <>
      <Form.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.purpose" />
        }
        name="name"
        rules={[
          validation.required('กรุณากรอก วัตถุประสงค์'),
        ]}
      >
        <Input />
      </Form.Item>
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
              <IntlMessage id="dataMapping.purpose.create.group" />
            </Typography.Text>
            <Typography.Link
              className="font-weight-normal"
              onClick={toggle.create}
            >
              <PlusOutlined />{' '}
              <IntlMessage id="dataMapping.activity.activityDetail.createGroup" />
            </Typography.Link>
          </Flex>
        }
      >
        <Select
          showSearch
          placeholder="Select Group"
          onSearch={onSearch}
          options={GroupOptions ?? []}
          filterOption={(input, option) =>
            (option?.label ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Form.Item>
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
              <IntlMessage id="dataMapping.purpose.create.tags" />
            </Typography.Text>
            <Typography.Link
              className="font-weight-normal"
              onClick={toggle.edit}
            >
              <PlusOutlined />{' '}
              <IntlMessage id="dataMapping.purpose.create.createTags" />
            </Typography.Link>
          </Flex>
        }
      >
        <TagsSelect />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.status" />
        }
        name="status"
        rules={[validation.required('กรุณาเลือก สถานะ')]}
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
        />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.organization" />
        }
        name="organizationID"
        rules={[validation.required('กรุณาเลือก องค์กร')]}
      >
        <OrganizationPicker readonly />
      </Form.Item>
      <Form.Item
        label={
          <IntlMessage id="dataMapping.purpose.create.data_usage_period" />
        }
        name="isDataUsagePeriod"
        rules={[
          validation.required(
            'กรุณาเลือก ระยะเวลาการใช้ข้อมูล'
          ),
        ]}
      >
        <Radio.Group
          onChange={(e) =>
            setIsDataUsagePeriod(e.target.value)
          }
          value={isDataUsagePeriod}
        >
          <Radio value={true}>
            <IntlMessage id="dataMapping.purpose.create.state_clearly" />
          </Radio>
          <Radio value={false}>
            <IntlMessage id="dataMapping.purpose.create.not_clearly_stated" />
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Row justify={'start'} align={'middle'}>
        {isDataUsagePeriod === true ? (
          <>
            <Col
              {...getColLayout([24, 24, 12, 12, 12, 12])}
            >
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.purpose.create.fill_in_data_usage_period" />
                }
                name={['dataUsagePeriod', 'value']}
                rules={[
                  validation.required(
                    'กรุณากรอก ระยะเวลาการให้ข้อมูล'
                  ),
                ]}
              >
                <InputNumber className="w-100" min={1} />
              </Form.Item>
            </Col>
            <Col
              {...getColLayout([24, 24, 12, 12, 12, 12])}
            >
              <Form.Item
                name={['dataUsagePeriod', 'type']}
                rules={[
                  validation.required(
                    'กรุณาเลือก วัน/เดือน/ปี'
                  ),
                ]}
                className={css`
                  margin-top: 29px;
                  margin-left: 10px;
                `}
              >
                <Select
                  options={[
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.create.day" />
                      ),
                      value: 'day',
                    },
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.create.month" />
                      ),
                      value: 'month',
                    },
                    {
                      label: (
                        <IntlMessage id="dataMapping.purpose.create.year" />
                      ),
                      value: 'year',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col {...getColLayout(24)}>
              <Form.Item
                label={
                  <IntlMessage id="dataMapping.purpose.detail" />
                }
                name={['dataUsagePeriod', 'description']}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col {...getColLayout(24)}>
            <Form.Item
              label={
                <IntlMessage id="dataMapping.purpose.detail" />
              }
              name={['dataUsagePeriod', 'description']}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Col {...getColLayout(24)}>
        <Form.Item
          label={
            <IntlMessage id="dataMapping.purpose.detail.isConsent" />
          }
          name="isConsent"
          rules={[
            validation.required(
              'กรุณาเลือกการใช้หรือเปิดเผยข้อมูลส่วนบุคคล'
            ),
          ]}
        >
          <Radio.Group>
            <Radio value={true}>
              <IntlMessage id="dataMapping.purpose.detail.have" />
            </Radio>
            <Radio value={false}>
              <IntlMessage id="dataMapping.purpose.detail.do_not_have" />
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col {...getColLayout(24)}>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.isConsent !==
            currentValues.isConsent
          }
          noStyle
        >
          {({ getFieldValue }) => {
            const isConsent = getFieldValue('isConsent');
            if (isConsent) {
              return (
                <Form.Item name="consentDetail">
                  <Input.TextArea rows={5} />
                </Form.Item>
              );
            }
            return null;
          }}
        </Form.Item>
      </Col>
      <PurposeCreateGroupModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
      <ModalCreateTags
        open={toggle.openEdit}
        onCancel={toggle.edit}
      />
    </>
  );
};
