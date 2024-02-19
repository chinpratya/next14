import { Form, FormInstance } from 'antd';
import { useEffect } from 'react';

import { Purpose } from '../../types';

import { PurposeDetailInfoFormDetail } from './purpose-detail-info-form-datail';

type PurposeDetailInfoProps = {
  form: FormInstance;
  data: Purpose;
};

export const PurposeDetailInfo = ({
  form,
  data,
}: PurposeDetailInfoProps) => {
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, form]);

  return (
    <>
      <Form form={form} layout="vertical">
        <PurposeDetailInfoFormDetail
          dataIsDataUsagePeriod={data?.isDataUsagePeriod}
        />
      </Form>
    </>
  );
};
