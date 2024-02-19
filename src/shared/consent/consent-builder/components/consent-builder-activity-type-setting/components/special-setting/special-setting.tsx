import { Checkbox, Form, Typography } from 'antd';

export const SpecialSetting = () => {
  return (
    <>
      <Typography.Title level={3} className="mb-4">
        ตั้งค่า
      </Typography.Title>
      <Form.Item
        name="isAutomaticallyEncrypted"
        valuePropName="checked"
      >
        <Checkbox>
          ถ้าข้อมูลถูกระบุว่าเป็นข้อมูลส่วนบุคคล
          ข้อมูลชุดนี้จะถูกเข้ารหัสอัตโนมัติบนระบบ
          OneFence
        </Checkbox>
      </Form.Item>
    </>
  );
};
