import { css } from '@emotion/css';
import {
  Empty,
  Form,
  Radio,
  Skeleton,
  Typography,
} from 'antd';
import type { RadioGroupProps } from 'antd';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';

import { InputSearch } from '@/components/share-components/input-search';
import { useSearch } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useAddPolicyLanguage } from '../../../api/add-polic-language';
import { useListPolicyLanguageMeta } from '../../../api/list-policy-language-meta';

export type PolicyTranslateAddLanguageModalProps = {
  open: boolean;
  onClose: () => void;
  policyId: string;
  keyDisable: string[];
};
export const PolicyTranslateAddLanguageModal = ({
  open,
  onClose,
  policyId,
  keyDisable,
}: PolicyTranslateAddLanguageModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { search, onSearch } = useSearch();
  const [form] = Form.useForm();

  const { data, isError, isLoading } =
    useListPolicyLanguageMeta();

  const addLanguage = useAddPolicyLanguage({
    policyId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'policyManagement.notification.policy.translate.add.success'
        ) as string,
      });
      onClose();
    },
  });

  const language = data?.Language?.map((language) => {
    return {
      label: language.name,
      value: language.ObjectUUID,
      disabled: keyDisable?.includes(language.ObjectUUID),
    };
  });

  const options = language?.filter((language) =>
    language.label
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
  const languagesFirstKey = _.filter(
    options,
    (value) =>
      value.label?.charAt(0).toLowerCase() ===
      search?.charAt(0).toLowerCase()
  );

  const languagesWithOutKey = _.filter(
    options,
    (value) =>
      value.label?.charAt(0).toLowerCase() !==
      search?.charAt(0).toLowerCase()
  );
  const languagesOption = [
    ...languagesFirstKey,
    ...languagesWithOutKey,
  ];
  const onAddLanguage = async () => {
    const value = form.getFieldsValue();
    if (value.languageId) {
      addLanguage.submit(value);
    } else {
      showNotification({
        type: 'error',
        message: t(
          'policyManagement.notification.policy.translate.add.error'
        ) as string,
      });
    }
  };

  return (
    <Modal
      title={
        <IntlMessage id="policyManagement.policy.detail.translate.add" />
      }
      open={open}
      onCancel={onClose}
      width={500}
      onOk={onAddLanguage}
      okButtonProps={{ loading: addLanguage.isLoading }}
    >
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <InputSearch
              onSearch={onSearch}
              className="w-100"
            />

            <Scrollbars
              style={{
                height: '450px',
                marginTop: '20px',
              }}
              autoHide
            >
              {languagesOption.length > 0 ? (
                <Form layout="vertical" form={form}>
                  <Form.Item name="languageId">
                    <Radio.Group
                      className={css`
                        display: flex !important;
                        flex-direction: column;
                        width: 100%;
                      `}
                      options={
                        languagesOption as RadioGroupProps['options']
                      }
                    />
                  </Form.Item>
                </Form>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className="p-4"
                  description={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                        height: '60px',
                      }}
                    >
                      <Typography.Title
                        level={4}
                        className="text-gray-lighter"
                      >
                        <IntlMessage id="consentManagement.collectionPoint.translate.noData" />
                      </Typography.Title>
                    </div>
                  }
                />
              )}
            </Scrollbars>
          </>
        )}
      </FallbackError>
    </Modal>
  );
};
