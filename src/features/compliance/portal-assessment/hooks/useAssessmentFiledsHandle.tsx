import { useSetState } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { WebformBuilderItem } from '../../share';
import { AssessmentFieldsValue } from '../types/assessment';

export type UseAssessmentFormProps = {
  fields: WebformBuilderItem[];
};

export type UseAssessmentFormState = {
  currentField: string;
  allFields: WebformBuilderItem[];
  fieldsValues: AssessmentFieldsValue;
};

export const useAssessmentFieldsHandler = ({
  fields,
}: UseAssessmentFormProps) => {
  const router = useRouter();
  const [state, setState] =
    useSetState<UseAssessmentFormState>({
      currentField: '',
      allFields: [],
      fieldsValues: {},
    });

  const { field } = router.query;
  const path = router.pathname.split('?')[0];

  const onPrevField = async () => {
    const currentIndex = state.allFields.findIndex(
      (item) => item.key === state.currentField
    );
    if (currentIndex > 0) {
      const field = state.allFields[currentIndex - 1].key;
      await router.push(`${path}?field=${field}`);
      setState({ currentField: field });
    }
  };

  const onNextField = async (
    values: AssessmentFieldsValue
  ) => {
    const currentIndex = state.allFields.findIndex(
      (item) => item.key === state.currentField
    );
    if (currentIndex < state.allFields.length - 1) {
      const field =
        state.allFields[currentIndex + 1]?.key;
      await router.push(`${path}?field=${field}`);
      setState({
        fieldsValues: {
          ...state.fieldsValues,
          ...values,
        },
        currentField: field,
      });
    }
  };

  const onFieldChange = async (field: string) => {
    await router.push(`${path}?field=${field}`);
    setState({ currentField: field });
  };

  const getAllFieldsWithChildren = useCallback(
    (
      formItems: WebformBuilderItem[]
    ): WebformBuilderItem[] => {
      const fields: WebformBuilderItem[] = [];
      formItems.forEach((item) => {
        if (item.children) {
          fields.push({
            ...item,
            children: undefined,
          });
          fields.push(
            ...getAllFieldsWithChildren(item.children)
          );
        } else {
          fields.push(item);
        }
      });
      return fields;
    },
    []
  );

  useEffect(() => {
    if (
      state.allFields.length === 0 &&
      fields.length > 0
    ) {
      const allFields = getAllFieldsWithChildren(fields);
      const currentField = allFields.find(
        (item) => item.key === field
      );
      const firstField = allFields[0];
      const fieldKey =
        currentField?.key ?? firstField.key;
      router.push(`${path}?field=${fieldKey}`);
      setState({
        currentField: fieldKey,
        allFields,
      });
    }
  }, [
    fields,
    field,
    getAllFieldsWithChildren,
    setState,
    state.allFields.length,
    router,
    path,
  ]);

  return {
    ...state,
    fieldsCount: state.allFields.length,
    currentIsFirst:
      state.allFields[0]?.key === state.currentField,
    currentIsLast:
      state.allFields[state.allFields.length - 1]?.key ===
      state.currentField,
    onPrevField,
    onNextField,
    onFieldChange,
  };
};
