import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Input,
  InputRef,
  Space,
} from 'antd';
import { ReactElement, useRef, useState } from 'react';

export type DropdownRenderProps = {
  menu: ReactElement;
};

export const DropdownRender = ({
  menu,
}: DropdownRenderProps) => {
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<
      HTMLButtonElement | HTMLAnchorElement
    >
  ) => {
    e.preventDefault();
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <Space style={{ padding: '0 8px 4px' }}>
        <Input
          ref={inputRef}
          value={name}
          onChange={onNameChange}
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={addItem}
        >
          เพิ่มวิธีการส่งข้อมูล
        </Button>
      </Space>
    </>
  );
};
