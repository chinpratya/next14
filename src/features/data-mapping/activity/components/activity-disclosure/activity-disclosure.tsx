import { Card, Form, Radio } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import validation from '@/utils/validation';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDisclosureActivity } from '../../api/get-disclosure-activity';
import { useUpdateDisclosureActivity } from '../../api/update-disclosure-activity';

export type ActivityUseAndPublishDisclosureProps = {
  activityId: string;
  form?: FormInstance;
};

export const ActivityDisclosure = ({
  activityId,
  form,
}: ActivityUseAndPublishDisclosureProps) => {
  const { t } = useTranslation();
  const {
    data: isDisclosure,
    isError,
    isLoading,
  } = useGetDisclosureActivity(activityId);
  const updateDisclosureActivity =
    useUpdateDisclosureActivity({
      activityId,
    });

  useEffect(() => {
    if (isDisclosure !== undefined) {
      form?.setFieldsValue({
        isDisclosure,
      });
    }
  }, [form, isDisclosure]);

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.title" />
        }
        className="mt-3"
        loading={isDisclosure === undefined || isLoading}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isDisclosure: false,
          }}
          onValuesChange={(changedValues) => {
            if (
              changedValues.isDisclosure !== undefined
            ) {
              updateDisclosureActivity.submit(
                changedValues.isDisclosure as boolean
              );
            }
          }}
        >
          <Form.Item
            label={
              <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.isDisclosure" />
            }
            name="isDisclosure"
            rules={[
              validation.required(
                t(
                  'dataMapping.activity.useAndPublic.disclosure.isDisclosureValidation'
                )
              ),
            ]}
          >
            <Radio.Group
              disabled={
                updateDisclosureActivity.isLoading
              }
            >
              <Radio value={true}>
                <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.isDisclosure.true" />
              </Radio>
              <Radio value={false}>
                {' '}
                <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.isDisclosure.false" />
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
    </FallbackError>
  );
};
