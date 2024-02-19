import { Card, Form, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { IntlMessage } from '@/components/util-components/intl-message';
import { validation } from '@/utils';

import { timeNotificationOptions } from '../../shared/constants';

const { Item } = Form;

export const IndicesInfoDurationTime = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <Item
        name="retention"
        label={
          <IntlMessage id="logManagement.indices.retentionDay" />
        }
        tooltip="Section 26 The service provider must keep the computer traffic data for not less than ninety days from the date the data enters the computer system."
        rules={[
          validation.required(
            <IntlMessage id="logManagement.required" />
          ),
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();

              if (value < 90) {
                return Promise.reject(
                  'retention day must be greater than or equal to 90 day.'
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          className="w-100"
          placeholder={
            t('logManagement.placeholder', {
              field: t(
                'logManagement.indices.retentionDay'
              ),
            }) as string
          }
        />
      </Item>
      <Item
        name="notify"
        label={
          <IntlMessage id="logManagement.indices.timeNotification" />
        }
      >
        <Select>
          {timeNotificationOptions.map((item) => (
            <Select.Option
              key={item.value}
              value={item.value}
            >
              <IntlMessage
                id={item.lang?.key as string}
                options={{ time: item.lang?.value }}
              />
            </Select.Option>
          ))}
        </Select>
      </Item>
    </Card>
  );
};
