import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  InputRef,
  Typography,
} from 'antd';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Flex } from '@components/flex';

export type AddSelectProps = {
  loading?: boolean;
  addText: string;
  errorMessage: string;
  onAdd?: (value: string) => void;
};

export const AddSelect = ({
  loading,
  addText,
  errorMessage,
  onAdd,
}: AddSelectProps) => {
  const inputRef = useRef<InputRef>(null);
  const [inputValue, setInputValue] =
    useState<string>('');
  const [inputError, setInputError] =
    useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
    setInputError(false);
  };

  const handleAddOption = () => {
    if (!inputValue) {
      setInputError(true);
      return;
    }
    onAdd?.(inputValue);
  };

  useEffect(() => {
    if (!loading) {
      setInputValue('');
      setInputError(false);
    }
  }, [loading]);

  return (
    <div className="p-2">
      <Flex justifyContent="between">
        <Input
          ref={inputRef}
          value={inputValue}
          status={inputError ? 'error' : ''}
          className="mr-2"
          onChange={handleInputChange}
        />
        <Button
          type="text"
          loading={loading}
          icon={<PlusOutlined />}
          onClick={handleAddOption}
        >
          {addText}
        </Button>
      </Flex>
      {inputError && (
        <Typography.Text type="danger">
          {errorMessage}
        </Typography.Text>
      )}
    </div>
  );
};
