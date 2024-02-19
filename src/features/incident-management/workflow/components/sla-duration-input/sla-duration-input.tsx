import {
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Grid } from '@mantine/core';
import { Form, Input } from 'antd';

type SlaDurationInputProps = {
  name: string;
};

export function SlaDurationInput({
  name,
}: SlaDurationInputProps) {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Form.Item label="Days" name={[name, 'days']}>
          <Input
            placeholder="Days"
            suffix={
              <CalendarOutlined
                style={{
                  color: '#6C737F',
                }}
              />
            }
          />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={4}>
        <Form.Item label="Hours" name={[name, 'hours']}>
          <Input
            placeholder="Hours"
            suffix={
              <ClockCircleOutlined
                style={{
                  color: '#6C737F',
                }}
              />
            }
          />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={4}>
        <Form.Item
          label="Minutes"
          name={[name, 'minutes']}
        >
          <Input
            placeholder="Minutes"
            suffix={
              <ClockCircleOutlined
                style={{
                  color: '#6C737F',
                }}
              />
            }
          />
        </Form.Item>
      </Grid.Col>
    </Grid>
  );
}
