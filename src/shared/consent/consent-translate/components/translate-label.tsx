import { Form, FormInstance } from 'antd';
import dynamic from 'next/dynamic';

import { TranslateEmpty } from './translate-empty';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export type TranslateLabelProps = {
  form?: FormInstance;
  currentLanguage?: string;
};

export const TranslateLabel = ({
  form,
  currentLanguage,
}: TranslateLabelProps) => {
  if (!currentLanguage) {
    return <TranslateEmpty />;
  }

  const disabled = currentLanguage === 'default';

  return (
    <div className="p-4 h-auto d-block">
      <Form form={form} layout="vertical">
        <Form.Item name={[currentLanguage, 'value']}>
          <CkEditor
            disabled={disabled}
            maxHeight="calc(100vh - 100px)"
          />
        </Form.Item>
      </Form>
    </div>
  );
};
