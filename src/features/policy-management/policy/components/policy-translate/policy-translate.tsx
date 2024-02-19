import { css } from '@emotion/css';
import { Card, Divider, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/hooks';
import { InnerAppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';

import { useDeletePolicyLanguage } from '../../api/delete-policy-language';
import { useGetPolicyTemplateCustomize } from '../../api/get-policy-template-customize';

import { PolicyTranslateContent } from './components/policy-translate-content';
import { PolicyTranslateLanguages } from './components/policy-translate-languages';

export type PolicyTranslateProps = {
  policyId: string;
};

export const PolicyTranslate = ({
  policyId,
}: PolicyTranslateProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle();
  const [
    selectTranslateSectionId,
    setSelectTranslateSectionId,
  ] = useState<string | null>(null);
  const [
    currentTranslateLanguage,
    setCurrentTranslateLanguage,
  ] = useState<string>('');

  const { data, isLoading, isError } =
    useGetPolicyTemplateCustomize({
      templateId: policyId,
    });

  const options = data?.form_sections?.map(
    (formSection) => ({
      label: formSection.name,
      value: formSection.key,
    })
  );

  const deletePolicyLanguage = useDeletePolicyLanguage({
    policyId,
    onSuccess: () => {
      toggle.remove();
      if (
        currentTranslateLanguage ===
        toggle?.data?.languageId
      ) {
        setCurrentTranslateLanguage('');
      }
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.policy.translate.delete'
        ) as string,
      });
    },
  });

  useEffect(() => {
    if (options?.length && !selectTranslateSectionId) {
      setSelectTranslateSectionId(options[0].value);
    }
  }, [data, options, selectTranslateSectionId]);

  const onChangeSectionSectionId = (sectionId: string) =>
    setSelectTranslateSectionId(sectionId);

  const onChangeCurrentTranslateLanguage = (
    languageId: string
  ) => setCurrentTranslateLanguage(languageId);

  return (
    <FallbackError isError={isError}>
      <Card
        loading={isLoading}
        className={css`
          .ant-card-body {
            padding: ${isLoading ? '24px' : 0};
          }
        `}
      >
        <div className="p-3 d-flex justify-content-between">
          <Select
            style={{ width: '300px' }}
            options={options}
            value={selectTranslateSectionId}
            onChange={onChangeSectionSectionId}
          />
        </div>
        <Divider className="m-0 p-0s" />
        <InnerAppLayout
          border
          sideContent={
            <PolicyTranslateLanguages
              policyId={policyId}
              currentLanguage={currentTranslateLanguage}
              onChangeCurrentLanguage={
                onChangeCurrentTranslateLanguage
              }
              onDelete={toggle.remove}
            />
          }
          mainContent={
            <PolicyTranslateContent
              policyId={policyId}
              currentLanguage={currentTranslateLanguage}
              currentSectionId={
                selectTranslateSectionId ?? ''
              }
            />
          }
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle?.data?.languageName}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deletePolicyLanguage.submit(
            toggle.data.languageId
          )
        }
        okButtonProps={{
          loading: deletePolicyLanguage.isLoading,
        }}
      />
    </FallbackError>
  );
};
