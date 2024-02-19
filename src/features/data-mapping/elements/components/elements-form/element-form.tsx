import {
  Form,
  FormInstance,
  Input,
  Select,
  Skeleton,
} from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { validation } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDataElementMeta } from '../../api/list-data-element-meta';

type ElementsFormProps = {
  form: FormInstance;
};

export const ElementsForm = ({
  form,
}: ElementsFormProps) => {
  const { t } = useTranslation();
  const listMeta = useListDataElementMeta();

  if (listMeta.isLoading) return <Skeleton />;

  return (
    <FallbackError isError={listMeta.isError}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label={
            <IntlMessage id="dataMapping.dataElement.create.name" />
          }
          rules={[
            validation.required(
              t(
                'dataMapping.dataElement.create.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dataClassificationID"
          label={
            <>
              <IntlMessage id="dataMapping.dataElement.create.dataClassification" />
              <Link
                href="https://www.securitypitch.com/post/พ-ร-บ-คุ้มครองข้อมูลส่วนบุคคลฯ-คืออะไร-by-security-pitch"
                target="_blank"
                className="ml-1"
              >
                <IntlMessage id="dataMapping.dataElement.create.dataClassification.link" />
              </Link>
            </>
          }
          rules={[
            validation.required(
              t(
                'dataMapping.dataElement.create.dataClassificationRequired'
              )
            ),
          ]}
        >
          <Select
            loading={listMeta.isLoading}
            options={listMeta.data?.dataClassification.map(
              (item) => ({
                label: item.name,
                value: item.ObjectUUID,
              })
            )}
          />
        </Form.Item>
      </Form>
    </FallbackError>
  );
};
