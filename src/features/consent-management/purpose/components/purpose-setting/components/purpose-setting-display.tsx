import { Card, Divider, Form, FormInstance } from 'antd';

import { ImageSelector } from '@/components/share-components/image-selector';
import { ConsentBuilderPurposeWidget } from '@/shared';
import validation from '@/utils/validation';
import { IntlMessage } from '@utilComponents/intl-message';

import { DisplayType, Preference } from '../../../types';

type PurposeSettingDisplayProps = {
  form: FormInstance;
  displayType: DisplayType[];
  loading?: boolean;
  preferences?: Preference[];
};

export const PurposeSettingDisplay = ({
  form,
  displayType,
  loading = false,
  preferences = [],
}: PurposeSettingDisplayProps) => {
  const options = displayType?.map((v) => {
    return {
      value: v.ObjectUUID,
      src: v.imageLink,
    };
  });

  return (
    <Card
      title={
        <IntlMessage id="consentManagement.purpose.customPurpose.display" />
      }
      loading={loading}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          display_type: '',
        }}
      >
        <Form.Item
          name={'displayType'}
          rules={[
            validation.required('กรุณาเลือก display'),
          ]}
        >
          <ImageSelector options={options} />
        </Form.Item>
        <Divider />
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) =>
            prevValues?.displayType !==
              curValues?.displayType ||
            prevValues?.name !== curValues?.name ||
            prevValues?.description !==
              curValues?.description
          }
        >
          {({ getFieldValue }) => {
            const purposeName = getFieldValue('name');
            const purposeDescription =
              getFieldValue('description');

            const displayType =
              getFieldValue('displayType');

            return (
              <ConsentBuilderPurposeWidget
                purpose={{
                  name: purposeName,
                  displayType,
                  purposeID: 'purpose-preview',
                  description: purposeDescription,
                  preferences,
                }}
              />
            );
          }}
        </Form.Item>
      </Form>
    </Card>
  );
};
