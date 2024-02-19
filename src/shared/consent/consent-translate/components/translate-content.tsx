import { css } from '@emotion/css';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Col, Form, Row, Typography } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';
import {
  useConsentBuilderStore,
  ConsentFormItemsType,
} from '@/stores/consent-builder';
import { useNotifications } from '@/stores/notifications';
import { ConsentFormType } from '@/types';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetWebformMeta } from '../api/get-webform-meta';

import { TranslateFieldForm } from './translate-field-form';
import { TranslateLabel } from './translate-label';
import { TranslatePurposeForm } from './translate-purpose-form';

const getContentIndex = ({
  selectedTranslateContentId,
  defaultFormItems,
}: {
  selectedTranslateContentId: string[];
  defaultFormItems?: ConsentFormItemsType[];
}) => {
  const [
    translateFormId,
    translateSectionId,
    translateComponentId,
  ] = selectedTranslateContentId;

  const formIndex =
    _.findIndex(
      defaultFormItems,
      (item) => item.id === translateFormId
    ) ?? -1;

  const sectionIndex =
    _.findIndex(
      defaultFormItems?.[formIndex]?.sections,
      (item) => item.id === translateSectionId
    ) ?? -1;

  const componentIndex =
    _.findIndex(
      defaultFormItems?.[formIndex]?.sections?.[
        sectionIndex
      ]?.components,
      (item) =>
        item?.purposeID === translateComponentId ||
        item.name === translateComponentId ||
        item.id === translateComponentId
    ) ?? -1;

  return {
    formIndex,
    sectionIndex,
    componentIndex,
  };
};

const initialTranslateForm = ({
  selectedTranslateContentId,
  translateLanguageId,
  defaultFormItems,
  translateFormItems,
  form,
  onChangeTranslateType,
}: {
  selectedTranslateContentId: string[];
  translateLanguageId?: string;
  defaultFormItems?: ConsentFormItemsType[];
  translateFormItems?: ConsentFormItemsType[];
  form?: FormInstance;
  onChangeTranslateType?: (type: string) => void;
}) => {
  const [, , translateComponentId] =
    selectedTranslateContentId;

  const { formIndex, sectionIndex } = getContentIndex({
    selectedTranslateContentId,
    defaultFormItems,
  });

  const component = _.find(
    defaultFormItems?.[formIndex]?.sections?.[
      sectionIndex
    ]?.components,
    (item) =>
      item?.purposeID === translateComponentId ||
      item?.name === translateComponentId ||
      item?.id === translateComponentId
  );

  const translateComponent = _.find(
    translateFormItems?.[formIndex]?.sections?.[
      sectionIndex
    ]?.components,
    (item) =>
      item.purposeID === translateComponentId ||
      item.name === translateComponentId ||
      item.id === translateComponentId
  );

  onChangeTranslateType?.(
    (component?.type as string) ?? ''
  );

  if (!component) return;

  form?.resetFields();
  form?.setFieldsValue({
    default: component,
  });

  if (!translateComponent || !translateLanguageId) return;

  form?.setFieldsValue({
    [translateLanguageId]: translateComponent,
  });
};

export type TranslateContentProps = {
  translateId?: string;
  translateName?: string;
  translateForm?: ConsentFormType;
  translateContentProps?: {
    isLoading?: boolean;
    isError?: boolean;
    okButtonLoading?: boolean;
  };
  onSuccess?: (form?: ConsentFormType) => void;
  defaultLanguage?: string;
};

