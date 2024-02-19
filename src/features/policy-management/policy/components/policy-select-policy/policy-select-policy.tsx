import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Card, Col, Divider, Row } from 'antd';

import { useToggle } from '@/hooks';
import { IntlMessage } from '@utilComponents/intl-message';

import { PolicySelectTemplateModal } from '../policy-select-template-modal';

export const PolicySelectPolicy = () => {
  const toggle = useToggle();

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col>
          <Card
            hoverable
            style={{ width: 400, height: 270 }}
            cover={
              <>
                <PlusOutlined
                  className={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 50px 0 30px;
                    font-size: 60px;
                    color: #e0e0e0 !important;
                  `}
                />
                <Divider className="my-0" />
              </>
            }
            onClick={() => toggle.create()}
          >
            <Card.Meta
              title={
                <IntlMessage id="policyManagement.policy.create.newPolicy.title" />
              }
              description={
                <IntlMessage id="policyManagement.policy.create.newPolicy.desc" />
              }
            />
          </Card>
        </Col>
      </Row>
      <PolicySelectTemplateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};
