import { Button } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';

// eslint-disable-next-line import/no-cycle
import { useAssessmentAutomationStore } from '../../../stores';
import { WebformBuilderItem } from '../../../types/webform-builder';

export type WidgetFooterProps = {
  readonly?: boolean;
  onValidate?: () => Promise<Record<string, unknown>>;
};
export const WidgetFooter = ({
  onValidate,
}: WidgetFooterProps) => {
  const { showNotification } = useNotifications();
  const {
    selectedFormKey,
    formItemsKey,
    formItems,
    onNextForm,
    onPreviousForm,
  } = useAssessmentAutomationStore();

  const router = useRouter();

  const onNext = useCallback(async () => {
    try {
      const value = await onValidate?.();

      const getFormItemsFlat = (
        formItemsKey: WebformBuilderItem[]
      ) => {
        const formItemsFlat: WebformBuilderItem[] = [];
        formItemsKey.forEach((formItem) => {
          formItemsFlat.push(formItem);
          if (formItem.children) {
            formItemsFlat.push(
              ...getFormItemsFlat(formItem.children)
            );
          }
        });
        return formItemsFlat;
      };

      const currentFormItem = _.find(
        getFormItemsFlat(formItems),
        {
          key: selectedFormKey,
        }
      );

      if (!currentFormItem) {
        Error('currentFormItem not found');
        return;
      }

      if (currentFormItem?.logic) {
        const { logic } = currentFormItem;
        const { if: ifLogic, else: elseLogic } = logic;
        ifLogic.reverse();
        let nextField = elseLogic.target;
        if (currentFormItem.widget === 'radio-box') {
          ifLogic.forEach((item) => {
            if (item.value === value?.selected) {
              nextField = item.target;
            }
          });
        }
        if (currentFormItem.widget === 'check-box') {
          ifLogic.forEach((item) => {
            const checkedValues =
              value?.checked as string[];
            if (
              checkedValues.includes(
                item?.value as string
              )
            ) {
              nextField = item.target;
            }
          });
        }
        if (currentFormItem.widget === 'short-text') {
          ifLogic.forEach((item) => {
            if (
              item.condition === 'not-empty' &&
              (currentFormItem.value || value)
            ) {
              nextField = item.target;
            }
          });
        }

        router.push({
          hash: nextField,
        });

        onNextForm(nextField, value);
        return;
      }

      const currentFieldIndex = formItemsKey.findIndex(
        (key) => key === selectedFormKey
      );

      if (currentFieldIndex === -1) {
        new Error('currentFieldIndex not found');
        return;
      }

      if (currentFieldIndex < formItemsKey.length - 1) {
        const nextField =
          formItemsKey[currentFieldIndex + 1];
        router.push({
          hash: nextField,
        });

        onNextForm(nextField, value);
      }
    } catch (error) {
      if (typeof error === 'string') {
        showNotification({
          type: 'error',
          message: error,
        });
      }
    }
  }, [
    onValidate,
    formItems,
    selectedFormKey,
    formItemsKey,
    router,
    onNextForm,
    showNotification,
  ]);

  const onPrevious = () => {
    const currentFieldIndex = formItemsKey.findIndex(
      (key) => key === selectedFormKey
    );
    if (currentFieldIndex > 0) {
      const previousField =
        formItemsKey[currentFieldIndex - 1];
      router.push({
        hash: previousField,
      });
      onPreviousForm(previousField);
    }
  };

  return (
    <Flex className="mt-4">
      <Button
        type="primary"
        className="mr-2"
        onClick={() => onNext()}
        hidden={
          selectedFormKey ===
          formItemsKey[formItemsKey.length - 1]
        }
      >
        ต่อไป
      </Button>
      <Button
        onClick={() => onPrevious()}
        hidden={selectedFormKey === formItemsKey[0]}
      >
        ย้อนกลับ
      </Button>
    </Flex>
  );
};
