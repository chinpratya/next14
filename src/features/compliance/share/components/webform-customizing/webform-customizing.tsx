import { css } from '@emotion/css';
import { Card } from 'antd';

import { InnerAppLayout } from '@/layouts';

// eslint-disable-next-line import/no-cycle
import { WebformBuilder } from '../webform-builder';

import { WebformCustomizingSideContent } from './webform-customizing-side-content';

export const WebformCustomizing = () => {
  return (
    <div
      className={css`
        .main-content {
          background-color: #f6f6f6;
        }

        .inner-app-layout {
          border-radius: 0;
          margin: 0 -24px -24px -24px;
        }
      `}
    >
      <InnerAppLayout
        border
        sideContentWidth={350}
        sideContent={<WebformCustomizingSideContent />}
        mainContent={
          <Card
            className={css`
              .ant-card-body {
                padding: 48px 86px;
                min-height: 50vh;
              }
            `}
          >
            <div
              style={{
                cursor: 'not-allowed',
              }}
            >
              <div>
                <WebformBuilder />
              </div>
            </div>
          </Card>
        }
      />
    </div>
  );
};
