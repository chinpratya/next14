import { Form } from 'antd';

import { SettingStylePicker } from './setting-style-picker';

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

export type SettingStyleProps = {
  name: 'style' | 'perf_style';
};

export const SettingStyle = ({
  name,
}: SettingStyleProps) => {
  const options =
    name === 'style' ? STYLE_OPTIONS : PERF_STYLE_OPTIONS;

  return (
    <Form.Item name={name} className="mb-0">
      <SettingStylePicker options={options} />
    </Form.Item>
  );
};
