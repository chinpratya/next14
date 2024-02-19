import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

import { useConsentBuilderStore } from '@/stores/consent-builder';

import { ContentEditor } from './components/content-editor';

export type ConsentBuilderContentProps = {
  type: 'header' | 'footer';
  isReadOnly?: boolean;
};
export const ConsentBuilderContent = ({
  type,
  isReadOnly = false,
}: ConsentBuilderContentProps) => {
  const [openEditor, setOpenEditor] = useState(false);

  const { formSetting, onChangeFormSettingContent } =
    useConsentBuilderStore();

  const content = _.get(
    formSetting.form,
    `${type}Content`,
    ''
  ) as string;

  if (content === undefined) {
    return null;
  }

  return (
    <Card
      extra={
        !isReadOnly ? (
          <EditOutlined
            onClick={() => setOpenEditor(true)}
          />
        ) : null
      }
    >
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {!isReadOnly && (
        <ContentEditor
          open={openEditor}
          onClose={() => setOpenEditor(false)}
          type={type}
          content={content}
          onChange={(content: string) =>
            onChangeFormSettingContent(type, content)
          }
        />
      )}
    </Card>
  );
};
