import { Collapse, Skeleton } from 'antd';

import { ConsentBuilderPurposeWidget } from '@/shared';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetReceiptPurposes } from '../../api/get-receipt-purposes';

export type ReceiptPurposeProps = {
  receiptId: string;
};

export const ReceiptPurpose = ({
  receiptId,
}: ReceiptPurposeProps) => {
  const { data, isLoading, isError } =
    useGetReceiptPurposes({
      receiptId,
    });

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <FallbackError isError={isError}>
      {data?.data.formTemplate.formItems.map(
        (purpose) => (
          <Collapse
            key={purpose?.purposeID}
            className="mb-4"
            defaultActiveKey={[purpose?.purposeID]}
          >
            <Collapse.Panel
              header={purpose?.name}
              key={purpose?.purposeID}
            >
              <ConsentBuilderPurposeWidget
                purpose={purpose}
                viewOnly
              />
            </Collapse.Panel>
          </Collapse>
        )
      )}
    </FallbackError>
  );
};
