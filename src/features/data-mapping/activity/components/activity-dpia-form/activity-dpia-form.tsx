import { FormInstance } from 'antd';

import {
  DpiaReport,
  NatureDataProcessing,
  PreparationDpia,
  ProcessingScope,
  ProcessingDetail,
  PurposeOfProcessing,
  DpiaOpinion,
  MeasureApplLaw,
} from './components';

type ActivityDpiaFormProps = {
  form: FormInstance;
};
export const ActivityDpiaForm = ({
  form,
}: ActivityDpiaFormProps) => {
  return (
    <>
      <DpiaReport form={form} />
      <PreparationDpia form={form} />
      <NatureDataProcessing form={form} />
      <ProcessingScope form={form} />
      <ProcessingDetail form={form} />
      <PurposeOfProcessing form={form} />
      <DpiaOpinion form={form} />
      <MeasureApplLaw form={form} />
    </>
  );
};
