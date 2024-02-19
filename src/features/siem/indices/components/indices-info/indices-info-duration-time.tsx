import { Card, Form, Select } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

import {
  retentionOptions,
  timeNotificationOptions,
} from '../../share/constants';

const { Item } = Form;

export const IndicesInfoDurationTime = () => {
  return (
    <Card>
      <Item
        name="retention"
        label={
          <IntlMessage id="logManagement.indices.retentionDay" />
        }
        tooltip="Section 26 The service provider must keep the computer traffic data for not less than ninety days from the date the data enters the computer system."
      >
        <Select
          options={retentionOptions.map((item) => ({
            ...item,
            label: (
              <IntlMessage
                id={item.lang}
                options={{ value: item.value }}
              />
            ),
          }))}
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
