import { Collapse, Skeleton } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { Header } from './components/header';

export type PolicyBuilderFormFieldsProps = {
  isLoading?: boolean;
};

export const PolicyBuilderFormFields = ({
  isLoading = false,
}: PolicyBuilderFormFieldsProps) => {
  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Collapse defaultActiveKey="header">
          <Collapse.Panel
            key="header"
            header={
              <IntlMessage id="policyManagement.policy.detail.builder.formFields.header" />
            }
          >
            <Header />
          </Collapse.Panel>
        </Collapse>
      )}
    </>
  );
};
