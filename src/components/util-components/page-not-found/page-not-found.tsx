import { HomeOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Result } from 'antd';

import { Flex } from '@components/flex';

export type PageNotFoundProps = {
  onBack?: () => void;
  onHome?: () => void;
  withLayout?: boolean;
};

export const PageNotFound = ({
  onBack,
  onHome,
  withLayout = false,
}: PageNotFoundProps) => {
  return (
    <div
      className={css`
        height: ${withLayout
          ? 'calc(100vh - 180px)'
          : '100vh'};
        min-height: 550px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Result
        status="404"
        title="Page Not Found"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Flex justifyContent="center">
            <Button
              type="primary"
              className="mr-2"
              onClick={onBack}
            >
              Go Back
            </Button>
            <Button onClick={onHome}>
              <HomeOutlined />
              Home Page
            </Button>
          </Flex>
        }
      />
    </div>
  );
};
