import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
} from 'antd';
import React, { useEffect } from 'react';

import { tokens } from '@/lang';
import {
  ConsentFormItemType,
  ConsentFormSettingType,
  ConsentVisibilityType,
} from '@/types';
import {
  setValuesToConsentForm,
  getValuesFromConsentForm,
} from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { ConsentStyleWrapper } from '../consent-style-wrapper';

import { ConsentFormItem } from './components/consent-form-item';
import {
  ConsentFormSection,
  ConsentFormSectionProps,
} from './components/consent-form-section';
import { ConsentRecapcha } from './components/consent-recapcha';

export type ConsentFormProps = Pick<
  ConsentFormSectionProps,
  'isShowHidden'
> & {
  isLoading?: boolean;
  formItems?: ConsentFormItemType[];
  formSettings?: ConsentFormSettingType;
  onSubmit?: (
    form: ConsentFormItemType[],
    values?: Record<string, unknown>
  ) => void;
  formConditions?: ConsentVisibilityType[];
  isLoadingSubmit?: boolean;
  isShowSubmitButton?: boolean;
  viewOnly?: boolean;
  isFullHeight?: boolean;
  paddingLevel?: 0 | 1 | 2 | 3 | 4;
  headerExtra?: React.ReactNode;
  isRecaptcha?: boolean;
};

export const ConsentForm = ({
  isLoading,
  isLoadingSubmit,
  isShowSubmitButton = true,
  formItems,
  formSettings,
  formConditions,
  onSubmit,
  viewOnly,
  isShowHidden,
  isFullHeight,
  paddingLevel,
  headerExtra,
  isRecaptcha,
}: ConsentFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      const newForm = setValuesToConsentForm(
        values,
        formItems as ConsentFormItemType[]
      );
      onSubmit?.(newForm, values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue(
      getValuesFromConsentForm(
        formItems as ConsentFormItemType[]
      )
    );
  }, [form, formItems]);

  return (
    <ConsentStyleWrapper
      pageSetting={formSettings?.page}
      isFullHeight={isFullHeight}
      paddingLevel={paddingLevel}
    >
      <Row justify="center" align="middle">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={20}
          xl={20}
          xxl={18}
          className="mb-4"
        >
          {headerExtra}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={20}
          xl={20}
          xxl={18}
        >
          <div>
            <Card loading={isLoading}>
              <div className="text-center mb-4">
                <Image
                  src={
                    formSettings?.form
                      ?.headerLogo as string
                  }
                  preview={false}
                  alt="consent form logo"
                  height={75}
                />
              </div>
              <div
                hidden={
                  !formSettings?.form?.headerContent
                }
                dangerouslySetInnerHTML={{
                  __html: formSettings?.form
                    ?.headerContent as string,
                }}
              />
            </Card>
            {isLoading && <Card loading={isLoading} />}
            {!isLoading &&
              formItems?.map((formItem) =>
                formItem?.sections?.map((section) => (
                  <ConsentFormSection
                    id={section.id}
                    key={section?.id ?? section?.name}
                    name={section?.name}
                    form={form}
                    visibilities={formConditions}
                    isShowHidden={isShowHidden}
                    properties={section?.properties}
                  >
                    {section?.components?.map(
                      (component) => (
                        <ConsentFormItem
                          key={
                            formItem.id +
                            section.id +
                            (component?.activityID ??
                              component?.purposeID ??
                              component?.name ??
                              component?.id)
                          }
                          form={form}
                          formItem={formItem}
                          section={section}
                          component={component}
                          viewOnly={viewOnly}
                          visibilities={formConditions}
                        />
                      )
                    )}
                  </ConsentFormSection>
                ))
              )}
            <Card
              loading={isLoading}
              hidden={!formSettings?.form?.footerContent}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formSettings?.form
                    ?.footerContent as string,
                }}
              />
            </Card>
            {isShowSubmitButton ? (
              <>
                {isRecaptcha ? (
                  <ConsentRecapcha form={form} />
                ) : null}
                <Button
                  onClick={() => handleSubmit()}
                  type="primary"
                  loading={isLoadingSubmit}
                  hidden={
                    isLoading === true ||
                    viewOnly === true
                  }
                >
                  <IntlMessage id={tokens.common.save} />
                </Button>
              </>
            ) : null}
          </div>
        </Col>
      </Row>
    </ConsentStyleWrapper>
  );
};
