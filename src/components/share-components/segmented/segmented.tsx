import { css } from '@emotion/css';
import { Segmented as AntdSegmented } from 'antd';
import type { SegmentedProps as AntdSegmentedProps } from 'antd';

export type SegmentedProps = {
  value?: AntdSegmentedProps['value'];
  defaultValue?: AntdSegmentedProps['defaultValue'];
  onChange?: AntdSegmentedProps['onChange'];
  options: AntdSegmentedProps['options'];
  disabled?: AntdSegmentedProps['disabled'];
  block?: AntdSegmentedProps['block'];
  size?: AntdSegmentedProps['size'];
};

export const Segmented = (props: SegmentedProps) => {
  return (
    <AntdSegmented
      {...props}
      block
      className={css`
        border-radius: 0.625rem !important;
        border: 1px solid #e6ebf1 !important;

        margin-bottom: 24px;

        .ant-segmented-group {
          padding: 4px !important;

          .ant-segmented-item {
            font-weight: bold;
          }

          .ant-segmented-item-selected,
          .ant-segmented-thumb {
            background-color: #3e79f7 !important;
            color: #fff !important;
          }
        }
      `}
    />
  );
};
