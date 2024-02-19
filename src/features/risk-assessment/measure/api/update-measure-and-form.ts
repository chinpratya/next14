import { useMutation } from '@tanstack/react-query';

import { riskAssessmentQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

import { updateMeasure } from '../api/update-measure';
import { updateMeasureForm } from '../api/update-measure-form';

export type UseUpdateMeasureAndForm = {
  measureId: string;
  onSuccess?: () => void;
};

export const useUpdateMeasureAndForm = ({
  measureId,
  onSuccess,
}: UseUpdateMeasureAndForm) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      data,
      form,
    }: {
      data: Record<string, unknown>;
      form: Record<string, unknown>;
    }) =>
      Promise.all([
        updateMeasure(measureId, data),
        updateMeasureForm(measureId, form),
      ]),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.all,
      ]);
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.detail(
          measureId
        ),
      ]);
      await queryClient.invalidateQueries([
        riskAssessmentQueryKeys.measured.form(measureId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
