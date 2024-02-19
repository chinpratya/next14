import { Drawer, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import { ConsentForm } from '@/shared';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPointPreviewLanguage } from '../../api/get-collection-point-preview-language';

export type CollectionPointPreviewProps = {
  open: boolean;
  onClose: () => void;
  collectionPointId: string;
};

export const CollectionPointPreview = ({
  open,
  onClose,
  collectionPointId,
}: CollectionPointPreviewProps) => {
  const { data, isLoading, isError } =
    useGetCollectionPointPreviewLanguage(
      collectionPointId
    );

  const [selectedLanguage, setSelectedLanguage] =
    useState<string | undefined>('');

  useEffect(() => {
    if (data) {
      setSelectedLanguage(data.mainLanguage);
    }
  }, [data]);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const languageOptions =
    data?.defaultLanguage?.map((language) => ({
      label: language?.toUpperCase(),
      value: language,
    })) ?? [];

  const currentFormTemplate = data?.formTemplate?.find(
    (template) => template.languageID === selectedLanguage
  )?.formTemplate;

  return (
    <Drawer
      title={
        <IntlMessage id="consentManagement.collectionPoint.table.preview" />
      }
      placement="right"
      open={open}
      onClose={onClose}
      width={1200}
    >
      <FallbackError isError={isError}>
        {isLoading || !selectedLanguage ? (
          <Skeleton active />
        ) : (
          <div className="cursor-not-allowed">
            <ConsentForm
              headerExtra={
                <Flex
                  alignItems="center"
                  justifyContent="end"
                >
                  <Select
                    style={{ width: 150 }}
                    loading={!data}
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                  />
                </Flex>
              }
              isFullHeight
              viewOnly
              formSettings={
                currentFormTemplate?.formSetting
              }
              formItems={currentFormTemplate?.formItems}
            />
          </div>
        )}
      </FallbackError>
    </Drawer>
  );
};
