import { css } from '@emotion/css';
import { useMediaQuery } from '@mantine/hooks';
import {
  Col,
  Row,
  Typography,
  Skeleton,
  Empty,
  Form,
  FormInstance,
} from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

import {
  useGetPolicyTemplateCustomize,
  useUpdatePolicyLanguage,
} from '@/features/policy-management';
import { useNotifications } from '@/stores/notifications';
import { PolicyBuilderSection } from '@/types/policy-builder';
import { getColLayout } from '@/utils/getColLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetPolicyLanguage } from '../../../api/get-policy-language';

import { PolicyTranslateForm } from './policy-translate-form';

export type PolicyTranslateContentProps = {
  policyId: string;
  currentLanguage: string;
  currentSectionId: string;
};

const initTranslateForm = (
  translateSections: PolicyBuilderSection[],
  defaultSections: PolicyBuilderSection[],
  currentSectionId: string,
  currentTranslateId: string,
  ctx: FormInstance
) => {
  ctx.resetFields();

  const currentDefaultSection = _.find(defaultSections, {
    key: currentSectionId,
  });

  const currentTranslateSection = _.find(
    translateSections,
    {
      key: currentSectionId,
    }
  );

  if (currentDefaultSection) {
    ctx.setFieldValue(
      ['default', 'value'],
      currentDefaultSection.value
    );
  }

  if (currentTranslateSection) {
    ctx.setFieldValue(
      [currentTranslateId, 'value'],
      currentTranslateSection.value
    );
  }
};

export const PolicyTranslateContent = ({
  policyId,
  currentLanguage,
  currentSectionId,
}: PolicyTranslateContentProps) => {
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const isMobile = useMediaQuery('(max-width: 990px)');

  const updateLanguage = useUpdatePolicyLanguage({
    policyId,
    languageId: currentLanguage,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'updated success',
      });
    },
  });

  const translateLanguage = useGetPolicyLanguage({
    policyId,
    languageId: currentLanguage,
  });

  const defaultLanguage = useGetPolicyTemplateCustomize({
    templateId: policyId,
  });

  useEffect(() => {
    const translateSections =
      translateLanguage?.data?.form?.form_sections ??
      null;
    const defaultSections =
      defaultLanguage?.data?.form_sections ?? null;

    if (translateSections || defaultSections) {
      initTranslateForm(
        translateSections ?? [],
        defaultSections ?? [],
        currentSectionId,
        currentLanguage,
        form
      );
    }
  }, [
    currentLanguage,
    currentSectionId,
    defaultLanguage?.data?.form_sections,
    form,
    translateLanguage?.data?.form?.form_sections,
  ]);

  const isError =
    translateLanguage.isError || defaultLanguage.isError;
  const isLoading =
    translateLanguage.isLoading ||
    defaultLanguage.isLoading;

  const onSave = () => {
    const value = form.getFieldValue([
      currentLanguage,
      'value',
    ]);

    const formSections = [
      ...(translateLanguage?.data?.form?.form_sections ??
        []),
    ];

    const changedIndex =
      _.findIndex(formSections, {
        key: currentSectionId,
      }) ?? -1;

    if (changedIndex < 0) return;
    formSections[changedIndex].value = value;

    const payload = _.merge(translateLanguage?.data, {
      form: {
        ...translateLanguage?.data?.form,
        form_sections: formSections,
      },
    });

    updateLanguage.submit(payload);
  };

  return (
    <Row
      gutter={[0, 0]}
      style={{
        margin: -24,
        paddingTop: isMobile ? 24 : 0,
      }}
      className={css`
        .translate-content {
          height: 1173px;
          max-height: 1173px;
          padding: 0;
        }
      `}
    >
      <Col
        {...getColLayout([24, 24, 24, 12, 12, 12])}
        className="border-right h-100"
      >
        <div className="translate-content">
          <div
            className={`p-3 border-bottom ${
              isMobile ? 'border-top' : ''
            }`}
          >
            <Typography.Title
              level={4}
              className="font-weight-bold mb-0"
            >
              <IntlMessage id="policyManagement.policy.detail.translate.selected" />{' '}
              : {translateLanguage.data?.languageName}
            </Typography.Title>
          </div>
          <div className="p-4">
            {isLoading ? (
              <Skeleton active />
            ) : !currentLanguage ? (
              <Row justify={'center'} align={'middle'}>
                {' '}
                <Col>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />

                  <Typography.Text
                    style={{ color: '#C4C4C4' }}
                  >
                    <IntlMessage id="policyManagement.policy.detail.translate.selectLang" />
                  </Typography.Text>
                </Col>
              </Row>
            ) : (
              <FallbackError isError={isError}>
                <PolicyTranslateForm
                  form={form}
                  readonly={updateLanguage.isLoading}
                  languageId={currentLanguage}
                  onSubmit={onSave}
                  submitButtonProps={{
                    loading: updateLanguage.isLoading,
                  }}
                />
              </FallbackError>
            )}
          </div>
        </div>
      </Col>
      <Col
        {...getColLayout([24, 24, 24, 12, 12, 12])}
        className="border-right h-100"
      >
        <div className="translate-content">
          <div
            className={`p-3 border-bottom ${
              isMobile ? 'border-top' : ''
            }`}
          >
            <Typography.Title
              level={4}
              className="font-weight-bold mb-0"
            >
              <IntlMessage id="policyManagement.policy.detail.translate.default" />{' '}
              : ไทย
            </Typography.Title>
          </div>
          <div className="p-4">
            <FallbackError
              isError={defaultLanguage.isError}
            >
              {defaultLanguage.isLoading ? (
                <Skeleton active />
              ) : (
                <PolicyTranslateForm
                  readonly
                  form={form}
                />
              )}
            </FallbackError>
          </div>
        </div>
      </Col>
    </Row>
  );
};
