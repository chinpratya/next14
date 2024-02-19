import { Flex } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import {
  Empty,
  Input,
  Typography,
  Checkbox,
  Radio,
  Space,
} from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';

import { UploadButton } from '../../../../../shared';
import {
  WebformBuilderItem,
  WebformBuilderLongTextOption,
  WebformBuilderFromDataOption,
} from '../../../types/webform-builder';

import { WidgetBodyWrapper } from './widget-body-wrapper';
import { WidgetFooter } from './widget-footer';
import { WidgetHeader } from './widget-header';

export type FromDataWidgetProps = WebformBuilderItem & {
  fields: WebformBuilderItem[];
};

const getDependencyField = (
  fields: WebformBuilderItem[],
  dependencyKey?: string
) => {
  const allFields: WebformBuilderItem[] = [];
  fields.forEach((field) => {
    allFields.push(field);
    field?.children?.forEach((child) => {
      allFields.push(child);
    });
  });
  return allFields.find(
    (field) => field.key === dependencyKey
  );
};
export const FromDataWidget = ({
  title,
  description,
  dependencyKey,
  options,
  fields,
  readOnly,
  value: initialValue,
}: FromDataWidgetProps) => {
  const [formDataWidgetValue, setFormDataWidgetValue] =
    useSetState<Record<string, unknown>>({});

  const dependencyField = getDependencyField(
    fields,
    dependencyKey
  );

  const onValidate = () => {
    return new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        dependencyField?.options?.forEach(
          (dependencyOption, index) => {
            options?.[index]?.forEach(
              (
                option: WebformBuilderFromDataOption,
                index: number
              ) => {
                if (
                  !_.get(
                    formDataWidgetValue,
                    `${dependencyOption.title}.${index}`
                  )
                ) {
                  reject(
                    `กรุณากรอกตัวเลือก ${dependencyOption.title} ให้ครบถ้วน`
                  );
                }
              }
            );
          }
        );

        resolve(formDataWidgetValue);
      }
    );
  };

  useEffect(() => {
    if (initialValue)
      setFormDataWidgetValue(initialValue);
  }, [initialValue, setFormDataWidgetValue]);

  return (
    <>
      <WidgetHeader
        title={title}
        description={description}
      />
      <WidgetBodyWrapper readOnly={readOnly}>
        <div
          className="mt-2 mb-2"
          style={{ height: 10 }}
        />
        {!dependencyField ? (
          <Empty />
        ) : (
          dependencyField?.options?.map(
            (
              dependencyOption: WebformBuilderLongTextOption,
              index
            ) => (
              <div className="mt-4" key={index}>
                <Typography.Title level={3}>
                  {_.get(
                    dependencyField,
                    `value.textValues.${index}`,
                    ''
                  )}
                </Typography.Title>
                <Flex
                  direction="column"
                  align="flex-start"
                  gap="md"
                >
                  {options?.[index]?.map(
                    (
                      option: WebformBuilderFromDataOption,
                      index: number
                    ) => {
                      return (
                        <>
                          {option.type === 'input' && (
                            <Input
                              value={
                                _.get(
                                  formDataWidgetValue,
                                  `${dependencyOption.title}.${index}`
                                ) as string
                              }
                              placeholder={
                                option.placeholder
                              }
                              disabled={readOnly}
                            />
                          )}
                          {option.type ===
                            'attachment' && (
                            <UploadButton
                              disabled={readOnly}
                              module="portal-assessment-automation"
                              group="portal-attachment"
                              label={option.placeholder}
                              value={
                                _.get(
                                  formDataWidgetValue,
                                  `${dependencyOption.title}.${index}`
                                ) as string
                              }
                              onChange={(value) => {
                                setFormDataWidgetValue({
                                  [dependencyOption.title]:
                                    {
                                      ...(formDataWidgetValue?.[
                                        dependencyOption
                                          .title
                                      ] ?? {}),
                                      [index]: value,
                                    },
                                });
                              }}
                            />
                          )}
                          {option.type === 'checkbox' && (
                            <Checkbox.Group
                              disabled={readOnly}
                              options={option.options}
                            />
                          )}
                          {option.type === 'radio' && (
                            <Radio.Group
                              disabled={readOnly}
                              value={
                                _.get(
                                  formDataWidgetValue,
                                  `${dependencyOption.title}.${index}`
                                ) as string
                              }
                              onChange={(e) => {
                                setFormDataWidgetValue({
                                  [dependencyOption.title]:
                                    {
                                      ...(formDataWidgetValue?.[
                                        dependencyOption
                                          .title
                                      ] ?? {}),
                                      [index]:
                                        e.target.value,
                                    },
                                });
                              }}
                            >
                              <Space direction="vertical">
                                {option?.options?.map(
                                  (option) => (
                                    <Radio
                                      value={option}
                                      key={option}
                                    >
                                      {option}
                                    </Radio>
                                  )
                                )}
                              </Space>
                            </Radio.Group>
                          )}
                        </>
                      );
                    }
                  )}
                </Flex>
              </div>
            )
          )
        )}
      </WidgetBodyWrapper>
      <WidgetFooter
        readonly={readOnly}
        onValidate={onValidate}
      />
    </>
  );
};
