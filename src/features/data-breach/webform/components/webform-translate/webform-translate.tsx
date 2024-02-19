import { useEffect } from 'react';

import { ConsentTranslate } from '@/shared';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetWebformLanguage } from '../../api/get-webform-language';
import { useGetWebformTemplate } from '../../api/get-webform-template';
import { useListWebformLanguage } from '../../api/list-webform-language';
import { useUpdateWebformLanguage } from '../../api/update-webform-language';

import { AddLanguageModal } from './components/add-language-modal';

export type WebformTranslateProps = {
  webformId: string;
  defaultLanguage: string;
};

export const WebformTranslate = ({
  webformId,
  defaultLanguage,
}: WebformTranslateProps) => {
  const { showNotification } = useNotifications();

  const {
    selectedLanguage,
    openAddLanguage,
    onToggleAddLanguage,
    onSetDefaultForm,
  } = useConsentBuilderStore();

  const { data, isLoading, isError } =
    useGetWebformTemplate(webformId);

  const listWebformLanguage =
    useListWebformLanguage(webformId);

  const updateWebformLanguage = useUpdateWebformLanguage({
    webformId,
    languageId: selectedLanguage ?? '',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update language successfully',
      });
    },
  });

  const currentWebform = useGetWebformLanguage({
    webformId,
    languageId: selectedLanguage ?? '',
  });

  useEffect(() => {
    if (data) {
      onSetDefaultForm({
        formItems: data?.form?.formItems,
      });
    }
  }, [data, onSetDefaultForm]);

  if (isLoading) {
    return <Loading align="center" />;
  }

  return (
    <FallbackError isError={isError}>
      <ConsentTranslate
        languages={listWebformLanguage?.data?.map(
          (language) => ({
            languageId: language.LanguageID,
            languageName: language.LanguageName,
          })
        )}
        isLoading={listWebformLanguage.isLoading}
        isError={listWebformLanguage.isError}
        translateForm={{
          translateId: currentWebform?.data?.LanguageID,
          translateName:
            currentWebform?.data?.LanguageName,
          translateForm: currentWebform?.data?.form,
          translateContentProps: {
            isLoading: currentWebform.isLoading,
            isError: currentWebform.isError,
            okButtonLoading:
              updateWebformLanguage.isLoading,
          },
          onSuccess: (form) =>
            form && updateWebformLanguage.submit(form),
        }}
        defaultLanguage={defaultLanguage}
      />
      <AddLanguageModal
        webformId={webformId}
        open={openAddLanguage}
        onClose={() => onToggleAddLanguage()}
      />
    </FallbackError>
  );
};
