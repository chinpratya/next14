import { LockOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import _ from 'lodash';

import { MODULE_ICONS } from '@/config/moduleIcon';
import { useAccessModule } from '@/hooks';
import { permissions } from '@/permissions';
import { ModuleConfig } from '@/types';

export type ModuleItemProps = {
  item: ModuleConfig;
  onClick?: (appPath: string) => void;
};

export const ModuleItem = ({
  item,
  onClick,
}: ModuleItemProps) => {
  const accessModule = _.get(
    permissions,
    (item.permission as string) ?? '',
    undefined
  );
  const { isAccess } = useAccessModule({
    access: accessModule,
  });

  const handleClick = () => {
    // if (isAccess) {
    onClick?.(item.path);
    // }
  };

  return (
    <Card
      onClick={handleClick}
      className={css`
        height: 100%;
        background-color: ${!isAccess
          ? 'rgba(247, 247, 248, 1)'
          : 'none'};
        .ant-card-body {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          cursor: ${!isAccess
            ? 'not-allowed'
            : 'pointer'};
        }

        .box-right {
          width: 70%;
        }

        .box-left {
          display: flex;
          align-items: center;
        }

        :hover {
          cursor: pointer;
          box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
        }
        .icon-module {
          color: ${!isAccess
            ? 'rgba(62, 121, 255, 0.5)'
            : '#3364FE'};
        }
      `}
    >
      <div className="box-left">
        {MODULE_ICONS?.[item.appId]?.[item.id]}
      </div>
      <div className="box-right">
        <Typography.Title level={4} className="mb-0">
          {item.title}
        </Typography.Title>
        <Typography.Text
          type="secondary"
          className="description"
        >
          {item.description}
        </Typography.Text>
      </div>
      {!isAccess ? (
        <div>
          <LockOutlined
            className={css`
              background: #ededed;
              width: 40px;
              height: 50px;
              padding-top: 15px;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
            `}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              fontSize: 19,
            }}
          />
        </div>
      ) : null}
    </Card>
  );
};
