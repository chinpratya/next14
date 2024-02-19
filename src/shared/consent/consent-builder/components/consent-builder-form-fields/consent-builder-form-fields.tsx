import { Collapse } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { Activities } from './components/activities';
import { Fields } from './components/fields';
import { Header } from './components/header';
import { Identifier } from './components/identifier';
import { Label } from './components/label';
import { Purposes } from './components/purposes';

export type ConsentBuilderFormFieldsProps = {
  isUseHeaderPanel?: boolean;
  isUseFieldsPanel?: boolean;
  isUsePurposesPanel?: boolean;
  isUseActivitiesPanel?: boolean;
  isUseLabelPanel?: boolean;
  isUseIdentifierPanel?: boolean;
};

export const ConsentBuilderFormFields = ({
  isUseHeaderPanel = true,
  isUseFieldsPanel = true,
  isUsePurposesPanel = true,
  isUseActivitiesPanel = true,
  isUseLabelPanel = true,
  isUseIdentifierPanel = true,
}: ConsentBuilderFormFieldsProps) => {
  return (
    <Collapse
      defaultActiveKey={[
        'header',
        'fields',
        'purposes',
        'activities',
        'label',
        'identifier',
      ]}
    >
      {isUseHeaderPanel && (
        <Collapse.Panel
          key="header"
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields.header" />
          }
        >
          <Header />
        </Collapse.Panel>
      )}
      {isUseFieldsPanel && (
        <Collapse.Panel
          key="fields"
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields.field" />
          }
        >
          <Fields />
        </Collapse.Panel>
      )}
      {isUsePurposesPanel && (
        <Collapse.Panel
          key="purposes"
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields.purpose" />
          }
        >
          <Purposes />
        </Collapse.Panel>
      )}
      {isUseActivitiesPanel && (
        <Collapse.Panel
          key="activities"
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields.activity" />
          }
        >
          <Activities />
        </Collapse.Panel>
      )}
      {isUseLabelPanel && (
        <Collapse.Panel
          key="label"
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields.label" />
          }
        >
          <Label />
        </Collapse.Panel>
      )}
      {isUseIdentifierPanel && (
        <Collapse.Panel
          key="identifier"
          header={
            <IntlMessage id="dsarAutomation.setting.webForm.detail.webForm.formFields.identifier" />
          }
        >
          <Identifier />
        </Collapse.Panel>
      )}
    </Collapse>
  );
};
