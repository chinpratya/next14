import { SearchOutlined } from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import { useTranslation } from 'react-i18next';

export type InputSearchProps = InputProps & {
  search?: string;
  onSearch?: (value: string) => void;
  width?: number | string;
  height?: number | string;
};
export const InputSearch = ({
  width = 350,
  height = 40,
  onSearch,
  search,
  ...props
}: InputSearchProps) => {
  const { t } = useTranslation();

  return (
    <Input
      value={search}
      onChange={(e) => onSearch?.(e.target.value)}
      prefix={<SearchOutlined />}
      style={{ width: width, height: height }}
      placeholder={t('search') as string}
      {...props}
    />
  );
};
