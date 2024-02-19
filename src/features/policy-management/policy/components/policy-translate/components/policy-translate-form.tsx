import { Button, Form, FormInstance } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import dynamic from 'next/dynamic';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type PolicyTranslateFormProps = {
  readonly?: boolean;
  form?: FormInstance;
  languageId?: string;
  onSubmit?: (languageId: string) => void;
  submitButtonProps?: ButtonProps;
};

export const PolicyTranslateForm = ({
  readonly = false,
  form,
  languageId = 'default',
  onSubmit,
  submitButtonProps,
}: PolicyTranslateFormProps) => {
  const editPermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:update'],
    ],
  });

  return (
    <Form form={form} layout="vertical">
      <Form.Item name={[languageId, 'value']}>
        <CkEditor disabled={readonly} />
      </Form.Item>
      <>
        {onSubmit ? (
          <Form.Item>
            <Button
              type="primary"
              onClick={() => onSubmit?.(languageId)}
              {...submitButtonProps}
              disabled={!editPermission.isAllow}
            >
              Save
            </Button>
          </Form.Item>
        ) : null}
      </>
    </Form>
  );
};
