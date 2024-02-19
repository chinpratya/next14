import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Card, Col, Image, Row, Skeleton } from 'antd';
import { produce } from 'immer';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { UploadImageLogo } from '@components/upload-image-logo';

import { useGetIncidentTemplateEventForm } from '../../api/get-incident-template-event-form';
import { IncidentTemplateEventFormType } from '../../types';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type IncidentTemplateEventFormProps = {
  incidentTemplateId: string;
};

export const IncidentTemplateEventForm = ({
  incidentTemplateId,
}: IncidentTemplateEventFormProps) => {
  const { data, isLoading, isError } =
    useGetIncidentTemplateEventForm(incidentTemplateId);
  const [headerLogo, setHeaderLogot] = useState(
    '/img/logo-onefence.png'
  );

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:incidenttemplate:update'
      ],
    ],
  });

  useEffect(() => {
    if (data) {
      setHeaderLogot(data?.formSetting?.headerLogo);
    }
  }, [data]);

  const headerColor = data?.formSetting?.headerColor;
  // const headerLogo = data?.formSetting?.headerLogo;
  const content = data?.formSection?.htmlValue;

  const onContentChange = (value: string) => {
    queryClient.setQueryData(
      [
        dataBreachQueryKeys.incidentTemplate.eventForm(
          incidentTemplateId
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

  const onChangeLogo = (value: string) => {
    setHeaderLogot(value);
    queryClient.setQueryData(
      [
        dataBreachQueryKeys.incidentTemplate.eventForm(
          incidentTemplateId
        ),
      ],
      (oldData) =>
        produce(
          oldData,
          (draft: IncidentTemplateEventFormType) => {
            draft.formSetting.headerLogo = value;
          }
        )
    );
  };
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FallbackError isError={isError}>
      <Row justify="center">
        <Col {...getColLayout(20)}>
          <Card
            className={css`
              border-top: 5px solid ${headerColor};
            `}
          >
            <Flex justify="center">
              <UploadImageLogo
                module="data-breach"
                group="template"
                value={headerLogo}
                onChange={onChangeLogo}
                disabled={!editPermission.isAllow}
              />
            </Flex>
          </Card>
        </Col>
        <Col {...getColLayout(20)}>
          <CkEditor
            value={content}
            onChange={onContentChange}
            disabled={!editPermission.isAllow}
          />
        </Col>
      </Row>
    </FallbackError>
  );
};
