import { Card, Collapse } from 'antd';

import { ConsentBuilderPurposeWidget } from '@/shared';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetTransactionPurpose } from '../../api/get-transaction-purpose';

type TransactionPurposeProps = {
  transactionId: string;
};

export const TransactionPurpose = ({
  transactionId,
}: TransactionPurposeProps) => {
  const { data, isLoading, isError } =
    useGetTransactionPurpose({
      transactionId,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="consentManagement.transaction.detail.purpose" />
        }
        loading={isLoading}
      >
        <Collapse
          className="mb-4"
          defaultActiveKey={data?.form.map(
            (purpose) => purpose?.purposeID
          )}
        >
          {data?.form.map((purpose) => {
            return (
              <Collapse.Panel
                header={purpose?.name}
                key={purpose?.purposeID}
              >
                <ConsentBuilderPurposeWidget
                  purpose={purpose}
                  viewOnly
                />
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </Card>
    </FallbackError>
  );
};
