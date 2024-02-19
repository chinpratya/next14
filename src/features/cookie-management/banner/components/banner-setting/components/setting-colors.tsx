import {
  Form,
  InputNumber,
  Radio,
  Typography,
} from 'antd';

import { tokens } from '@/lang';
import { ColorPicker } from '@components/color-picker';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

export type SettingColorsProps = {
  isPerfStyle?: boolean;
};

export const SettingColors = ({
  isPerfStyle,
}: SettingColorsProps) => {
  const colorModeName = isPerfStyle
    ? 'perf_color_mode'
    : 'color_mode';
  const textColorName = isPerfStyle
    ? 'perf_text_color'
    : 'text_color';
  const buttonColorName = isPerfStyle
    ? 'perf_primary_color'
    : 'primary_color';

  return (
    <>
      <Form.Item
        initialValue="light"
        className="text-center"
        name={colorModeName}
      >
        <Radio.Group
          options={[
            {
              label: (
                <IntlMessage id={tokens.common.light} />
              ),
              value: 'light',
            },
            {
              label: (
                <IntlMessage id={tokens.common.dark} />
              ),
              value: 'dark',
            },
          ]}
          optionType="button"
        />
      </Form.Item>
      {!isPerfStyle && (
        <Flex
          alignItems="center"
          justifyContent="between"
          className="mb-4"
        >
          <Typography.Text>
            <IntlMessage id={tokens.common.opacity} />
          </Typography.Text>
          <Form.Item name="opacity" noStyle>
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
            />
          </Form.Item>
        </Flex>
      )}
      <Flex
        alignItems="center"
        justifyContent="between"
        className="mb-4"
      >
        <Typography.Text>
          <IntlMessage id={tokens.common.textColor} />
        </Typography.Text>
        <Form.Item
          name={textColorName}
          valuePropName="color"
          noStyle
        >
          <ColorPicker />
        </Form.Item>
      </Flex>
      {isPerfStyle && (
        <Flex
          alignItems="center"
          justifyContent="between"
          className="mb-4"
        >
          <Typography.Text>
            <IntlMessage
              id={
                tokens.cookieManagement.cookieBanner
                  .cookieDetailTextColor
              }
            />
          </Typography.Text>
          <Form.Item name="perf_text_link_color" noStyle>
            <ColorPicker />
          </Form.Item>
        </Flex>
      )}
      <Flex
        alignItems="center"
        justifyContent="between"
        className="mb-4"
      >
        <Typography.Text>
          <IntlMessage id={tokens.common.buttonColor} />
        </Typography.Text>
        <Form.Item
          name={buttonColorName}
          valuePropName="color"
          noStyle
        >
          <ColorPicker />
        </Form.Item>
      </Flex>
    </>
  );
};
