import { css } from '@emotion/css';
import {
  Button,
  Card,
  Descriptions,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

import { Flex } from '@components/flex';
import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { Session } from '../../types';

const deviceTypeMap = {
  mobile: '/img/devices/mobile.png',
  iphone: '/img/devices/mobile.png',
  desktop: '/img/devices/desktop.png',
  mac: '/img/devices/desktop.png',
  tablet: '/img/devices/tablet.png',
  ipad: '/img/devices/tablet.png',
} as { [key: string]: string };

export type DeviceItemProps = {
  device: Session;
  onLogout: (device: Session) => void;
};

export const DeviceItem = ({
  device,
  onLogout,
}: DeviceItemProps) => {
  return (
    <Card
      className={css`
        .ant-descriptions-item {
          padding-bottom: 5px;
        }
      `}
    >
      <Flex alignItems="start" justifyContent="between">
        <div className="w-25 text-center">
          <Image
            src={
              deviceTypeMap[
                device.device.toLowerCase()
              ] ?? deviceTypeMap['desktop']
            }
            width={108}
            height={108}
            alt=""
          />
        </div>
        <div className="w-50">
          <Typography.Title level={4} className="mb-2">
            {device.device}
          </Typography.Title>
          <Typography.Title
            level={5}
            className="mt-0 text-gray"
          >
            {device.device}
          </Typography.Title>
          <Typography.Title level={5} className="mt-0">
            {device.device_version}
          </Typography.Title>
          <Descriptions column={1}>
            <Descriptions.Item
              label={
                <IntlMessage id="profile.setting.basicInfo.session.ip" />
              }
            >
              {device.ip_address}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <IntlMessage id="profile.setting.basicInfo.session.login" />
              }
            >
              <ShowTagDate
                date={dayjs(
                  device.last_access
                ).toISOString()}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="w-25 text-right">
          <Button
            onClick={() => onLogout(device)}
            type="link"
          >
            <IntlMessage id="profile.setting.basicInfo.session.logout" />
          </Button>
        </div>
      </Flex>
    </Card>
  );
};
