import { Button, Form, Steps } from 'antd';
import { useEffect, useState } from 'react';

import { useNotifications } from '@/stores/notifications';
import { usePolicyBuilderStore } from '@/stores/policy-builder';
import { setValuesToPolicyForm } from '@/utils';
import { Modal } from '@components/modal';

import { useCreatePolicyTemplate } from '../../api/create-policy-template';
import { useGetPolicyTemplateById } from '../../api/get-policy-template-by-id';
import {
  PolicyFormFieldsForm,
  PolicyTemplateFormFields,
} from '../../types';

import { PolicyAddWizardStepModal } from './components/policy-add-wizard-step-modal';

export type PolicyAddWizardModalProps = {
  open: boolean;
  onCancel: () => void;
  templateId?: string;
  policyId: string;
};

export const PolicyAddWizardModal = ({
  open,
  onCancel,
  templateId,
  policyId,
}: PolicyAddWizardModalProps) => {
  const { showNotification } = useNotifications();
  const { initPolicySections } = usePolicyBuilderStore();

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [policyForm, setPolicyForm] =
    useState<PolicyTemplateFormFields>();

  const { data } = useGetPolicyTemplateById({
    templateId,
  });

  useEffect(() => {
    if (data) {
      setPolicyForm(data.form_fields);
    }
  }, [data]);

  const create = useCreatePolicyTemplate({
    templateId: policyId ?? '',
    onSuccess: (policySections) => {
      initPolicySections(policySections);
      showNotification({
        type: 'success',
        message: 'Create policy success',
      });
      onCancel();
    },
  });

  const stepsItems = data?.form_fields.form.map(
    (field, index) => {
      return {
        title: `Step ${index + 1}`,
        description: field?.name
          ? field?.name
          : `ขั้นตอนที่ ${index}`,
        content: (
          <PolicyAddWizardStepModal
            form={form}
            formItem={field?.section ?? []}
            title={field?.name}
          />
        ),
      };
    }
  );

  const onCreate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const formValue = setValuesToPolicyForm(
      values,
      data?.form_fields.form as PolicyFormFieldsForm[]
    );
    const newForm = {
      form: policyForm?.form.map((v, index) => {
        if (index === currentStep) {
          return formValue[currentStep];
        }
        return v;
      }),
    };
    setPolicyForm(newForm as PolicyTemplateFormFields);

    if (
      data &&
      currentStep === data?.form_fields.form.length - 1
    ) {
      create.submit({
        form_fields: newForm,
        form_sections: data?.form_sections,
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <Modal
      title="เลือกเทมเพลต"
      open={open}
      onCancel={onCancel}
      width={1200}
      afterClose={() => {
        setCurrentStep(0);
        form.resetFields();
      }}
      footer={
        <div style={{ textAlign: 'right' }}>
          {currentStep > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() =>
                setCurrentStep((prev) => prev - 1)
              }
            >
              ย้อนกลับ
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              onCreate();
            }}
            loading={create.isLoading}
          >
            {stepsItems &&
            currentStep === stepsItems.length - 1
              ? 'เสร็จสิ้น'
              : 'ถัดไป'}
          </Button>
        </div>
      }
    >
      <Steps current={currentStep}>
        {stepsItems?.map((item) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Steps>
      {stepsItems
        ? stepsItems[currentStep]?.content
        : null}
    </Modal>
  );
};