export const TranslateContent = ({
  translateId,
  translateName,
  translateForm,
  translateContentProps,
  onSuccess,
  defaultLanguage,
}: TranslateContentProps) => {
  const { showNotification } = useNotifications();
  const isMobile = useMediaQuery('(max-width: 990px)');

  const [translateType, setTranslateType] =
    useState<string>('');

  const { isLoading, isError, okButtonLoading } =
    translateContentProps ?? {
      isLoading: false,
      isError: false,
      okButtonLoading: false,
    };
  const { data: meta } = useGetWebformMeta();

  const languageDefault = meta?.Language.find(
    (language) => language.ObjectUUID === defaultLanguage
  ) ?? { name: 'ไทย' };

  const [form] = Form.useForm();

  const { selectedTranslateContentId, defaultFormItems } =
    useConsentBuilderStore();

  const onChangeTranslateType = (type: string) =>
    setTranslateType(type);

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue([
        translateId ?? '',
      ])?.[translateId ?? ''];
      const { formIndex, sectionIndex, componentIndex } =
        getContentIndex({
          selectedTranslateContentId:
            selectedTranslateContentId ?? [],
          defaultFormItems,
        });
      if (
        formIndex < 0 ||
        sectionIndex < 0 ||
        componentIndex < 0
      )
        return;
      const newTranslateFormItems =
        _.cloneDeep(translateForm);

      newTranslateFormItems?.formItems?.[
        formIndex
      ]?.sections?.[sectionIndex]?.components?.splice(
        componentIndex,
        1,
        {
          ...newTranslateFormItems?.formItems?.[formIndex]
            ?.sections?.[sectionIndex]?.components?.[
            componentIndex
          ],
          ...values,
        }
      );
      onSuccess?.(newTranslateFormItems);
    } catch (error) {
      showNotification({
        message: _.get(
          error,
          'errorFields[0].errors[0]',
          'กรุณากรอกข้อมูลให้ครบถ้วน'
        ),
        type: 'error',
      });
    }
  };

  const renderTranslateFieldForm = useCallback(
    (currentLanguage: string) => {
      switch (translateType) {
        case 'purpose':
          return (
            <TranslatePurposeForm
              form={form}
              currentLanguage={currentLanguage}
            />
          );
        case 'label':
          return (
            <TranslateLabel
              form={form}
              currentLanguage={currentLanguage}
            />
          );
        case 'field':
          return (
            <TranslateFieldForm
              form={form}
              currentLanguage={currentLanguage}
            />
          );
        case 'identifier':
          return (
            <TranslateFieldForm
              form={form}
              currentLanguage={currentLanguage}
            />
          );
        default:
          return null;
      }
    },
    [form, translateType]
  );

  useEffect(() => {
    initialTranslateForm({
      selectedTranslateContentId:
        selectedTranslateContentId ?? [],
      translateLanguageId: translateId,
      defaultFormItems,
      translateFormItems: translateForm?.formItems,
      form,
      onChangeTranslateType,
    });
  }, [
    selectedTranslateContentId,
    defaultFormItems,
    form,
    translateId,
    translateForm,
  ]);

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [
      permissions[
        'pdpakit:consent:collectionpoint:update'
      ],
    ],
  });
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
          padding: ${isError ? 24 : 0}px;
        }
      `}
    >
      <Col
        {...getColLayout([24, 24, 24, 12, 12, 12])}
        className="border-right h-100"
      >
        <div className="translate-content">
          <FallbackError isError={isError}>
            <div
              className={`p-3 border-bottom ${
                isMobile ? 'border-top' : ''
              }`}
            >
              <Typography.Title
                level={4}
                className="font-weight-bold mb-0"
              >
                <IntlMessage id="consentManagement.collectionPoint.translate.selected" />{' '}
                : {translateName ?? '-'}
              </Typography.Title>
            </div>
            {isLoading && (
              <div className="p-3">
                <Loading align="left" />
              </div>
            )}
            {renderTranslateFieldForm(
              (translateId as string) ?? ''
            )}
            <Button
              type="primary"
              loading={okButtonLoading}
              className="ml-3 mr-3 mb-3"
              hidden={!translateId || isLoading}
              onClick={onSubmit}
              disabled={!editPermission.isAllow}
            >
              บันทึก
            </Button>
          </FallbackError>
        </div>
      </Col>
      <Col {...getColLayout([24, 24, 24, 12, 12, 12])}>
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
              <IntlMessage id="consentManagement.collectionPoint.translate.default" />{' '}
              : {languageDefault?.name}
            </Typography.Title>
          </div>
          {renderTranslateFieldForm('default')}
        </div>
      </Col>
    </Row>
  );
};
