import { Drawer, Form, Select, Skeleton } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { Flex } from '@components/flex';
import { HtmlContentFrame } from '@components/html-content-frame';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetPolicyPreview } from '../../api/get-policy-preview';
import { useListPolicyLanguage } from '../../api/list-policy-language';

export type PolicyPreviewProps = {
  open: boolean;
  onClose: () => void;
  policyId: string;
};

export const PolicyPreview = ({
  open,
  onClose,
  policyId,
}: PolicyPreviewProps) => {
  const [previewLanguage, setPreviewLanguage] = useState<
    string | null
  >(null);

  const language = useListPolicyLanguage(policyId);

  const { data, isLoading, isError } =
    useGetPolicyPreview({
      policyId,
      lang: previewLanguage ?? '',
    });

  const languageOptions = language?.data?.data?.map(
    (language) => ({
      label: language.languageName,
      value: language.languageId,
    })
  );

  useEffect(() => {
    if (!previewLanguage && languageOptions) {
      setPreviewLanguage(
        _.get(languageOptions, '0.value', '')
      );
    }
  }, [languageOptions, previewLanguage]);

  return (
    <Drawer
      title={
        <IntlMessage id="policyManagement.policy.preview" />
      }
      placement="right"
      open={open}
      onClose={onClose}
      width={1200}
      afterOpenChange={(open) => {
        if (!open) {
          setPreviewLanguage(null);
        }
      }}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <Flex
              alignItems="center"
              justifyContent="end"
            >
              <Form>
                <Form.Item
                  label={
                    <IntlMessage id="policyManagement.policy.preview.selectLanguage" />
                  }
                >
                  <Select
                    value={previewLanguage}
                    style={{ width: 150 }}
                    options={languageOptions}
                    onChange={(language) =>
                      setPreviewLanguage(language)
                    }
                  />
                </Form.Item>
              </Form>
            </Flex>
            <div className="p-4">
              <HtmlContentFrame
                html={data as string}
                height="calc(100vh - 225px)"
              />
            </div>
          </>
        )}
      </FallbackError>
    </Drawer>
  );
};
