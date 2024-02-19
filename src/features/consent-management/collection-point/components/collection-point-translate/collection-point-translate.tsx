import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/hooks';
import { ConsentTranslate } from '@/shared';
import { useConsentBuilderStore } from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { ConsentFormLanguage } from '@/types';
import { DeleteModal } from '@components/delete-modal';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';

import { useDeleteCollectionPointLanguage } from '../../api/delete-collection-point-language';
import { useGetCollectionPointLanguage } from '../../api/get-collection-point-language';
import { useGetCollectionPointPreview } from '../../api/get-collection-point-preview';
import { useListCollectionPointLanguage } from '../../api/list-collection-point-language';
import { useUpdateCollectionPointLanguage } from '../../api/update-collection-point-language';

import { AddLanguageModal } from './components/add-language-modal';

export type CollectionPointTranslateProps = {
  collectionPointId: string;
  defaultLanguage: string;
};

export const CollectionPointTranslate = ({
  collectionPointId,
  defaultLanguage,
}: CollectionPointTranslateProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const toggle = useToggle<ConsentFormLanguage>();

  const {
    selectedLanguage,
    openAddLanguage,
    onChangeSelectedLanguage,
    onToggleAddLanguage,
    onSetDefaultForm,
  } = useConsentBuilderStore();

  const { data, isLoading, isError } =
    useGetCollectionPointPreview(collectionPointId);

  const deleteCollectionPointLanguage =
    useDeleteCollectionPointLanguage({
      collectionPointId,
      onSuccess: () => {
        onChangeSelectedLanguage('');
        toggle.remove();
        showNotification({
          type: 'success',
          message: t(
            'consentManagement.notification.collectionPoint.translate.delete'
          ) as string,
        });
      },
    });

  const listCollectionPointLanguage =
    useListCollectionPointLanguage(collectionPointId);

  const updateCollectionPointLanguage =
    useUpdateCollectionPointLanguage({
      collectionPointId,
      languageId: selectedLanguage ?? '',
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'consentManagement.notification.collectionPoint.translate.update'
          ) as string,
        });
      },
    });

  const currentCollectionPoint =
    useGetCollectionPointLanguage({
      collectionPointId,
      languageId: selectedLanguage ?? '',
    });

  useEffect(() => {
    if (data) {
      onSetDefaultForm({
        formItems: data?.formItems,
      });
    }
  }, [data, onSetDefaultForm]);

  if (isLoading) {
    return <Loading align="center" />;
  }

  const languages = listCollectionPointLanguage.data;

  return (
    <FallbackError isError={isError}>
      <ConsentTranslate
        languages={languages?.map((language) => ({
          languageId: language.languageID,
          languageName: language.languageName,
        }))}
        isLoading={listCollectionPointLanguage.isLoading}
        isError={listCollectionPointLanguage.isError}
        translateForm={{
          translateId:
            currentCollectionPoint?.data?.languageID,
          translateName:
            currentCollectionPoint?.data?.languageName,
          translateForm:
            currentCollectionPoint?.data?.form,
          translateContentProps: {
            isLoading: currentCollectionPoint.isLoading,
            isError: currentCollectionPoint.isError,
            okButtonLoading:
              updateCollectionPointLanguage.isLoading,
          },
          onSuccess: (form) =>
            form &&
            updateCollectionPointLanguage.submit(form),
        }}
        onDelete={toggle.remove}
        defaultLanguage={defaultLanguage}
      />
      <AddLanguageModal
        collectionPointId={collectionPointId}
        open={openAddLanguage}
        onClose={() => onToggleAddLanguage()}
      />
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle?.data?.languageName}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteCollectionPointLanguage.submit(
            toggle.data.languageId
          )
        }
        loading={deleteCollectionPointLanguage.isLoading}
      />
    </FallbackError>
  );
};
