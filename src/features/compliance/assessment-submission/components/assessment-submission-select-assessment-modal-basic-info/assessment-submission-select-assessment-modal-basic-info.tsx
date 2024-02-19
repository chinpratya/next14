import {
  Checkbox,
  Form,
  FormInstance,
  Input,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListAssessments } from '../../api/list-assessment';

export type AssessmentSubmissionSelectAssessmentModalBasicInfoProps =
  {
    form: FormInstance;
  };

export const AssessmentSubmissionSelectAssessmentModalBasicInfo =
  ({
    form,
  }: AssessmentSubmissionSelectAssessmentModalBasicInfoProps) => {
    const { t } = useTranslation();
    const { data, isError, isLoading } =
      useListAssessments();

    const listAssessmentOptions = data?.data.map(
      (assessment) => ({
        label: assessment.name,
        value: assessment.ObjectUUID,
      })
    );

    useEffect(() => {
      if (data && data.data.length > 0) {
        form.setFieldValue(
          'assessmentID',
          data.data[0].ObjectUUID
        );
      }
    }, [data, form]);

    if (isLoading) return <Skeleton />;

    return (
      <FallbackError isError={isError}>
        <Typography.Title level={4} className="mb-4 ">
          <IntlMessage id="compliance.assessmentSubmission.create.basicInfo" />
        </Typography.Title>
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentSubmission.name" />
          }
          name="name"
          rules={[
            validation.required(
              t(
                'compliance.assessmentSubmission.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentSubmission.assessmentName" />
          }
          name="assessmentID"
          rules={[
            validation.required(
              t(
                'compliance.assessmentSubmission.assessmentNameRequired'
              )
            ),
          ]}
        >
          <Select options={listAssessmentOptions} />
        </Form.Item>
        <Form.Item
          name="haveApprover"
          valuePropName="checked"
        >
          <Checkbox>
            <Typography.Text>
              <IntlMessage id="compliance.assessmentSubmission.create.basicInfo.haveApprover" />
            </Typography.Text>
          </Checkbox>
        </Form.Item>
      </FallbackError>
    );
  };
