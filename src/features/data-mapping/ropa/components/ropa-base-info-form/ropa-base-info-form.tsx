import { PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/hooks';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  TagsSelect,
  ModalCreateTags,
} from '../../../shared';

export type RopaBaseInfoFormProps = {
  form: FormInstance;
};

export const RopaBaseInfoForm = ({
  form,
}: RopaBaseInfoFormProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();

  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="name"
          label={
            <IntlMessage id="dataMapping.ropa.create.form.name" />
          }
          rules={[
            validation.required(
              t(
                'dataMapping.ropa.create.form.nameRequired'
              )
            ),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={css`
            label {
              width: 100%;
            }
          `}
          name="tagID"
          label={
            <Flex
              alignItems="center"
              justifyContent="between"
              className="w-100"
            >
              <Typography.Text>
                <IntlMessage id="dataMapping.activity.activityDetail.tags" />
              </Typography.Text>
              <Typography.Link
                className="font-weight-normal"
                onClick={toggle.choose}
              >
                <PlusOutlined />{' '}
                <IntlMessage id="dataMapping.activity.activityDetail.createTags" />
              </Typography.Link>
            </Flex>
          }
        >
          <TagsSelect />
        </Form.Item>
        <Form.Item
          name="type"
          label={
            <IntlMessage id="dataMapping.ropa.create.form.createdAs" />
          }
          rules={[
            validation.required(
              t(
                'dataMapping.ropa.create.form.createdAsRequired'
              )
            ),
          ]}
        >
          <Select
            options={[
              {
                label: (
                  <IntlMessage id="dataMapping.ropa.create.form.createdAs.dataController" />
                ),
                value: 'data-controller',
              },
              {
                label: (
                  <IntlMessage id="dataMapping.ropa.create.form.createdAs.dataProcessor" />
                ),
                value: 'data-processor',
              },
            ]}
          />
        </Form.Item>
      </Form>
      <ModalCreateTags
        open={toggle.openChoose}
        onCancel={toggle.choose}
      />
    </>
  );
};
