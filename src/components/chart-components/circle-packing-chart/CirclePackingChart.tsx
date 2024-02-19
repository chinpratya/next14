import {
  QqOutlined,
  WindowsOutlined,
  AppleOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { Row, Badge } from 'antd';

export type IChildren = {
  name: string;
  label: string;
  value: number;
  color: string;
  icon?: string;
};
export type IDataCirclePacking = {
  name: string;
  color: string;
  children: IChildren[];
};

export type ICirclePacking = {
  data: IDataCirclePacking;
  showlegends?: boolean;
  valueSuffix?: string;
  leavesOnly?: boolean;
  labelsSkipRadius?: number;
};

export const CirclePacking = ({
  data,
  leavesOnly,
  valueSuffix = '',
  showlegends = false,
  labelsSkipRadius = 11,
}: ICirclePacking) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Linux':
        return (
          <QqOutlined
            className={css`
              font-size: 40px;
            `}
          />
        );
      case 'Windows':
        return (
          <WindowsOutlined
            className={css`
              font-size: 40px;
            `}
          />
        );
      case 'MAC OS':
        return (
          <AppleOutlined
            className={css`
              font-size: 40px;
            `}
          />
        );
      default:
        return (
          <DesktopOutlined
            className={css`
              font-size: 40px;
            `}
          />
        );
    }
  };
  return (
    <Row
      justify={'center'}
      align="middle"
      className={css`
        width: 100%;
      `}
    >
      {showlegends && (
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
          `}
        >
          {data?.children?.map(
            (value: IChildren, index: number) => (
              <Row
                key={index}
                className={css`
                  justify-content: space-between;
                  align-items: center;
                  width: 90%;
                  font-size: 15px;
                  margin: 10px;
                  border-bottom: ${value?.icon
                    ? '1px solid #E6EBF1'
                    : 'none'};
                  padding: 5px;

                  :last-child {
                    border-bottom: none;
                  }

                  .anticon {
                    font-size: 25px;
                    padding: 5px;
                    background: #f1f1f1;
                    border-radius: 5px;
                  }
                `}
              >
                {value?.icon ? (
                  getIcon(value?.icon)
                ) : (
                  <Badge
                    key={value.color}
                    color={value.color}
                    className={css`
                      .ant-badge-status-dot {
                        width: 15px;
                        height: 15px;
                      }
                    `}
                  />
                )}
                <span
                  className={css`
                    width: 60%;
                  `}
                >
                  {value?.icon ? (
                    <Badge
                      key={value.color}
                      color={value.color}
                      className={css`
                        .ant-badge-status-dot {
                          width: 10px;
                          height: 10px;
                          margin: 0 10px 5px 0;
                        }
                      `}
                    />
                  ) : null}
                  {value?.name}
                </span>
                <span>{value?.value}</span>
              </Row>
            )
          )}
        </div>
      )}
      <div
        className={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: ${showlegends ? '35%' : '100%'};
          height: 250px;
          border-left: ${showlegends
            ? '2px solid #e6ebf1'
            : 'none'};
        `}
      >
        <ResponsiveCirclePacking
          data={data}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
          id="label"
          value="value"
          colors={(d) => {
            return d.data.color;
          }}
          childColor={{
            from: 'color',
            modifiers: [['brighter', 0.4]],
          }}
          padding={4}
          enableLabels={true}
          label={function (e) {
            if (e.id) {
              return `${e.id} `;
            }
            return '';
          }}
          labelsSkipRadius={labelsSkipRadius}
          labelTextColor={{
            from: 'color',
            modifiers: [['brighter', 10]],
          }}
          valueFormat={(v) => {
            return `${v}${valueSuffix}`;
          }}
          leavesOnly={leavesOnly}
        />
      </div>
    </Row>
  );
};
