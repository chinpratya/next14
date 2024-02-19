import { css } from '@emotion/css';

import { Session } from '../../types';

import {
  DeviceItem,
  DeviceItemProps,
} from './device-item';

export type DevicesItemsProps = Pick<
  DeviceItemProps,
  'onLogout'
> & {
  devices: Session[];
};
export const DevicesItems = ({
  onLogout,
  devices,
}: DevicesItemsProps) => {
  return (
    <>
      <div
        className={css`
          margin-top: 24px;
        `}
      >
        {devices.map((device) => (
          <DeviceItem
            key={device.session_id}
            device={device}
            onLogout={onLogout}
          />
        ))}
      </div>
    </>
  );
};
