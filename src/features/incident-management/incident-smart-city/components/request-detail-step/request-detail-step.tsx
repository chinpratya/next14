import { Button, Card, Steps } from 'antd';
import { useState, useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';

import { useGetRequestMeta } from '../../api/get-request-meta';
import { useUpdateRequestStepBefore } from '../../api/update-request-step-before';
import { useUpdateRequestStepNext } from '../../api/update-request-step-next';
import { RequestStates } from '../../types';

type RequestDetailStepProps = {
  requestId: string;
  currecntState: number;
  states: RequestStates[];
};

export const RequestDetailStep = ({
  requestId,
  currecntState,
  states,
}: RequestDetailStepProps) => {
  const [current, setCurrent] = useState(0);
  const { showNotification } = useNotifications();

  const { data: meta, isLoading } = useGetRequestMeta();

  const steps =
    states.map((value) => ({
      title: value.stageName,
    })) || [];

  const updateStepBefore = useUpdateRequestStepBefore({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update step success',
      });
      setCurrent(current - 1);
    },
  });

  const updateStepNext = useUpdateRequestStepNext({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update step success',
      });
      setCurrent(current + 1);
    },
  });

  useEffect(() => {
    if (currecntState) {
      setCurrent(currecntState - 1);
    }
  }, [currecntState]);

  return (
    <Card loading={isLoading}>
      {steps && (
        <Steps
          type="navigation"
          current={current}
          items={steps}
        />
      )}
      <Button
        className="mt-3 mr-2"
        onClick={() => updateStepBefore.submit()}
        loading={updateStepBefore.isLoading}
        disabled={current === 0}
      >
        ย้อนกลับ
      </Button>
      {current < steps.length - 1 && (
        <Button
          type="primary"
          onClick={() => updateStepNext.submit()}
          loading={updateStepNext.isLoading}
        >
          ต่อไป
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button type="primary">เสร็จสิ้น</Button>
      )}
    </Card>
  );
};
