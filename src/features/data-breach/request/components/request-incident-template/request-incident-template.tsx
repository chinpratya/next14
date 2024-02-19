import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Col, Image, Row } from 'antd';
import { produce } from 'immer';
import dynamic from 'next/dynamic';

import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';

import { IncidentTemplateEventFormType } from '../../../incident-template';
import { useGetRequestIncidentTemplate } from '../../api/get-request-incident-template';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type RequestIncidentTemplateProps = {
  requestId: string;
};

export const RequestIncidentTemplate = ({
  requestId,
}: RequestIncidentTemplateProps) => {
  const { data, isLoading, isError } =
    useGetRequestIncidentTemplate(requestId);

  const headerColor = data?.formSetting?.headerColor;
  const headerLogo = data?.formSetting?.headerLogo;
  const content = data?.formSection?.htmlValue;

  const onContentChange = (value: string) => {
    queryClient.setQueryData(
      [
        dataBreachQueryKeys.request.incidentTemplate(
          requestId
        ),
      ],
      (oldData) =>
        produce(
          oldData,
          (draft: IncidentTemplateEventFormType) => {
            draft.formSection.htmlValue = value;
          }
        )
    );
  };

  return (
    <FallbackError isError={isError}>
      <Card loading={isLoading}>
        <Row justify="center">
          <Col {...getColLayout(20)}>
            <Card
              className={css`
                border-top: 5px solid ${headerColor};
              `}
            >
              <Flex justify="center">
                <Image
                  src={headerLogo}
                  alt="incident form logo"
                  preview={false}
                  height={50}
                />
              </Flex>
            </Card>
          </Col>
          <Col {...getColLayout(20)}>
            <CkEditor
              disabled={!data?.isSentTemplate}
              value={content}
              onChange={onContentChange}
            />
          </Col>
        </Row>
      </Card>
    </FallbackError>
  );
};
