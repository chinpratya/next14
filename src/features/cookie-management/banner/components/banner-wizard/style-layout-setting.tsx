import { Divider, Form, Typography } from 'antd';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { StyleLayoutPicker } from './style-layout-picker';

const STYLE_OPTIONS = [
  {
    value: 'style1',
    scr: '/img/cookie-management/banner/banner-1.png',
  },
  {
    value: 'style2',
    scr: '/img/cookie-management/banner/banner-2.png',
  },
];

const PERF_STYLE_OPTIONS = [
  {
    value: 'style1',
    scr: '/img/cookie-management/banner/perf-1.png',
  },
  {
    value: 'style2',
    scr: '/img/cookie-management/banner/perf-2.png',
  },
];

const layoutOptions = (
  isPerfStyle: boolean,
  style: string
) => {
  const styleNumber = style?.replace('style', '');

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

export type StyleLayoutSettingProps = {
  type: 'banner' | 'preference';
};

export const StyleLayoutSetting = ({
  type,
}: StyleLayoutSettingProps) => {
  const styleName =
    type === 'banner' ? 'style' : 'perf_style';

  const styleOptions =
    type === 'banner'
      ? STYLE_OPTIONS
      : PERF_STYLE_OPTIONS;

  const layoutName =
    type === 'banner'
      ? 'popup_position'
      : 'perf_popup_position';

  return (
    <>
      <Form.Item>
        <Typography.Title level={3}>
          <IntlMessage
            id={tokens.cookieManagement.modalWizard.style}
          />
        </Typography.Title>
      </Form.Item>
      <Form.Item name={styleName}>
        <StyleLayoutPicker options={styleOptions} />
      </Form.Item>
      <Divider />
      <Form.Item>
        <Typography.Title level={3}>
          <IntlMessage
            id={
              tokens.cookieManagement.modalWizard.layout
            }
          />
        </Typography.Title>
      </Form.Item>
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
            type === 'banner' ? 'style' : 'perf_style'
          );

          return (
            <Form.Item name={layoutName} noStyle>
              <StyleLayoutPicker
                options={layoutOptions(
                  type === 'preference',
                  style
                )}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </>
  );
};
