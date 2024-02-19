import { css } from '@emotion/css';
import {
  PageHeader as AntdPageHeader,
  Typography,
} from 'antd';
import React, { useRef } from 'react';

import { BORDER_COLOR } from '@/config/theme';

export type PageHeaderProps = {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  onBack?: () => void;
  extra?: React.ReactNode;
  overlap?: boolean;
  className?: string;
};

export const PageHeader = ({
  title,
  subtitle,
  extra,
  onBack,
  className,
  overlap = false,
}: PageHeaderProps) => {
  const ref = useRef(null);
  return (
    <div
      className={css`
        .page-header-alt {
          padding: 20px 25px ${overlap ? '45px' : '20px'}
            25px;
          border-bottom: 1px solid ${BORDER_COLOR};
          margin-bottom: ${overlap ? '-45px' : '1.5rem'};
        }

        .ant-page-header {
          padding: 0;
        }

        .ant-page-header-heading-title {
          font-size: 20px;
          font-weight: normal;
        }

        .ant-input-search {
          width: 300px;
        }
      `}
    >
      <div
        ref={ref}
        className={`page-header-alt ${className ?? ''}`}
      >
        <AntdPageHeader
          title={
            <Typography.Title
              level={2}
              className="mb-1 mt-1"
            >
              {title}
            </Typography.Title>
          }
          subTitle={subtitle}
          extra={extra}
          onBack={onBack}
        />
      </div>
    </div>
  );
};
