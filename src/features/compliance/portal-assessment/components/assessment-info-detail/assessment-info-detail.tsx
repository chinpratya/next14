import { Form, Input } from 'antd';
import { useEffect } from 'react';

import { IntlMessage } from '@utilComponents/intl-message';

import { ResultAssessment } from '../../types/assessment';

export type AssessmentInfoDetailProps = {
  assessment?: ResultAssessment;
};

export const AssessmentInfoDetail = ({
  assessment,
}: AssessmentInfoDetailProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (assessment) {
      form.setFieldsValue(assessment);
    }
  }, [assessment, form]);

  if (!assessment) {
    return null;
  }

  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <IntlMessage id="compliancePortal.result.name" />
          }
          name="name"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="compliancePortal.result.assessmentName" />
          }
          name="assessmentName"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </>
  );
};
