import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Card,
  Divider,
  Menu,
  Typography,
} from 'antd';

import { usePermission } from '@/hooks';
import { InnerAppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { ConsentFormLanguage } from '@/types';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  TranslateContent,
  TranslateContentProps,
} from './components/translate-content';
import { TranslateSelectForm } from './components/translate-select-form';

export type ConsentTranslateProps = {
  isLoading?: boolean;
  isError?: boolean;
  languages?: ConsentFormLanguage[];
  translateForm?: TranslateContentProps;
  defaultLanguage?: string;
  onDelete?: (language: ConsentFormLanguage) => void;
};

export const ConsentTranslate = ({
  isLoading,
  isError = false,
  languages = [],
  translateForm,
  defaultLanguage = 'th',
  onDelete,
}: ConsentTranslateProps) => {
  const {
    selectedLanguage,
    onChangeSelectedLanguage,
    onToggleAddLanguage,
  } = useConsentBuilderStore();

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [
      permissions[
        'pdpakit:consent:collectionpoint:update'
      ],
    ],
  });

  return (
    <Card
      className={css`
        .ant-card-body {
          padding: ${(isLoading ? 24 : 0) + 'px'};
        }
      `}
      loading={isLoading}
    >
      <div className="p-3 d-flex justify-content-between">
        <TranslateSelectForm />
      </div>
      <Divider className="m-0 p-0s" />
      <InnerAppLayout
        border
        sideContent={
          <div className="w-100">
            <FallbackError isError={isError} borderLess>
              <div className="p-2 border-bottom">
                <Button
                  type="link"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => onToggleAddLanguage?.()}
                  disabled={!editPermission.isAllow}
                >
                  <IntlMessage id="consentManagement.collectionPoint.translate.add" />
                </Button>
              </div>
              {languages?.length === 0 && (
                <div className="p-4 text-center">
                  <Typography.Text className="text-gray-lighter">
                    Do not have any language yet. Please
                    add new language.
                  </Typography.Text>
                </div>
              )}
              <Menu
                selectedKeys={[selectedLanguage ?? '']}
                mode="inline"
                className="w-100"
                onClick={(e) => {
                  if (e.key !== selectedLanguage) {
                    onChangeSelectedLanguage(e.key);
                  }
                }}
                items={languages
                  ?.filter(
                    (language) =>
                      language.languageId !==
                      defaultLanguage
                  )
                  ?.map((language) => ({
                    key: language.languageId,
                    label: (
                      <div
                        className={css`
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                          width: 100%;
                        `}
                      >
                        {language.languageName}
                        {onDelete && (
                          <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              onDelete?.(language)
                            }
                            disabled={
                              !editPermission.isAllow
                            }
                          />
                        )}
                      </div>
                    ),
                  }))}
              />
            </FallbackError>
          </div>
        }
        mainContent={
          <TranslateContent
            {...translateForm}
            defaultLanguage={defaultLanguage}
          />
        }
      />
    </Card>
  );
};
