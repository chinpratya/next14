import { Drawer } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';

const CkEditor = dynamic(
  () => import('@utilComponents/ck-editor'),
  {
    ssr: false,
  }
);

export const ConsentBuilderLabelSetting = () => {
  const [value, setValue] = useState<string>('');

  const {
    isOpenLabelSetting,
    currentLabel,
    onToggleLabelSetting,
    onChangeLabelSetting,
  } = useConsentBuilderStore();

  return (
    <Drawer
      title="Edit Label"
      open={isOpenLabelSetting}
      onClose={() => onToggleLabelSetting()}
      placement="right"
      width={750}
      afterOpenChange={(visible) => {
        if (visible) {
          setValue((currentLabel?.value as string) || '');
        } else {
          onChangeLabelSetting({
            value,
          });
          setValue('');
        }
      }}
    >
      <CkEditor
        value={value}
        onChange={(value) => setValue(value)}
      />
    </Drawer>
  );
};
