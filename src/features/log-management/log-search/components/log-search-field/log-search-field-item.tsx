import { css } from '@emotion/css';
import { Checkbox, Typography } from 'antd';

type LogSearchFieldItemProps = {
  label: string;
  selected: string[];
  onChecked: (checked: boolean, value: string) => void;
};

export const LogSearchFieldItem = ({
  label,
  selected,
  onChecked,
}: LogSearchFieldItemProps) => {
  return (
    <Checkbox
      className={css`
        margin-left: 0 !important;
      `}
      key={label}
      name={label}
      checked={selected.includes(label)}
      onChange={(e) => onChecked(e.target.checked, label)}
    >
      <Typography.Text
        style={{
          width: 170,
          position: 'relative',
          zIndex: 10,
        }}
        ellipsis={{ tooltip: label }}
      >
        {label}
      </Typography.Text>
    </Checkbox>
  );
};
