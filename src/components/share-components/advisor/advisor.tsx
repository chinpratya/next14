import { QuestionCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Tooltip } from 'antd';
import { HiOutlineLightBulb } from 'react-icons/hi';

export type AdvisorProps = {
  label?: string;
  adviser: string;
  tooltip?: string;
  href?: string;
  target?: string;
};

export const Advisor = ({
  label = '',
  tooltip,
  adviser,
  href,
  target = '_blank',
}: AdvisorProps) => {
  return (
    <div
      className={css`
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        .ant-btn-link {
          padding: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          color: #6f42c1;

          svg {
            font-size: 18px;
          }
        }

        .anticon {
          margin-left: 5px;
          color: #72849a;
        }
      `}
    >
      <label>
        {label}
        {tooltip ? (
          <Tooltip title={tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        ) : null}
      </label>
      <Button type="link" href={href} target={target}>
        <HiOutlineLightBulb />
        {adviser}
      </Button>
    </div>
  );
};
