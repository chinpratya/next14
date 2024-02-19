import { QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  type FormInstance,
  Typography,
  Tooltip,
} from 'antd';
import _ from 'lodash';
import Link from 'next/link';

import {
  FormBuilder,
  FormItemType,
} from '@components/form-builder';

export type ConsentFormRequestTypeDsarProps = {
  component: Record<string, unknown>;
  form?: FormInstance;
  isReadonly?: boolean;
};

export const ConsentFormRequestTypeDsar = ({
  component,
  form,
  isReadonly = false,
}: ConsentFormRequestTypeDsarProps) => {
  const label = _.get(component, 'label', '') as string;
  const description = _.get(
    component,
    'description',
    'อ่านรายละเอียดเพิ่มเติม'
  ) as string;
  const lawUrl = _.get(component, 'lawUrl', '') as string;
  const tooltip = _.get(
    component,
    'tooltip',
    ''
  ) as string;

  const options = _.map(
    _.get(component, 'widgetProps.options', []) ?? [],
    (option) => ({
      label: _.get(option, 'label', option) as string,
      value: _.get(option, 'value', option) as string,
    })
  );

  const WidgetLabel = () => {
    return (
      <Flex
        direction="column"
        style={{ width: '100%', marginRight: 12 }}
      >
        <Flex>
          <Typography.Text
            className={css`
              margin-right: 4px;

              :before {
                content: '*';
                color: #ff6b72;
                font-size: 12px;
                margin-right: 4px;
              }
            `}
          >
            {label}
          </Typography.Text>
          {tooltip && (
            <Tooltip
              title={tooltip}
              className="cursor-help"
            >
              <Typography.Text type="secondary">
                <QuestionCircleOutlined />
              </Typography.Text>
            </Tooltip>
          )}
        </Flex>
        {lawUrl && (
          <Flex>
            <Typography.Text
              type="secondary"
              className="mr-1"
            >
              {description}
            </Typography.Text>
            <Link href={lawUrl} passHref target="_blank">
              กฏหมายที่เกี่ยวข้อง
            </Link>
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <div
      className={css`
        .ant-form-item-label > label {
          align-items: flex-start;

          .ant-form-item-tooltip {
            display: none !important;
          }
        }

        .ant-form-item-required::before {
          display: none !important;
        }
      `}
    >
      <FormBuilder
        form={form}
        formItems={[
          {
            ...component,
            label: <WidgetLabel />,
            widgetProps: {
              ...(component?.widgetProps ?? {}),
              options,
            },
          } as unknown as FormItemType,
        ]}
        isReadonly={isReadonly}
      />
    </div>
  );
};
