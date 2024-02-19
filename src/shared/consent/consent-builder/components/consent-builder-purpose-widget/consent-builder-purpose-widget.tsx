import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Card,
  Checkbox,
  Radio,
  Select,
  Space,
  Typography,
} from 'antd';
import _ from 'lodash';

import { REQUIRED_COLOR } from '@/config/color';
import { ConsentPurposeType } from '@/types';

export type ConsentBuilderPurposeWidgetProps = {
  purpose: ConsentPurposeType;
  viewOnly?: boolean;
};

export const ConsentBuilderPurposeWidget = ({
  purpose,
  viewOnly = false,
}: ConsentBuilderPurposeWidgetProps) => {
  return (
    <div
      className="consent-builder-purpose-widget"
      style={{
        cursor: viewOnly ? 'not-allowed' : 'default',
      }}
    >
      {purpose.preferences ? (
        <Card
          className={css`
            .ant-card-body {
              background: none;
              padding: 0 0 24px 0;
            }

            border: none;
            border-radius: 0;
            pointer-events: ${viewOnly ? 'none' : 'auto'};
          `}
          bordered
        >
          <Flex direction="column" gap={16}>
            {purpose.displayType === 'vertical' ? (
              <Flex
                gap={8}
                direction="column"
                justify="start"
                align="start"
              >
                <div className="w-100 text-break d-flex flex-column">
                  <Typography.Text>
                    <label className="ant-form-item-required mr-1 text-danger">
                      *
                    </label>
                    {purpose.name}
                  </Typography.Text>
                  <br />
                  <Typography.Text type="secondary">
                    {purpose.description}
                  </Typography.Text>
                </div>
                <Radio.Group
                  value={_.get(purpose, 'isAccepted')}
                  options={[
                    {
                      label: 'ยินยอม',
                      value: true,
                    },
                    {
                      label: 'ไม่ยินยอม',
                      value: false,
                    },
                  ]}
                />
              </Flex>
            ) : (
              <Checkbox
                checked={_.get(purpose, 'isAccepted')}
              >
                <div className="w-100 text-break d-flex flex-column">
                  <Typography.Text>
                    {purpose.name}
                  </Typography.Text>
                  <br />
                  <Typography.Text type="secondary">
                    {purpose.description}
                  </Typography.Text>
                </div>
              </Checkbox>
            )}
            {purpose?.preferences?.map((preference) => (
              <Flex
                direction="column"
                gap={8}
                key={preference.id}
              >
                <Typography.Text
                  className={css`
                    :before {
                      content: '*';
                      color: ${REQUIRED_COLOR};
                      margin-right: 4px;
                      font-size: 12px;
                    }
                  `}
                >
                  {preference.name}
                </Typography.Text>
                <div>
                  {(preference?.attributeTypeID ===
                    'radio-group' ||
                    preference?.attributeTypeID ===
                      'accept') && (
                    <Radio.Group
                      value={_.get(preference, 'value')}
                    >
                      <Space direction="vertical">
                        {preference?.choices?.map(
                          (choice) => (
                            <Radio
                              key={choice}
                              value={choice}
                            >
                              {choice}
                            </Radio>
                          )
                        )}
                      </Space>
                    </Radio.Group>
                  )}
                  {preference?.attributeTypeID ===
                    'radio-button-group' && (
                    <Radio.Group
                      value={_.get(preference, 'value')}
                      optionType="button"
                      buttonStyle="solid"
                      options={preference?.choices}
                    />
                  )}
                  {preference?.attributeTypeID ===
                    'checkbox-group' && (
                    <Checkbox.Group
                      value={
                        _.get(
                          preference,
                          'value',
                          []
                        ) as string[]
                      }
                    >
                      <Space direction="vertical">
                        {preference?.choices?.map(
                          (choice) => (
                            <Checkbox
                              key={choice}
                              value={choice}
                            >
                              {choice}
                            </Checkbox>
                          )
                        )}
                      </Space>
                    </Checkbox.Group>
                  )}
                  {preference?.attributeTypeID ===
                    'select' && (
                    <Select
                      value={_.get(preference, 'value')}
                      className="w-100"
                      options={preference?.choices?.map(
                        (choice) => ({
                          label: choice,
                          value: choice,
                        })
                      )}
                    />
                  )}
                </div>
              </Flex>
            ))}
          </Flex>
        </Card>
      ) : null}
    </div>
  );
};
