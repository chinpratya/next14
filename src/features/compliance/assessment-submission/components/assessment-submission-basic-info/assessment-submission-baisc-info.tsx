import {
  Card,
  Form,
  FormInstance,
  Input,
  Select,
} from 'antd';

import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListAssessments } from '../../api/list-assessment';

type AssessmentSubmissionBasicInfoProps = {
  form: FormInstance;
  assessmentStatus: string;
  onChangeFormValue: () => void;
};

export const AssessmentSubmissionBasicInfo = ({
  form,
  assessmentStatus,
  onChangeFormValue,
}: AssessmentSubmissionBasicInfoProps) => {
  const isDisable = !['draft'].includes(assessmentStatus);

  const listAssessment = useListAssessments();
  const assessmentOptions = listAssessment.data?.data.map(
    ({ name, ObjectUUID }) => ({
      label: name,
      value: ObjectUUID,
    })
  );

  return (
    <Card
      title={
        <IntlMessage id="compliance.assessmentSubmission.detail.basicInfo.general" />
      }
      loading={listAssessment.isLoading}
    >
      <Form
        layout="vertical"
        form={form}
        disabled={isDisable}
        onFieldsChange={onChangeFormValue}
      >
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentSubmission.name" />
          }
          name="name"
          rules={[
            validation.required(
              'กรุณากรอกชื่อการประเมิน'
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <IntlMessage id="compliance.assessmentSubmission.selectAssessment" />
          }
          name="assessmentID"
          rules={[
            validation.required('กรุณาเลือกแบบประเมิน'),
          ]}
        >
          <Select options={assessmentOptions} />
        </Form.Item>
      </Form>
    </Card>
  );
};
