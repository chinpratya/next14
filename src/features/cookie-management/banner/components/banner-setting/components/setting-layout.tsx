import { Form } from 'antd';

import { SettingLayoutPicker } from './setting-layout-picker';

export type SettingLayoutProps = {
  isPerfStyle?: boolean;
};

const layoutOptions = (
  isPerfStyle: boolean,
  style: string
) => {
  const styleNumber = style.replace('style', '');

  if (isPerfStyle) {
    return [
      {
        value: 'left',
        scr: `/img/cookie-management/banner/perf-${styleNumber}-left.png`,
      },
      {
        value: 'center',
        scr: `/img/cookie-management/banner/perf-${styleNumber}-center.png`,
      },
      {
        value: 'right',
        scr: `/img/cookie-management/banner/perf-${styleNumber}-right.png`,
      },
    ];
  }

  return [
    {
      value: 'top',
      scr: `/img/cookie-management/banner/banner-${styleNumber}-top.png`,
    },
    {
      value: 'center',
      scr: `/img/cookie-management/banner/banner-${styleNumber}-center.png`,
    },
    {
      value: 'bottom',
      scr: `/img/cookie-management/banner/banner-${styleNumber}-bottom.png`,
    },
  ];
};

export const SettingLayout = ({
  isPerfStyle = false,
}: SettingLayoutProps) => {
  const layoutName = isPerfStyle
    ? 'perf_popup_position'
    : 'popup_position';

  return (
    <Form.Item
      shouldUpdate={(prevValues, currentValues) =>
        prevValues?.style !== currentValues?.style ||
        prevValues?.perf_style !==
          currentValues?.perf_style
      }
      noStyle
    >
      {({ getFieldValue }) => {
        const style = getFieldValue(
          isPerfStyle ? 'perf_style' : 'style'
        );

        return (
          <Form.Item name={layoutName} noStyle>
            <SettingLayoutPicker
              options={layoutOptions(isPerfStyle, style)}
            />
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};
