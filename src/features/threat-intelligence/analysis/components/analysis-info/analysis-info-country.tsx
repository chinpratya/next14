import { css } from '@emotion/css';
import { Card } from 'antd';

import { color } from '../../../shared';

import data from './mock-data.json';

export const AnalysisInfoCountry = () => {
  const total = data.country.reduce(
    (sum, current) => sum + current.value,
    0
  );

  return (
    <Card title="ประเทศ" className="h-100">
      <div
        className={css`
          margin: 36px 0 20px 0;
          position: relative;
          background-color: #e2e2e2;
          height: 40px;
          width: 100%;
          border-radius: 10px;
        `}
      >
        {data.country.map((item, index) => {
          const width = `${(item.value * 100) / total}%`;
          return (
            <span
              key={item.id}
              className={css`
                display: inline-block !important;
                margin-left: ${index > 0 ? -14 : 0}px;
                width: calc(
                  ${width} + ${index > 0 ? 14 : 0}px
                );
                height: 100%;
                background-color: ${color.list[index]};
                border-radius: 10px;
                position: relative;
                z-index: ${data.country.length - index};
              `}
            >
              <div
                className={css`
                  position: absolute;
                  left: 6px;
                  bottom: -38px;
                  ${index % 2 === 0
                    ? 'top: -38px;'
                    : 'bottom: -38px;'}
                  font-size: 10px;

                  ::after {
                    border-left: 1px solid #e6ebf1;
                    content: '';
                    display: block;
                    height: 17px;
                    left: 0px;
                    position: absolute;
                    top: ${index % 2 === 0
                      ? '17px'
                      : '-21px'};
                    width: 1px;
                    z-index: 0;
                  }
                `}
              >
                {`${item.name} (${item.value})`}
              </div>
            </span>
          );
        })}
      </div>
    </Card>
  );
};
