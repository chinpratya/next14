import { css } from '@emotion/css';

import { InnerAppLayout } from '@/layouts';

// eslint-disable-next-line import/no-cycle
import { WebformLogicMainContent } from './webform-logic-main-content';
import { WebformLogicSideContent } from './webform-logic-side-content';

export const WebformLogic = () => {
  return (
    <>
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
          sideContentWidth={350}
          sideContent={<WebformLogicSideContent />}
          mainContent={<WebformLogicMainContent />}
        />
      </div>
    </>
  );
};
