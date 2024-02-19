import { css } from '@emotion/css';
import { Form, InputNumber, Row } from 'antd';

export type DownTimeSchedulerProps = {
  name: string;
};

export const DownTimeScheduler = ({
  name,
}: DownTimeSchedulerProps) => {
  return (
    <Row
      justify={'space-between'}
      className={css`
        width: 50%;
      `}
    >
      <Form.Item
        name={[name, 'day']}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} max={30} /> วัน
      </Form.Item>
      <Form.Item
        name={[name, 'hour']}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} max={24} /> ชั่วโมง
      </Form.Item>
      <Form.Item
        name={[name, 'minute']}
        rules={[{ required: true }]}
      >
        <InputNumber min={0} max={60} /> นาที
      </Form.Item>
    </Row>
  );
};
