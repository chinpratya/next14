import { PaperClipOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Row, Col, Descriptions, Typography } from 'antd';

import { getColLayout } from '@/utils';

import { RequestVerification } from '../../types';

type RequestDetailVerificationMangeDocumentProps = {
  data: RequestVerification;
};
export const RequestDetailVerificationMangeDocument = ({
  data,
}: RequestDetailVerificationMangeDocumentProps) => {
  console.log('RequestVerification', data);

  return (
    <>
      {data.document?.map((v) => {
        return (
          <Row key={v.name}>
            <Col
              {...getColLayout([24, 24, 24, 24, 24, 24])}
              className={css`
                .ant-descriptions-row {
                  acground-color: red;
                }
              `}
            >
              <Descriptions layout="vertical">
                <Descriptions.Item
                  label={v.name}
                  labelStyle={{
                    fontWeight: 'bold',
                  }}
                >
                  {v.description}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Row>
              {v.filepath !== '' ? (
                <Typography.Link href={v.filepath}>
                  <PaperClipOutlined />
                  {v.filepath}
                </Typography.Link>
              ) : null}
            </Row>
          </Row>
        );
      })}
    </>
  );
};
