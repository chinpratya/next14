import {
  Button,
  Collapse,
  Form,
  FormInstance,
} from 'antd';
import React, { useEffect } from 'react';

import { Widget } from '@/types/form-builder';

import { useAaWebform } from '../../../hooks/use-aa-webform';
import { useAaWebformStore } from '../../../stores/use-aa-webform-store';
import { WebformBuilderItem } from '../../../types/webform-builder';

import {
  BasicInformation,
  ShortText,
  MatrixRows,
  MatrixColumns,
  Options,
  ResultSetting,
} from './content-question-setting-fields';

const settingFieldsConfigurations = (
  widget: Widget,
  form: FormInstance
) => {
  const settingFields = {
    'long-text': (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'required',
            'addOption',
            'maxWord',
          ]}
        />
        <ShortText form={form} />
      </>
    ),
    'short-text': (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'required',
            'addOption',
          ]}
        />
        <ShortText form={form} />
      </>
    ),
    matrix: (
      <>
        <Collapse
          className="collapse-inner"
          defaultActiveKey={['info', 'rows', 'columns']}
        >
          <Collapse.Panel
            header="ข้อมูลพื้นฐาน"
            key="info"
          >
            <BasicInformation
              useTitle={false}
              widgets={[
                'title',
                'description',
                'required',
                'multipleSelection',
                'verticalAlignment',
              ]}
            />
          </Collapse.Panel>
          <Collapse.Panel header="แถว" key="rows">
            <MatrixRows />
          </Collapse.Panel>
          <Collapse.Panel header="คอลัมน์" key="columns">
            <MatrixColumns />
          </Collapse.Panel>
        </Collapse>
      </>
    ),
    'check-box': (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'checkboxMultipleSelection',
            'verticalAlignment',
            'required',
          ]}
        />
        <Options form={form} />
      </>
    ),
    'radio-box': (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'verticalAlignment',
            'required',
          ]}
        />
        <Options form={form} />
      </>
    ),
    'question-group': (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'quotationMark',
            'nextButtonText',
            'previousButtonText',
          ]}
        />
      </>
    ),
    statement: (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'quotationMark',
            'nextButtonText',
          ]}
        />
      </>
    ),
    'from-data': (
      <>
        <BasicInformation
          widgets={[
            'title',
            'description',
            'required',
            'dependencyKey',
          ]}
        />
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.dependencyKey !==
            currentValues.dependencyKey
          }
        >
          {({ getFieldValue }) => {
            const dependencyKey = getFieldValue(
              'dependencyKey'
            );
            return (
              <ResultSetting
                form={form}
                dependencyKey={dependencyKey}
              />
            );
          }}
        </Form.Item>
      </>
    ),
  } as {
    [key in Widget]: React.ReactNode;
  };

  return settingFields[widget] ?? null;
};

export const ContentQuestion = () => {
  const [form] = Form.useForm();

  const {
    selectedWebformBuilder,
    webformBuilderItems,
    onUpdatedWebformCustomizingItem,
  } = useAaWebformStore();
  const { findWebformBuilderItemParent } = useAaWebform({
    webformBuilderItems,
  });

  const onUpdatedWebformBuilder = (
    values: WebformBuilderItem
  ) => {
    const parent = findWebformBuilderItemParent(
      selectedWebformBuilder?.key ?? ''
    );
    if (parent) {
      onUpdatedWebformCustomizingItem(
        {
          ...selectedWebformBuilder,
          ...values,
        },
        parent.key
      );
    } else {
      onUpdatedWebformCustomizingItem({
        ...selectedWebformBuilder,
        ...values,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(selectedWebformBuilder);
    return () => {
      form.resetFields();
    };
  }, [selectedWebformBuilder, form]);

  const renderSettingFields = () =>
    selectedWebformBuilder &&
    settingFieldsConfigurations(
      selectedWebformBuilder?.widget,
      form
    );

  return (
    <Form
      form={form}
      onFinish={onUpdatedWebformBuilder}
      layout="vertical"
    >
      <>{renderSettingFields()}</>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};
