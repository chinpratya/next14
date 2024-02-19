import {
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from 'antd';
import type { SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getColLayout } from '@/utils';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { TagsFormItem } from '../../../tags';
import { WorkflowSelect } from '../../../workflow';
import { useGetWebformMeta } from '../../api/get-webform-meta';
import { WebformBasicInfoProcessingActivities } from '../webform-basic-info-processing-activities';
import { WebformRequestModerator } from '../webform-request-moderator';

export type WebformBasicInfoProps = {
  form?: FormInstance;
  webformId: string;
};

export const WebformBasicInfo = ({
  form,
  webformId,
}: WebformBasicInfoProps) => {
  const { t } = useTranslation();
  const { data: meta, isLoading } = useGetWebformMeta();

  const optionsIdentify = meta?.identifyType?.map(
    (identify) => {
      return {
        label: identify.name,
        value: identify.ObjectUUID,
      };
    }
  );

  const [optionsLanguage, setOptionsLanguage] = useState<
    SelectProps['options'] | null
  >(null);

  useEffect(() => {
    if (meta && !optionsLanguage) {
      const option = meta?.Language.map((user) => ({
        value: user.ObjectUUID,
        label: user.name,
      }));
      setOptionsLanguage(option);
    }
  }, [meta, optionsLanguage]);

  return (
    <Form form={form} layout="vertical">
      <Row gutter={[24, 0]}>
        <Col {...getColLayout(12)}>
          <Card
            title={
              <IntlMessage id="dsarAutomation.setting.webForm.basicInfo" />
            }
            style={{ height: '400px' }}
          >
            <Form.Item
              label={
                <IntlMessage id="dsarAutomation.setting.webForm.name" />
              }
              name="name"
              rules={[
                validation.required(
                  t(
                    'dsarAutomation.setting.webForm.nameRequired'
                  )
                ),
              ]}
            >
              <Input />
            </Form.Item>
            <TagsFormItem
              label={
                <IntlMessage id="dsarAutomation.setting.webForm.tag" />
              }
              name="tagID"
              rules={[
                validation.required(
                  t(
                    'dsarAutomation.setting.webForm.tagRequired'
                  )
                ),
              ]}
            />
            <Form.Item
              label={
                <IntlMessage id="dsarAutomation.setting.webForm.description" />
              }
              name="description"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Card>
          <Card
            title={
              <IntlMessage id="dsarAutomation.setting.webForm.workflow" />
            }
          >
            <Form.Item
              label={
                <IntlMessage id="dsarAutomation.setting.webForm.workflow.select" />
              }
              name="workflowID"
              rules={[
                validation.required(
                  t(
                    'dsarAutomation.setting.webForm.workflowRequired'
                  )
                ),
              ]}
            >
              <WorkflowSelect disabled />
            </Form.Item>
          </Card>
        </Col>
        <Col {...getColLayout(12)}>
          <WebformRequestModerator
            webformId={webformId}
          />
          <Card
            title={
              <IntlMessage id="dsarAutomation.setting.webForm.identifyInformation" />
            }
          >
            <Form.Item
              label={
                <IntlMessage id="dsarAutomation.setting.webForm.identifyInformation" />
              }
              name="identifyType"
              rules={[
                validation.required(
                  t(
                    'dsarAutomation.setting.webForm.identifyInformationRequired'
                  )
                ),
              ]}
            >
              <Select
                options={optionsIdentify}
                loading={isLoading}
              />
            </Form.Item>
          </Card>
        </Col>
        <Col {...getColLayout(24)}>
          <WebformBasicInfoProcessingActivities
            webformId={webformId}
          />
        </Col>
      </Row>
    </Form>
  );
};
